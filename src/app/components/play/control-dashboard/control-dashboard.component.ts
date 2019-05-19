import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { RaceModeService } from 'src/app/services/race-mode.service';
import { Question } from 'src/app/models/question/question';
import { PlayMode } from '../play-mode.interface';

@Component({
    selector: 'app-control-dashboard',
    templateUrl: './control-dashboard.component.html',
    styleUrls: ['./control-dashboard.component.sass']
})
export class ControlDashboardComponent implements OnInit {

    @Input() mode: PlayMode;

    remainingReveals = 3;
    selectedQuestion: Question;
    revealedQuestions: Question[] = [];

    constructor(private playService: PlayService, private raceModeService: RaceModeService) {
        this.playService.changeRemainingReveals(this.remainingReveals);

        this.playService.questionChanged$.subscribe(question => {
            this.selectedQuestion = question;
        });
    }

    ngOnInit() {
    }

    get canReveal(): boolean {
        return (this.selectedQuestion && this.remainingReveals > 0);
    }

    check() {
        this.playService.triggerCheckBoard();
    }

    getConfirmationOnReveal(mode: string) {
        const notAlreadyRevealed = this.revealedQuestions.every(q => this.selectedQuestion.clue !== q.clue);
        if (this.canReveal && notAlreadyRevealed) {
            this.remainingReveals--;
            this.revealedQuestions.push(this.selectedQuestion);
            this.playService.changeRemainingReveals(this.remainingReveals);
            if (this.mode === PlayMode.RACE_MODE) {
                this.raceModeService.updateRemainingReveals(this.remainingReveals);
            }
        }
    }

}
