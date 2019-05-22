import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayService } from 'src/app/services/play.service';

@Component({
  selector: 'app-reveal-all-modal',
  templateUrl: './reveal-all-modal.component.html',
  styleUrls: ['./reveal-all-modal.component.sass']
})
export class RevealAllModalComponent implements OnInit {

    constructor(private activeModal: NgbActiveModal, private playService: PlayService) { }

    ngOnInit() {
    }

    confirmReveal() {
        this.playService.confirmRevealAll();
        this.activeModal.dismiss();
    }

    cancelReveal() {
        this.activeModal.dismiss();
    }

}
