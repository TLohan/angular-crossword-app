import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../models/question/question';
import { CellMap } from '../models/cell-map/cell-map';
import { Orientation } from '../play-crossword/orientation.enum';

@Injectable({
    providedIn: 'root'
})
export class PlayService {

    private selectedQuestionSource = new Subject<Question>();
    private headCellFlagSource = new Subject<boolean>();
    private cellMapSource = new Subject<CellMap>();
    private orientationSource = new Subject<Orientation>();
    private progressSource = new Subject<number>();
    private remainingRevealsSource = new Subject<number>();
    private checkBoardSource = new Subject<boolean>();
    private selectPreviousQuestionSource = new Subject<boolean>();
    private selectNextQuestionSource = new Subject<boolean>();
    private timerSource = new Subject<number>();
    private matchFinishedSource = new Subject<boolean>();
    private triggerSoloReplaySource = new Subject<boolean>();
    private triggerRevealAllSource = new Subject<boolean>();
    private revealAllConfirmedSource = new Subject<boolean>();

    constructor() { }

    questionChanged$ = this.selectedQuestionSource.asObservable();
    headCellFlagTriggered$ = this.headCellFlagSource.asObservable();
    cellMapPopulated$ = this.cellMapSource.asObservable();
    orientationChanged$ = this.orientationSource.asObservable();
    progressChanged$ = this.progressSource.asObservable();
    revealsRemainingChanged$ = this.remainingRevealsSource.asObservable();
    checkBoardTriggered$ = this.checkBoardSource.asObservable();
    selectNextQuestionTriggered = this.selectNextQuestionSource.asObservable();
    selectPreviousQuestionTriggered = this.selectPreviousQuestionSource.asObservable();
    timerChanged$ = this.timerSource.asObservable();
    matchFinishedTriggered = this.matchFinishedSource.asObservable();
    soloReplayTriggered$ = this.triggerSoloReplaySource.asObservable();
    revealAllTriggered$ = this.triggerRevealAllSource.asObservable();
    revealAllConfirmed$ = this.revealAllConfirmedSource.asObservable();

    changeQuestion(question: Question, selectHeadCell: boolean = false) {
        this.selectedQuestionSource.next(question);
        if (selectHeadCell) { this.headCellFlagSource.next(selectHeadCell); }
    }

    cellMapPopulated(cellMap: CellMap) {
        this.cellMapSource.next(cellMap);
    }

    changeOrientation(orientation: Orientation) {
        this.orientationSource.next(orientation);
    }

    changeProgress(progress: number) {
        this.progressSource.next(progress);
    }

    changeRemainingReveals(remainingReveals: number) {
        this.remainingRevealsSource.next(remainingReveals);
    }

    triggerCheckBoard() {
        this.checkBoardSource.next();
    }

    selectNextQuestion() {
        this.selectNextQuestionSource.next(true);
    }

    selectPreviousQuestion() {
        this.selectPreviousQuestionSource.next(true);
    }

    timerChanged(value: number) {
        this.timerSource.next(value);
    }

    matchFinished() {
        this.matchFinishedSource.next();
    }

    triggerSoloReplay() {
        this.triggerSoloReplaySource.next(true);
    }

    triggerRevealAll() {
        this.triggerRevealAllSource.next(true);
    }

    confirmRevealAll() {
        this.revealAllConfirmedSource.next(true);
    }
}
