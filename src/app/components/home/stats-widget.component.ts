import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BoardStat } from 'src/app/models/board/board-stat';

@Component({
    selector: 'app-stats-widget',
    templateUrl: 'stats-widget.component.html',
    styleUrls: ['./stats-widget.component.sass']
})

export class StatsWidgetComponent implements OnInit, AfterViewInit {

    @Input() _stats: BoardStat[];

    toggledDown = true;

    get stats(): BoardStat[] {
        if (this._stats) {
            return this._stats.sort(sortByTime);
        }
        return [];
    }

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        const element = document.getElementById('statsHeader');
        element.click();
        this.toggledDown = true;
    }

    toggle() {
        this.toggledDown = !this.toggledDown;
    }
}

function sortByTime(bs1: BoardStat, bs2: BoardStat) {
    if (bs1.seconds > bs2.seconds) {
        return 1;
    }
    return -1;
}
