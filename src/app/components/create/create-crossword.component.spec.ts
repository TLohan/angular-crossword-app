import { CreateCrosswordComponent } from './create-crossword.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardService } from 'src/app/services/board.service';
import { CreateBoardComponent } from '../board/create-board.component';
import { AddQuestionsComponent } from '../board/add-questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/models/board/board';
import { of } from 'rxjs';

describe('CreateCrosswordComponent', () => {

    let fixture: ComponentFixture<CreateCrosswordComponent>;
    let mockBoardService: jasmine.SpyObj<BoardService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(() => {
        mockBoardService = jasmine.createSpyObj(['saveBoard']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            declarations: [
                CreateCrosswordComponent,
                CreateBoardComponent,
                AddQuestionsComponent,
            ],
            imports: [
                ReactiveFormsModule,
            ],
            providers: [
                { provide: BoardService, useValue: mockBoardService },
                { provide: Router, useValue: mockRouter }
            ]
        });

        fixture = TestBed.createComponent(CreateCrosswordComponent);
    });

    it('should display the CreateBoardComponent', () => {
        // arrange
        let createBoardComps: DebugElement[];

        // act
        fixture.detectChanges();
        createBoardComps = fixture.debugElement.queryAll(By.directive(CreateBoardComponent));

        // assert
        expect(createBoardComps.length).toBe(1);
    });

    it('should display AddQuestionsComponent when nextStep is triggered', () => {
        // arrange
        let addQuestionsComps: DebugElement[];

        // act
        fixture.componentInstance.nextStep(true);
        fixture.detectChanges();
        addQuestionsComps = fixture.debugElement.queryAll(By.directive(AddQuestionsComponent));

        // assert
        expect(addQuestionsComps.length).toBe(1);
    });

    it('should navigate to home when Board is saved successfully.', () => {
        // arrange
        mockBoardService.saveBoard.and.returnValue(of(true));
        const board = new Board(10, 10);
        fixture.componentInstance.board = board;

        // act
        fixture.componentInstance.save();

        // assert
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    describe('CreateBoardComponent (child)', () => {
        it('should trigger nextStep() when "Next Step" btn is clicked on CreateBoardComponent', () => {
            // arrange
            spyOn(fixture.componentInstance, 'nextStep');
            fixture.componentInstance.board = new Board(10, 10);
            fixture.detectChanges();
            const createBoardComp = fixture.debugElement.query(By.directive(CreateBoardComponent));
            const nextStepBtn = createBoardComp.query(By.css('#nextStepBtn'));

            // act
            nextStepBtn.triggerEventHandler('click', null);

            // assert
            expect(fixture.componentInstance.nextStep).toHaveBeenCalled();
        });
    });

    describe('AddQuestionsComponent (child)', () => {

        it('should trigger save() when "Save Crossword" btn is clicked', () => {
            // arrange
            mockBoardService.saveBoard.and.returnValue(of(true));
            spyOn(fixture.componentInstance, 'save');
            fixture.componentInstance.board = new Board(10, 10);
            fixture.componentInstance.pickSizeMode = false;
            fixture.detectChanges();
            const addQuestionsComp = fixture.debugElement.query(By.directive(AddQuestionsComponent));
            const submitBtn = addQuestionsComp.query(By.css('#saveCrosswordBtn'));

            // act
            submitBtn.triggerEventHandler('click', null);

            // assert
            expect(fixture.componentInstance.save).toHaveBeenCalled();
        });

    });

});
