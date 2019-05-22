import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board/board';

@Component({
  selector: 'app-configure-board',
  templateUrl: './configure-board.component.html',
  styleUrls: ['./configure-board.component.sass']
})
export class ConfigureBoardComponent {

    private _board: Board = new Board(8, 15);

    @Input()
    set board(board: Board) {
        this._board = board || new Board(6, 10);
        this.numRows = this.board.numRows;
        this.numCols = this.board.numCols;
        for (let index = 0; index < this.board.numRows; index++) {
            this.rows.push(index);
        }
        for (let index = 0; index < this.board.numCols; index++) {
            this.cols.push(index);
        }
    }
    get board(): Board {
        return this._board;
    }

    @Output() sizeSet = new EventEmitter<boolean>();

    resizeMode = false;
    numRows: number;
    numCols: number;

    private _defaultSize = 15;

    rows: number[] = [];
    cols: number[] = [];

    constructor() {

    }

    resizeBoard() {
        this.numRows = this._defaultSize;
        this.numCols = this._defaultSize;
        this.rows = [];
        this.cols = [];
        for (let index = 0; index < this._defaultSize; index++) {
            this.rows.push(index);
            this.cols.push(index);
        }
        this.resizeMode = true;
    }

    resize(): void {
        this.rows = [];
        for (let index = 0; index < this.numRows; index++) {
            this.rows.push(index);
        }
        this.cols = [];
        for (let index = 0; index < this.numCols; index++) {
            this.cols.push(index);
        }
        this.board.numRows = this.rows.length;
        this.board.numCols = this.cols.length;
        this.resizeMode = false;
    }

    overCell(row: number, col: number): void {
        const elements: HTMLElement[] = [];
        const nonElements: HTMLElement[] = [];

        for (let index = 0; index <= row; index++) {
            for (let j = 0; j <= col; j++) {
                const element: HTMLElement = document.getElementById(`cell-${index}_${j}`);
                this.numRows = index + 1;
                this.numCols = j + 1;
                elements.push(element);
            }
        }
        for (let index = row; index < this._defaultSize; index++) {
            for (let j = 0; j < this._defaultSize; j++) {
                const element = document.getElementById(`cell-${index}_${j}`);
                nonElements.push(element);
            }
        }

        for (let i = col; i < this._defaultSize; i++) {
            for (let j = 0; j < this._defaultSize; j++) {
                const element = document.getElementById(`cell-${j}_${i}`);
                nonElements.push(element);
            }
        }

        nonElements.forEach(element => {
            if (element) {
                element.classList.remove('highlighted');
            }
        });
        elements.forEach(element => {
            if (element) {
                element.classList.add('highlighted');
            }
        });
    }

    nextStep(): void {
        this.board.numRows = this.numRows;
        this.board.numCols = this.numCols;
        this.sizeSet.emit(true);
    }
}
