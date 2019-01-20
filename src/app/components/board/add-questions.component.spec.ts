import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddQuestionsComponent } from './add-questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Board } from 'src/app/models/board/board';
import { By } from '@angular/platform-browser';
import { DebugElement, ElementRef, asNativeElements } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Button } from 'protractor';

describe('AddQuestionsComponent', () => {

    let fixture: ComponentFixture<AddQuestionsComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                AddQuestionsComponent
            ],
            imports: [
                ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(AddQuestionsComponent);
    });

    it('should display the correct number of cells', () => {
        // arrange
        fixture.componentInstance.board = new Board(12, 12);
        fixture.detectChanges();

        // act
        const cells = fixture.debugElement.queryAll(By.css('.cell'));

        // assemble
        expect(cells.length).toBe(144);
    });

    describe('Form', () => {

        const rowSelected = 5;
        const colSelected = 6;

        beforeEach(() => {
            fixture.componentInstance.board = new Board(12, 12);
            fixture.detectChanges();
            fixture.componentInstance.selectCell(rowSelected, colSelected);
            fixture.detectChanges();
        });

        it('orientation btn group should set orientation', () => {
            // arrange
            const form = fixture.debugElement.query(By.css('form'));
            const acrossBtn = form.query(By.css('#acrossLabel'));

            // act
            acrossBtn.triggerEventHandler('click', null);

            // assert
            expect(fixture.componentInstance.orientation).toBe('across');
        });

        it('characters entered in answer field should populate correct cells', () => {
            // arrange
            const answerField = fixture.debugElement.query(By.css('#answerField'));
            const testAnswer = 'tests';

            // act
            answerField.nativeElement.value = testAnswer;
            const e = new KeyboardEvent('keyup');
            answerField.nativeElement.dispatchEvent(e);
            const results = [];
            fixture.detectChanges();
            let selectedCell: DebugElement;
            for (let index = 0; index < testAnswer.length; index++) {
                selectedCell = fixture.debugElement.query(By.css(`#cell-${rowSelected}_${colSelected + index}`));
                results.push(selectedCell.nativeElement.textContent);
            }

            // assert
            expect(testAnswer.split('')).toEqual(results);
        });

        it('should rearrange alteredCells when orientation is changed', () => {
            // arrange
            const answerField = fixture.debugElement.query(By.css('#answerField'));
            const testAnswer = 'tes';

            // act
            fixture.componentInstance.answer.setValue(testAnswer);
            fixture.detectChanges();
            const e = new KeyboardEvent('keyup');
            answerField.nativeElement.dispatchEvent(e);
            const results = [];
            fixture.componentInstance.toggleOrientation('across');
            let selectedCell: DebugElement;
            for (let index = 0; index < testAnswer.length; index++) {
                selectedCell = fixture.debugElement.query(By.css(`#cell-${rowSelected + index}_${colSelected}`));
                results.push(selectedCell.nativeElement.textContent);
            }

            // assert
            expect(testAnswer.split('')).toEqual(results);
        });


        it('should display submitted down questions correctly', () => {
            // arrange
            const submitBtn = fixture.debugElement.query(By.css('#submitBtn'));
            const testClue = 'Exam, challenge';
            const testAnswer = 'test';

            // act
            fixture.componentInstance.clue.setValue(testClue);
            fixture.componentInstance.answer.setValue(testAnswer);
            submitBtn.triggerEventHandler('click', null);
            fixture.detectChanges();
            const questionsList = fixture.debugElement.query(By.css('#questionsDown'));
            const questionElements = questionsList.queryAll(By.css('.question'));

            // assert
            expect(questionElements.length).toBe(1);
        });

        it('should display submitted across questions correctly', () => {
            // arrange
            const submitBtn = fixture.debugElement.query(By.css('#submitBtn'));
            const testClue = 'Exam, challenge';
            const testAnswer = 'test';

            // act
            fixture.componentInstance.clue.setValue(testClue);
            fixture.componentInstance.answer.setValue(testAnswer);
            fixture.componentInstance.toggleOrientation('across');
            submitBtn.triggerEventHandler('click', null);
            fixture.detectChanges();
            const questionsList = fixture.debugElement.query(By.css('#questionsAcross'));
            const questionElements = questionsList.queryAll(By.css('.question'));

            // assert
            expect(questionElements.length).toBe(1);
        });

    });

});
