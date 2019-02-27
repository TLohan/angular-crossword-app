import { Component, OnInit, Input } from '@angular/core';
import { BoardStat } from 'src/app/models/board/board-stat';

@Component({
    selector: 'app-stats-widget',
    templateUrl: 'stats-widget.component.html',
    styleUrls: ['./stats-widget.component.sass']
})

export class StatsWidgetComponent implements OnInit {

    @Input() _stats: BoardStat[];
    today  = Date.now();

    get stats(): BoardStat[] {
        if (this._stats) {
            return this._stats.sort(sortByTime);
        }
        return null;
    }

    constructor() { }

    ngOnInit() { }
}

function sortByTime(bs1: BoardStat, bs2: BoardStat) {
    if (bs1.seconds > bs2.seconds) {
        return 1;
    }
    return -1;
}
