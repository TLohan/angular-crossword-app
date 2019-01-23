import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayComponent } from './play.component';
import { BoardService } from 'src/app/services/board.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Board } from 'src/app/models/board/board';
import { Question } from 'src/app/models/question/question';
import { By } from '@angular/platform-browser';


describe('PlayComponent', () => {

    // TO DO: Write the entire test.
    let mockBoard: Board;
    let fixture: ComponentFixture<PlayComponent>;
    let mockBoardService: jasmine.SpyObj<BoardService>;
    const mockActivatedRoute = {
        snapshot: {
            paramMap: {
                get: () => {
                    return '5';
                }
            }
        }
    };

    beforeEach(() => {
        mockBoard = new Board(6, 6);
        mockBoard.questions = [
            new Question('0-0', 'first q', 'alpha', 'down', '1D'),
            new Question('0-1', 'second', 'lima', 'across', '2A'),
            new Question('0-3', 'fourth', 'hotel', 'across', '4A'),
            new Question('4-2', 'third', 'plan', 'down', '3D'),
        ];

        mockBoardService = jasmine.createSpyObj(['getBoard']);

        TestBed.configureTestingModule({
            declarations: [
                PlayComponent
            ],
            providers: [
                { provide: BoardService, useValue: mockBoardService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });

        fixture = TestBed.createComponent(PlayComponent);
        mockBoardService.getBoard.and.returnValue(of(mockBoard));
    });

    it('should display the board correctly', () => {
        // arrange

        // act
        fixture.detectChanges();
        const cells = fixture.debugElement.queryAll(By.css('.cell'));

        // assert
        expect(cells.length).toBe(36);
    });

    it('should apply classes correctly', () => {
        // arrange

        // act
        fixture.detectChanges();
        fixture.componentInstance.populateBoard();
        fixture.detectChanges();
        const clickableCells = fixture.debugElement.queryAll(By.css('.clickable'));

        // assert
        expect(clickableCells.length).toBe(15);
    });


});
