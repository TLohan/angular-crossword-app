import { Component, OnInit } from '@angular/core';
import { RaceModeService } from 'src/app/services/race-mode.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-run-race-mode',
    templateUrl: './run-race-mode.component.html',
    styleUrls: ['./run-race-mode.component.sass']
})
export class RunRaceModeComponent implements OnInit {

    hasOpponent = false;
    numberUsersOnline: Observable<number>;
    queue: Observable<string[]>;
    floj;
    namespaceId: Observable<string>;

    constructor(private raceModeService: RaceModeService) { }

    ngOnInit() {
        this.numberUsersOnline = this.raceModeService.numUsersOnline;
        this.queue = this.raceModeService.onlineQueue;
        this.namespaceId = this.raceModeService.namespace;
    }

}
