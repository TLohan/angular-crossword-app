import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { Question } from 'src/app/models/question/question';
import { Orientation } from 'src/app/play-crossword/orientation.enum';
import { BoardComponent } from '../board/board.component';
import { QuestionFormComponent } from '../question-form/question-form.component';

@Component({
    selector: 'app-add-questions',
    templateUrl: './add-questions.component.html',
    styleUrls: ['./add-questions.component.sass']
})
export class AddQuestionsComponent implements OnInit {

    private _board: Board;
    private _selectedCell: HTMLElement = null;
    private selectedRow: number;
    private selectedCol: number;
    newQuestion: Question;
    questionUnderEdit: Question;
    get questions(): Question[] { return this.board.questions; }
    set questions(value: Question[]) { this.board.questions = value; }
    private _orientation: Orientation;
    answerArr: string[] = [];

    @ViewChild(BoardComponent) private boardComponent: BoardComponent;
    @ViewChild(QuestionFormComponent) private formComponent: QuestionFormComponent;

    addQuestionMode = false;
    editQuestionMode = false;

    @Input() board: Board;
    @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>();

    get orientation(): Orientation {
        return this._orientation;
    }

    set orientation(value: Orientation) {
        this._orientation = value;
    }

    get conflict(): boolean { return this.boardComponent.conflict; }

    set selectedCell(value: HTMLElement) {
        this._selectedCell = value;
        this.addQuestionMode = true;
        const [r, c] = value.id.split('-')[1].split('_');
        this.selectedRow = +r;
        this.selectedCol = +c;
    }

    get selectedCell(): HTMLElement {
        return this._selectedCell;
    }

    get maxAnswerLength(): string {
        let maxLength = 0;
        if (this.orientation === 'down') {
            maxLength = this.board.numCols - this.selectedCol;
        } else {
            maxLength = this.board.numRows - this.selectedRow;
        }
        return maxLength.toString();
    }

    constructor() { }

    ngOnInit() {
        this.orientation = Orientation.DOWN;
    }


    addQuestion(event) {
        console.log('triggered');
        if (event.clue) {
            const newQuestion = new Question(`${this.selectedRow}-${this.selectedCol}`, event.clue, event.answer, this.orientation, '');
            this.questions.push(newQuestion);
        }
        setTimeout(() => {
            this.boardComponent.populateBoard();
        }, 2);
    }


    editQuestion(question: Question) {
        console.log('hit edit question');
        this.boardComponent.depopulateBoard();
        this.boardComponent.populateBoard(question);
        this.formComponent.editQuestion(question);
        this.orientation = question.orientation;
        this.boardComponent.selectCell(question.row, question.col);
    }

    deleteQuestion(question: Question) {
        console.log('hit delete question');
        this.questions = this.questions.filter(element => question.location !== element.location);
        this.boardComponent.depopulateBoard();
        setTimeout(() => {
            this.boardComponent.populateBoard();
        }, 2);
    }

    saveCrossword() {
        this.save.emit(true);
    }

}
