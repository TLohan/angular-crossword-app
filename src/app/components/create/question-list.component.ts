import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question/question';

@Component({
    selector: 'app-question-list',
    templateUrl: 'question-list.component.html',
    styleUrls: ['./question-list.component.sass']
})

export class QuestionListComponent implements OnInit {

    @Input() questions: Question[] = [];
    @Output() questionToEdit: EventEmitter<Question> = new EventEmitter<Question>();
    @Output() questionToDelete: EventEmitter<Question> = new EventEmitter<Question>();
    @Output() triggerCrosswordSave: EventEmitter<boolean> = new EventEmitter<boolean>();

    get questionsDown(): Question[] {
        return this.questions.filter(question => question.orientation === 'down');
    }

    get questionsAcross(): Question[] {
        return this.questions.filter(question => question.orientation === 'across');
    }

    constructor() {

     }

    ngOnInit() { }

    editQuestion(question: Question): void {
        this.questionToEdit.emit(question);
    }

    deleteQuestion(question: Question): void {
        this.questionToDelete.emit(question);
    }

    saveCrossword() {
        this.triggerCrosswordSave.emit(true);
    }

}
