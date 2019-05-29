import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RaceModeService } from 'src/app/services/race-mode.service';

@Component({
    selector: 'app-wait-for-opponent-modal',
    templateUrl: './wait-for-opponent-modal.component.html',
    styleUrls: ['./wait-for-opponent-modal.component.sass']
})
export class WaitForOpponentModalComponent implements OnInit {

    @Input() numUsersOnline: Observable<number>;

    constructor(private router: Router, private raceModeService: RaceModeService) { }

    ngOnInit() {
        this.raceModeService.getUsersOnline();
    }

    cancel() {
        if (this.raceModeService.matchSocket) {
            this.raceModeService.matchSocket.socket.disconnect();
        }
        // this.raceModeService.socket.disconnect();
        this.raceModeService.connected = false;
        this.router.navigate(['']);
    }

}
