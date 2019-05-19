import { Component, OnInit, Input, Output } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { Question } from 'src/app/models/question/question';
import { Subscription } from 'rxjs';
import { PlayService } from 'src/app/services/play.service';
import { CellMap } from 'src/app/models/cell-map/cell-map';
import { Orientation } from '../orientation.enum';

@Component({
    selector: 'app-questions-list',
    templateUrl: './questions-list.component.html',
    styleUrls: ['./questions-list.component.sass']
})
export class QuestionsListComponent implements OnInit {

    private _board: Board = new Board();
    selectedOrientation: string;
    private _cellMap: CellMap = new CellMap();
    private _questionsAcross: Question[] = [];
    private _questionsDown: Question[] = [];
    private _selectedQuestion: Question;

    headCellFlag = false;

    @Input()
    set cellMap(value: CellMap) {
        this._cellMap.nodes = value.nodes;
    }

    get cellMap(): CellMap {
        return this._cellMap;
    }

    @Input()
    get board() {
        return this._board;
    }

    set board(board: Board) {
        this._cellMap = new CellMap();
        this._board.fromJSON(board);
        this._questionsAcross = [];
        this._questionsDown = [];
        this._questionsAcross = this._board.questionsAcross;
        this._questionsDown = this._board.questionsDown;
    }

    get selectedQuestion(): Question {
        return this._selectedQuestion;
    }

    set selectedQuestion(question: Question) {
        this.playService.changeOrientation(question.orientation);
        this.playService.changeQuestion(question, this.headCellFlag);
    }

    get questionsAcross(): Question[] {
        return this._questionsAcross;
    }

    get questionsDown(): Question[] {
        return this._questionsDown;
    }

    constructor(private playService: PlayService) {
        this.playService.questionChanged$.subscribe(question => {
            this.highlightSelectedQuestion(question);
            this._selectedQuestion = question;
        });
        this.playService.cellMapPopulated$.subscribe(cellMap => {
            this.cellMap = cellMap;
        });
    }

    ngOnInit() {
    }

    selectQuestion(question: Question) {
        this.headCellFlag = true;
        this.selectedQuestion = new Question(question.location, question.clue, question.answer, question.orientation, question.identifier);
        this.selectedQuestion.id = question.id;
        this.selectedOrientation = question.orientation;
        this.headCellFlag = false;
    }

    highlightSelectedQuestion(question: Question) {
        if (this.selectedQuestion) {
            const oldSelectedQuestionElement = document.getElementById(`question-${this.selectedQuestion.identifier}`);
            if (oldSelectedQuestionElement) {
                oldSelectedQuestionElement.classList.remove('selectedQuestion');
                oldSelectedQuestionElement.blur();
            }
        }
        const newSelectedQuestionElement = document.getElementById(`question-${question.identifier}`);
        if (newSelectedQuestionElement) {
            newSelectedQuestionElement.classList.add('selectedQuestion');
            newSelectedQuestionElement.focus();
        }
    }

    checkIfAnswered(question: Question): string {
        if (this.cellMap.checkIfAnswered(question)) {
            return 'answered';
        } else {
            return 'unanswered';
        }
    }

}

