import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question/question';
import { PlayService } from 'src/app/services/play.service';

@Component({
    selector: 'app-desktop-selected-question-widget',
    templateUrl: './desktop-selected-question-widget.component.html',
    styleUrls: ['./desktop-selected-question-widget.component.sass']
})
export class DesktopSelectedQuestionWidgetComponent implements OnInit {

    selectedQuestion: Question;

    constructor(private playService: PlayService) {
        this.playService.questionChanged$.subscribe(question => {
            this.selectedQuestion = question;
        });
     }

    ngOnInit() {
    }

}
