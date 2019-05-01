import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-reveal-answer-warning-modal',
    templateUrl: 'reveal-answer-warning-modal.component.html',
    styles: [`
        .modal
            .show
                display: block
    `]
})

export class RevealAnswerWarningModalComponent implements OnInit {

    @Output() revealAnswer: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    submit(value: boolean) {
        this.revealAnswer.emit(value);
    }

}
