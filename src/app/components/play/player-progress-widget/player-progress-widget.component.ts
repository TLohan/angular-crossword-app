import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-player-progress-widget',
    templateUrl: './player-progress-widget.component.html',
    styleUrls: ['./player-progress-widget.component.sass']
})
export class PlayerProgressWidgetComponent implements OnInit {

    @Input() playerName: string;
    @Input() value: number;
    @Input() color: string;
    @Input() revealsRemaining: number;

    constructor() { }

    ngOnInit() {
    }

}
