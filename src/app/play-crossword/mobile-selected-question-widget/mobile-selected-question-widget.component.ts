import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question/question';
import { PlayService } from 'src/app/services/play.service';

@Component({
    selector: 'app-mobile-selected-question-widget',
    templateUrl: './mobile-selected-question-widget.component.html',
    styleUrls: ['./mobile-selected-question-widget.component.sass']
})
export class MobileSelectedQuestionWidgetComponent implements OnInit {

    private _selectedQuestion: Question;

    get selectedQuestion(): Question {
        return this._selectedQuestion;
    }

    set selectedQuestion(value: Question) {
        this.playService.changeQuestion(value);
    }

    constructor(private playService: PlayService) {
        this.playService.questionChanged$.subscribe(question => {
            this._selectedQuestion = question;
        });
    }

    ngOnInit() { }

    selectPrevQuestion() {
        this.playService.selectPreviousQuestion();
    }

    selectNextQuestion() {
        this.playService.selectNextQuestion();
    }
}
