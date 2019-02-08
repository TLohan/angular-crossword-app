import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-board-completed-modal',
    templateUrl: 'board-completed-modal.component.html'
})

export class BoardCompletedModalComponent implements OnInit {

    @Input() timer: number;

    constructor() { }

    ngOnInit() { }
}
