import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { Orientation } from 'src/app/play-crossword/orientation.enum';
import { Question } from 'src/app/models/question/question';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
    private _board: Board;
    private _selectedCell: HTMLElement;
    private alteredCells: HTMLElement[] = [];
    private occupiedCells: HTMLElement[] = [];
    private _answerArr: string[];
    private doubleLetter: any[] = [];
    private _orientation: Orientation;
    private _nextCell: HTMLElement;
    @Input()
    set orientation(value: Orientation) {
        this._orientation = value;
        this.populateAnswer();
    }

    get orientation(): Orientation {
        return this._orientation;
    }

    get conflict(): boolean {
        if (this.alteredCells.length > 0) {
            return !this.alteredCells.every(cell => {
                return !cell.classList.contains('bg-danger');
            });
        }
        return false;
    }

    @Input()
    set answer(value: string) {
        this._answerArr = value.split('');
        this.populateAnswer();
    }

    get answerArr(): string[] {
        return this._answerArr;
    }


    @Input()
    set board(value: Board) {
        this._board = value;
        this._board.populateBoardMap();
    }

    get board(): Board {
        return this._board;
    }

    @Input()
    set selectedCell(value: HTMLElement) {
        if (this.selectedCell) { this.selectedCell.classList.remove('selectedCell'); }
        if (value) {
            this._selectedCell = value;
            this._selectedCell.classList.add('selectedCell');
            this.selectedCellChange.emit(this._selectedCell);
        }
    }

    get selectedCell(): HTMLElement {
        return this._selectedCell;
    }

    get nextCell(): HTMLElement {
        return this._nextCell;
    }

    set nextCell(value: HTMLElement) {
        if (this.nextCell) {
            this.nextCell.classList.remove('nextCell');
        }
        this._nextCell = value;
        this.nextCell.classList.add('nextCell');
    }

    get questions(): Question[] { return this.board.questions; }

    @Output() selectedCellChange: EventEmitter<HTMLElement> = new EventEmitter();

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit() { }

    populateBoard(skipQuestion: Question = null) {
        this.questions.forEach(question => {
            if (question !== skipQuestion) {
                let row = question.row;
                let col = question.col;
                const ansArr: string[] = question.answer.split('');
                ansArr.forEach((letter) => {
                    const cell = this.getElement(row, col);
                    this.occupiedCells.push(cell);
                    cell.classList.add('bg-light');
                    cell.querySelector('.letter').textContent = letter;
                    question.orientation === 'down' ? col++ : row++;
                });
            }
        });
    }

    depopulateBoard() {
        this.occupiedCells.forEach(cell => {
            cell.classList.remove('bg-light');
            cell.querySelector('.letter').textContent = '';
        });
        this.occupiedCells = [];
    }

    populateAnswer() {
        if (this.selectedCell) {
            const [r, c] = this.selectedCell.id.split('-')[1].split('_');
            let [row, col] = [+r, +c];
            this.resetAlteredCells();
            this.answerArr.forEach((letter, index) => {
                const element = this.getElement(row, col);
                if (element) {
                    this.alteredCells.push(element);
                    const currentLetter = element.querySelector('.letter').textContent;
                    if (currentLetter !== letter) {
                        element.querySelector('.letter').textContent += letter;
                    } else {
                        element.classList.add('xroads');
                        this.doubleLetter.push({ letter: letter, cell: element });
                    }
                    if (element.querySelector('.letter').textContent.length > 1) {
                        element.classList.remove('bg-light');
                        element.classList.add('bg-danger');
                    } else {
                        element.classList.add('bg-light');
                    }
                    this.orientation === 'down' ? col++ : row++;
                    if (col < this.board.numCols && row < this.board.numRows) { this.nextCell = this.getElement(row, col); }
                }
            });
            if (this.answerArr.length === 0 && this.nextCell) {
                this.nextCell.classList.remove('nextCell');
            }
        }
    }

    resetAlteredCells(): void {
        this.alteredCells.forEach(cell => {
            cell.classList.remove('currentElement');
            const letterElement = cell.querySelector('.letter');
            if (letterElement.textContent.length > 1) {
                letterElement.textContent = letterElement.textContent.slice(0, 1);
                cell.classList.add('bg-light');
                cell.classList.remove('bg-danger');
            } else {
                if (cell.classList.contains('xroads')) {
                    letterElement.textContent = this.doubleLetter.find(element => element.cell === cell).letter;
                } else {
                    cell.classList.remove('bg-light');
                    letterElement.textContent = '';
                }
            }
        });
        this.alteredCells = [];
    }

    selectCell(row: number, col: number): void {
        this.selectedCell = this.getElement(row, col);
        this.populateAnswer();
    }

    private getElement(row: number, col: number): HTMLElement {
        return document.getElementById(`cell-${row}_${col}`);
    }

}
