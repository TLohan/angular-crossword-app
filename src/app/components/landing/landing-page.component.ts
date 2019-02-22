import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Auth2Service } from 'src/app/core/auth2.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: 'landing-page.component.html',
    styleUrls: ['./landing-page.component.sass']
})

export class LandingPageComponent implements OnInit {
    constructor(private _authService: Auth2Service) { }

    ngOnInit() { }

    login(): void {
        this._authService.login();
    }
}
