import { Component, OnInit } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';
import { RaceModeService } from 'src/app/services/race-mode.service';

@Component({
    selector: 'app-progress-dashboard',
    templateUrl: './progress-dashboard.component.html',
    styleUrls: ['./progress-dashboard.component.sass']
})
export class ProgressDashboardComponent implements OnInit {

    progress: number;
    opponentProgress: number;

    opponentRemainingReveals: number;
    remainingReveals: number;

    constructor(private playService: PlayService, private raceModeService: RaceModeService) {
        this.playService.progressChanged$.subscribe(progress => {
            this.progress = progress;
            this.raceModeService.updateProgress(this.progress);
        });

        this.raceModeService.opponentProgressSource.subscribe(progress => {
            this.opponentProgress = progress;
        });

        this.playService.revealsRemainingChanged$.subscribe(remainingReveals => {
            this.remainingReveals = remainingReveals;
        });

        this.raceModeService.opponentRemainingRevealsSource.subscribe(reveals => {
            this.opponentRemainingReveals = reveals;
        });
     }

    ngOnInit() {
        this.progress = 0;
        this.opponentProgress = 0;
        this.opponentRemainingReveals = 3;
    }

}
