import { Component, OnInit, Input } from '@angular/core';
import { RaceModeService } from 'src/app/services/race-mode.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-race-ended-modal',
    templateUrl: './race-ended-modal.component.html',
    styleUrls: ['./race-ended-modal.component.sass']
})
export class RaceEndedModalComponent {

    @Input() ownProgress: number;
    @Input() opponentProgress: number;
    closeResult: string;

    get wonMatch(): boolean {
        if (this.ownProgress !== undefined && this.opponentProgress !== undefined) {
            return this.ownProgress > this.opponentProgress;
        }
    }

    constructor(private raceModeService: RaceModeService, private router: Router, private activeModal: NgbActiveModal) {
        console.log('created modal');
    }

    playAgain() {
        this.activeModal.close();
        this.raceModeService.requestReplay();
    }

    refuseReplay() {
        this.activeModal.close();
        this.raceModeService.declineReplay();
        this.router.navigate(['/home']);
    }

}
