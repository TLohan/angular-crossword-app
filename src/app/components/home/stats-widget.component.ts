import { Component, OnInit, Input } from '@angular/core';
import { BoardStat } from 'src/app/models/board/board-stat';

@Component({
    selector: 'app-stats-widget',
    templateUrl: 'stats-widget.component.html',
    styleUrls: ['./stats-widget.component.sass']
})

export class StatsWidgetComponent implements OnInit {

    @Input() stats: BoardStat[];
    today  = Date.now();

    constructor() { }

    ngOnInit() { }
}
