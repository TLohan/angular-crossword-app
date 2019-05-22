import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PlayService } from 'src/app/services/play.service';

@Component({
    selector: 'app-solo-match-finished-modal',
    templateUrl: './solo-match-finished-modal.component.html',
    styleUrls: ['./solo-match-finished-modal.component.sass']
})
export class SoloMatchFinishedModalComponent implements OnInit {

    time = 0;

    constructor(private activeModal: NgbActiveModal, private router: Router, private playService: PlayService) {
        this.playService.timerChanged$.subscribe(val => {
            this.time = val;
        });
    }

    ngOnInit() {
    }

    playAgain() {
        this.activeModal.close();
        this.playService.triggerSoloReplay();
    }

    exit() {
        this.activeModal.close();
        this.router.navigate(['/home']);
    }
}
