import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question/question';

@Component({
    selector: 'app-mobile-selected-question-widget',
    templateUrl: 'mobile-selected-question-widget.component.html',
    styleUrls: ['mobile-selected-question-widget.component.sass']
})

export class MobileSelectedQuestionWidgetComponent implements OnInit {

    @Input() selectedQuestion: Question;
    @Output() changeQuestion: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() { }

    selectPrevQuestion() {
        this.changeQuestion.emit('prev');
    }

    selectNextQuestion() {
        this.changeQuestion.emit('next');
    }
}
