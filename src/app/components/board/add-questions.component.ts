import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question/question';
import { _localeFactory } from '@angular/core/src/application_module';
import { BoardService } from 'src/app/services/board.service';

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

    selectedCell: HTMLElement;
    selectedCol: number;
    selectedRow: number;
    addQuestionMode = false;
    questionFormGroup: FormGroup;
    private _orientation = 'down';
    questions: Question[] = [];
    @ViewChild('clue') clueField: ElementRef;
    @ViewChild('downLabel') downLabel?: ElementRef;
    @ViewChild('acrossLabel') acrossLabel: ElementRef;

    alteredCells: HTMLElement[] = [];

    constructor() {

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
                element.innerHTML = `<p>${letter}</p>`;
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

    set orientation(value: string) {
        this._orientation = value;
    }

    toggleOrientation(value: string): void {
        this.orientation = value;
        const downElement = document.getElementById('downLabel');
        const acrossElement = document.getElementById('acrossLabel');
        if (this.orientation === 'down') {
            downElement.classList.add('active');
            acrossElement.classList.remove('active');
        } else {
            downElement.classList.remove('active');
            acrossElement.classList.add('active');
        }
        this.alteredCells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.add('emptyCell');
            cell.classList.remove('occupiedCell');
        });
        this.populateBoard();
        const answer = this.answer.value;

        let answerArr: string[] = answer.split('');

        answerArr = answerArr.slice(0, this.maxAnswerLength);
        this.answer.setValue(answerArr.join(''));
            let col = this.selectedCol;
            let row = this.selectedRow;
            answerArr.forEach((letter: string, index: number) => {
                try {
                    const element = this.getElement(row, col);
                    this.alteredCells.push(element);
                    element.innerHTML = `<p>${letter}</p>`;
                    if (letter !== '') {
                        element.classList.add('occupiedCell');
                        element.classList.remove('emptyCell');
                        if (this.orientation === 'down') {
                            col++;
                        } else {
                            row++;
                        }
                    }
                } catch (TypeError) {
                    console.log('too long');
                }
            });
    }

    get orientation(): string {
        return this._orientation;
    }

    ngOnInit() {
        this.questionFormGroup = new FormGroup({
            clue: new FormControl(),
            answer: new FormControl(Validators.required)
        });
        this.orientation = 'down';

    }

    private getElement(row: number, col: number): HTMLElement {
        return document.getElementById(`cell-${row}_${col}`);
    }


    selectCell(row: number, col: number): void {
        this.addQuestionMode = true;

        this.questionFormGroup = new FormGroup({
            clue: new FormControl(),
            answer: new FormControl()
        });
        this.populateBoard();
        this.alteredCells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.add('emptyCell');
            cell.classList.remove('occupiedCell');
        });
        this.clue.setValidators(Validators.required);
        this.answer.setValidators([Validators.required]);

        if (this.selectedCell !== undefined) { this.selectedCell.classList.remove('selectedCell'); }
        const element = this.getElement(row, col);
        this.selectedCell = element;
        element.classList.add('selectedCell');
        this.selectedRow = row;
        this.selectedCol = col;
        this.questionFormGroup.controls['clue'].setValue('');
        this.questionFormGroup.controls['answer'].setValue('');
        if (this.orientation === 'down') {
            setTimeout(() => this.downLabel.nativeElement.classList.add('active'));
            setTimeout(() => this.acrossLabel.nativeElement.classList.remove('active'));
        } else {
            setTimeout(() => this.downLabel.nativeElement.classList.remove('active'));
            setTimeout(() => this.acrossLabel.nativeElement.classList.add('active'));
        }
        setTimeout(() => this.clueField.nativeElement.focus());
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
        const clue = this.questionFormGroup.controls['clue'].value;
        const answer = this.questionFormGroup.controls['answer'].value;
        const question = new Question(location, clue, answer, this.orientation, '');
        this.questions.push(question);
        // this.addQuestionMode = false;
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
            this.alteredCells.forEach(cell => {
                cell.innerHTML = '';
                cell.classList.add('emptyCell');
                cell.classList.remove('occupiedCell');
            });
            this.populateBoard();
            const answerArr = event.target.value.split('');
            let col = this.selectedCol;
            let row = this.selectedRow;
            answerArr.forEach((letter: string, index: number) => {
                try {
                    const element = this.getElement(row, col);
                    this.alteredCells.push(element);
                    element.innerHTML = `<p>${letter}</p>`;
                    if (letter !== '') {
                        element.classList.add('occupiedCell');
                        element.classList.remove('emptyCell');
                        if (this.orientation === 'down') {
                            col++;
                        } else {
                            row++;
                        }
                    }
                } catch (TypeError) {
                    console.log('too long');
                }
            });
        }
    }

    saveBoard(): void {
        this.board.questions = this.questions;
        this.finished.emit(true);
    }

}
