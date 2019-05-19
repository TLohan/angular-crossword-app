import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question/question';
import { _localeFactory } from '@angular/core/src/application_module';
import { Orientation } from '../play/orientation.enum';

@Component({
    templateUrl: './add-questions.component.html',
    selector: 'app-add-questions',
    styleUrls: ['./add-questions.component.sass']
})
export class AddQuestionsComponent implements OnInit {
    private _board: Board;

    @Input()
    set board(value: Board) {
        this._board = value;
        this._board.populateBoardMap();
    }

    get board(): Board {
        return this._board;
    }

    @Output() finished: EventEmitter<boolean> = new EventEmitter();

    _selectedCell: HTMLElement;
    selectedCol: number;
    selectedRow: number;
    addQuestionMode = false;
    editQuestionMode = false;
    questionUnderEdit: Question;
    questionFormGroup: FormGroup;
    private _orientation: Orientation;
    questions: Question[] = [];
    @ViewChild('clue') clueField: ElementRef;
    @ViewChild('downLabel') downLabel?: ElementRef;
    @ViewChild('acrossLabel') acrossLabel: ElementRef;

    alteredCells: HTMLElement[] = [];

    constructor() {

    }

    set selectedCell(element: HTMLElement) {
        if (this._selectedCell !== undefined) { this._selectedCell.classList.remove('selectedCell'); }
        this._selectedCell = element;
        element.classList.add('selectedCell');
    }

    get selectedCell(): HTMLElement {
        return this._selectedCell;
    }

    get clue() { return this.questionFormGroup.get('clue'); }
    get answer() { return this.questionFormGroup.get('answer'); }

    get questionsAcross(): Question[] {
        return this.questions.filter((question) => question.orientation === 'across');
    }

    get questionsDown(): Question[] {
        return this.questions.filter(question => question.orientation === 'down');
    }

    populateBoard(): void {
        this.questions.forEach(question => {
            const loc = question.location.split('-');
            let row = +loc[0];
            let col = +loc[1];
            const answer = question.answer.split('');
            answer.forEach(letter => {
                const element = this.getElement(row, col);
                element.querySelector('.letter').textContent = letter;
                if (letter !== '') {
                    element.classList.add('occupiedCell');
                    element.classList.remove('emptyCell');
                    if (question.orientation === 'down') {
                        col++;
                    } else {
                        row++;
                    }
                }
            });
        });
    }

    set orientation(value: Orientation) {
        this._orientation = value;
        const downElement = document.getElementById('downLabel');
        const acrossElement = document.getElementById('acrossLabel');
        if (downElement && acrossElement) {
            if (this.orientation === 'down') {
                downElement.classList.add('active');
                acrossElement.classList.remove('active');
            } else {
                downElement.classList.remove('active');
                acrossElement.classList.add('active');
            }
        }
    }

    toggleOrientation(value: Orientation): void {
        this.orientation = value;
        this.resetAlteredCells();
        this.populateBoard();
        const answer = this.answer.value;

        let answerArr: string[] = answer.split('');

        answerArr = answerArr.slice(0, this.maxAnswerLength);
        this.answer.setValue(answerArr.join(''));
        const col = this.selectedCol;
        const row = this.selectedRow;
        this.populateAnswer(answerArr, row, col);
    }

    get orientation(): Orientation {
        return this._orientation;
    }

    ngOnInit() {
        this.questionFormGroup = new FormGroup({
            clue: new FormControl(),
            answer: new FormControl(Validators.required)
        });
        this.orientation = Orientation.DOWN;

    }

    private getElement(row: number, col: number): HTMLElement {
        return document.getElementById(`cell-${row}_${col}`);
    }


    selectCell(row: number, col: number): void {
        this.addQuestionMode = true;
        this.resetForm();
        this.resetAlteredCells();
        this.selectedCell = this.getElement(row, col);
        this.selectedRow = row;
        this.selectedCol = col;
        setTimeout(() => this.clueField.nativeElement.focus());
    }

    resetAlteredCells() {
        this.alteredCells.forEach(cell => {
            cell.querySelector('.letter').textContent = '';
            cell.classList.add('emptyCell');
            cell.classList.remove('occupiedCell');
        });
        this.alteredCells = [];
    }

    get maxAnswerLength(): number {
        let maxLength = 0;
        if (this.orientation === 'down') {
            maxLength = this.board.numCols - this.selectedCol;
        } else {
            maxLength = this.board.numRows - this.selectedRow;
        }
        return maxLength;
    }

    addQuestion(): void {
        this.alteredCells = [];
        this.populateBoard();
        const location = `${this.selectedRow}-${this.selectedCol}`;
        const question = new Question(location, this.clue.value, this.answer.value, this.orientation, '');
        this.questions.push(question);
        this.resetForm();
    }

    checkValidity(): boolean {
        return this.clue.invalid || this.answer.invalid;
    }

    mouseOverSubmit(bool: boolean) {
        if (bool) {
            if (this.clue.errors && this.clue.errors.required) {
                document.getElementById('clueRequiredFeedback').style.visibility = 'visible';
            }
            if (this.answer.errors && this.answer.errors.required) {
                document.getElementById('answerRequiredFeedback').style.visibility = 'visible';
            }
        } else {
            document.getElementById('clueRequiredFeedback').style.visibility = 'hidden';
            document.getElementById('answerRequiredFeedback').style.visibility = 'hidden';
        }
    }

    onKey(event: any) {
        console.log('triggered');
        if (this.addQuestionMode) {
            this.resetAlteredCells();
            const answerArr = event.target.value.split('');
            const col = this.selectedCol;
            const row = this.selectedRow;
            this.populateAnswer(answerArr, row, col);
        }
    }

    populateAnswer(answerArr: string[], row: number, col: number) {
        answerArr.forEach((letter: string, index: number) => {
            try {
                const element = this.getElement(row, col);
                this.alteredCells.push(element);
                element.querySelector('.letter').textContent = letter;
                if (letter !== '') {
                    element.classList.add('occupiedCell');
                    element.classList.remove('emptyCell');
                    this.orientation === 'down' ? col++ : row++;
                }
            } catch (TypeError) {
                console.log('too long');
            }
        });
    }

    resetForm(): void {
        this.clue.setValue('');
        this.answer.setValue('');
    }

    saveBoard(): void {
        this.board.questions = this.questions;
        this.finished.emit(true);
    }

    editQuestion(question: Question) {
        this.addQuestionMode = false;
        this.editQuestionMode = true;
        this.orientation = question.orientation;
        this.clue.setValue(question.clue);
        this.answer.setValue(question.answer);
        this.questionUnderEdit = this.questions.find(element => {
            return element.location === question.location;
        });
        this.selectedCell = this.getElement(question.row, question.col);
    }

    submitEditedQuestion(): void {
        this.questionUnderEdit.clue = this.clue.value;
        this.questionUnderEdit.answer = this.answer.value;
        this.questionUnderEdit.orientation = this.orientation;
        this.resetForm();
        this.editQuestionMode = false;
    }

    deleteQuestion(question: Question) {
        this.questions = this.questions.filter(element => {
            return element.clue !== question.clue;
        });
    }

}
