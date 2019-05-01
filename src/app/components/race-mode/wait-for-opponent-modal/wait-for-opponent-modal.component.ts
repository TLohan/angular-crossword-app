import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
        this.raceModeService.ngOnDestroy();
        this.router.navigate(['/']);
    }

}
