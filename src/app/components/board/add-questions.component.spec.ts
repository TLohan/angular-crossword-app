import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddQuestionsComponent } from './add-questions.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddQuestionsComponent', () => {

    let fixture: ComponentFixture<AddQuestionsComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                AddQuestionsComponent
            ],
            imports: [
                ReactiveFormsModule
            ]
        });

        fixture = TestBed.createComponent(AddQuestionsComponent);
    });

    it('should display the correct number of cells', () => {
        // arrange
        // act
        // assemble
    });

});
