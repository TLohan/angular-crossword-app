import { Component, OnInit, Input } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { PlayMode } from '../play-mode.interface';
import { Question } from 'src/app/models/question/question';
import { CellMap } from 'src/app/models/cell-map/cell-map';
import { PlayService } from 'src/app/services/play.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PlaySuperComponent } from '../play-super/play-super.component';
import { RaceModeService } from 'src/app/services/race-mode.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RaceEndedModalComponent } from '../race-ended-modal/race-ended-modal.component';

@Component({
    selector: 'app-race-mode',
    templateUrl: './race-mode.component.html',
    styleUrls: ['./race-mode.component.sass']
})
export class RaceModeComponent extends PlaySuperComponent implements OnInit {

    readonly PLAY_MODE: PlayMode = PlayMode.RACE_MODE;

    _selectedQuestion: Question;
    cellMap: CellMap = new CellMap();
    fakeInputFormGroup: FormGroup;

    _ownProgress = 0;

    public get ownProgress(): number {
        return this._ownProgress;
    }

    public set ownProgress(value: number) {
        this._ownProgress = value;
    }

    private _opponentProgress = 0;
    public get opponentProgress() {
        return this._opponentProgress;
    }
    public set opponentProgress(value) {
        this._opponentProgress = value;
    }


    get selectedQuestion(): Question {
        return this._selectedQuestion;
    }

    set selectedQuestion(question: Question) {
        this._selectedQuestion = question;
    }

    @Input()
    set board(board: Board) {
        this._board = board;
    }

    get board(): Board {
        return this._board;
    }


    constructor(playService: PlayService, private raceModeService: RaceModeService, private modalService: NgbModal) {
        super(playService);
        this.raceModeService.raceFinishedSource.subscribe((result: number[]) => {
            this.ownProgress = result[0];
            this.opponentProgress = result[1];
            // trigger modal
            this.triggerRaceFinishedModal();
        });

        this.playService.revealsRemainingChanged$.subscribe(value => {
            this.raceModeService.updateRemainingReveals(value);
        });

        this.playService.matchFinishedTriggered.subscribe(_ => {
            this.raceModeService.raceFinished();
        });
    }

    ngOnInit() {
        this.ownProgress = 0;
        this.opponentProgress = 0;
        this.playService.changeProgress(this.ownProgress);
        this.fakeInputFormGroup = new FormGroup({
            fakeInput: new FormControl()
        });
    }

    setCellMap(cellMap: CellMap): void {
        this.cellMap.nodes = cellMap.nodes;
    }

    triggerRaceFinishedModal() {
        if (this.modalService.hasOpenModals) {
            this.modalService.dismissAll();
        }
        const modalRef = this.modalService.open(RaceEndedModalComponent, { centered: true, backdrop: 'static' });
        modalRef.componentInstance.ownProgress = this.ownProgress;
        modalRef.componentInstance.opponentProgress = this.opponentProgress;
    }
}

