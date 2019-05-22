import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question/question';

@Component({
  selector: 'app-created-questions-list',
  templateUrl: './created-questions-list.component.html',
  styleUrls: ['./created-questions-list.component.sass']
})
export class CreatedQuestionsListComponent implements OnInit {

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
