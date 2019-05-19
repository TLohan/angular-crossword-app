import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from 'src/app/services/play.service';

@Component({
    selector: 'app-timer-widget',
    templateUrl: './timer-widget.component.html',
    styleUrls: ['./timer-widget.component.sass']
})
export class TimerWidgetComponent implements OnInit {

    timer: number;

    constructor(private playService: PlayService) {
        this.timer = 0;
        this.playService.timerChanged$.subscribe(val => {
            this.timer = val;
        });
     }

    ngOnInit() {
    }

}
