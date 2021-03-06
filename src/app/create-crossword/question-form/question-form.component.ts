import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question/question';
import { Orientation } from 'src/app/play-crossword/orientation.enum';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.sass']
})
export class QuestionFormComponent implements OnInit {
    questionFormGroup: FormGroup;
    private _orientation: Orientation;
    private _maxAnswerLength: number;
    private _questionUnderEdit: Question;
    private _answerArr: string[];

    mouseOverSubmitFlag = false;

    // @Input() questions: Question[];
    @Input()
    set answerArr(value: string[]) {
        this._answerArr = value;
        this.answerArrChange.emit(this._answerArr);
    }

    get answerArr(): string[] {
        return this._answerArr;
    }

    @Input() conflict: boolean;

    @Input() addQuestionMode = false;
    @Input() editQuestionMode = false;
    @Input()
    get maxAnswerLength(): number {
        return this._maxAnswerLength;
    }

    set maxAnswerLength(value: number) {
        this._maxAnswerLength = value;
        if (this.answerArr.length > this.maxAnswerLength) {
            this.answerArr.splice(this.maxAnswerLength);
            this.answerField.setValue(this.answerArr.join(''));
        }
    }

    @Input()
    set orientation(value: Orientation) {
        this._orientation = value;
        this.orientationChange.emit(this._orientation);
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

    get orientation(): Orientation {
        return  this._orientation;
    }

    @Output() answerArrChange: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() orientationChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() addQuestion: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.questionFormGroup = new FormGroup({
            clueField: new FormControl(),
            answerField: new FormControl()
        });
    }


    get clueField() { return this.questionFormGroup.get('clueField'); }
    get answerField() { return this.questionFormGroup.get('answerField'); }

    checkValidity() {
        return this.clueField.invalid || this.answerField.invalid || this.conflict;
    }

    mouseOverSubmit(flag: boolean) {
        this.mouseOverSubmitFlag = flag;
        if (flag) {
            if (this.clueField.invalid) {
                document.getElementById('clueRequiredFeedback').style.display = 'inline';
                document.querySelector<HTMLElement>('.formBtn').style.cursor = 'not-allowed';
            }
            if (this.answerField.errors && this.answerField.errors.required) {
                document.getElementById('answerRequiredFeedback').style.display = 'inline';
                document.querySelector<HTMLElement>('.formBtn').style.cursor = 'not-allowed';
            }
            if (this.conflict) {
                document.querySelector<HTMLElement>('.formBtn').style.cursor = 'not-allowed';
            }
        } else {
            document.getElementById('clueRequiredFeedback').style.display = 'none';
            document.getElementById('answerRequiredFeedback').style.display = 'none';
            document.querySelector<HTMLElement>('.formBtn').style.cursor = 'pointer';
        }
    }

    onKey(event: any) {

    }

    alphaOnly(event: KeyboardEvent) {
        const key = event.keyCode;
        if (((key >= 65 && key <= 90) || key === 8) && this.answerArr.length <= this.maxAnswerLength) {
            return true;
        } else if (key >= 37 && key <= 40) {
            return true;
        } else {
            return false;
        }
    }

    updateBoard() {
        const val: string = this.answerField.value;
        if (val) {
            this.answerArr = val.toUpperCase().split('');
        }
    }

    toggleOrientation(value: Orientation): void {
        this.orientation = value;
    }

    editQuestion(question: Question) {
        this.editQuestionMode = true;
        this.clueField.setValue(question.clue);
        this.answerField.setValue(question.answer.toUpperCase());
        this.orientation = question.orientation;
        this._questionUnderEdit = question;
        this.answerArr = question.answer.split('');
    }

    submitEditedQuestion() {
        this._questionUnderEdit.clue = this.clueField.value;
        this._questionUnderEdit.answer = this.answerField.value.toUpperCase();
        this._questionUnderEdit.orientation = this.orientation;
        this.resetForm();
        this.editQuestionMode = false;
        this._questionUnderEdit = null;
        this.addQuestion.emit(true);
    }

    submitNewQuestion() {
        const clue = this.clueField.value;
        const answer: string = this.answerField.value.toUpperCase();
        const newQuestion = {
            clue: clue,
            answer: answer,
            orientation: this.orientation
        };
        this.addQuestion.emit(newQuestion);
        this.resetForm();
    }

    private resetForm() {
        this.clueField.setValue('');
        this.answerField.setValue('');
        this.answerArr.splice(0);
        this.mouseOverSubmitFlag = false;
    }
}
