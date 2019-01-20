import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBoardComponent } from './create-board.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Board } from 'src/app/models/board/board';
import { By } from '@angular/platform-browser';

describe('CreateBoardComponent', () => {

    let fixture: ComponentFixture<CreateBoardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreateBoardComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(CreateBoardComponent);
    });

    it('should have the correct board', () => {
        // arrange
        fixture.componentInstance.board = new Board(8, 9);

        // act
        fixture.detectChanges();
        const rows = fixture.componentInstance.board.numRows;

        // assert
        expect(rows).toBe(8);
    });

    it('should create the correct number of cells', () => {
        // arrange
        fixture.componentInstance.board = new Board(8, 9);
        const numCells = 8 * 9;

        // act
        fixture.detectChanges();
        const cellElements = fixture.debugElement.queryAll(By.css('.cell'));

        // assert
        expect(cellElements.length).toBe(numCells);
    });

    it('should highlight the correct number of cells', () => {
        // arrange
        fixture.componentInstance.resizeBoard();
        fixture.detectChanges();

        // act
        fixture.componentInstance.overCell(8, 8);
        fixture.detectChanges();
        const highlightedCells = fixture.debugElement.queryAll(By.css('.highlighted'));

        // assert
        expect(highlightedCells.length).toBe(81);
    });

    it('should set the dimensions of the board to the selected size', () => {
        // arrange
        fixture.componentInstance.resizeBoard();
        fixture.detectChanges();
        fixture.componentInstance.overCell(10, 12);
        const board = fixture.componentInstance.board;

        // act
        fixture.componentInstance.resize();

        // assert
        expect([board.numRows, board.numCols]).toEqual([11, 13]);
    });

});
