import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: 'landing-page.component.html',
    styleUrls: ['./landing-page.component.sass']
})

export class LandingPageComponent implements OnInit {
    constructor(private _authService: AuthService) { }

    ngOnInit() { }

    login(): void {
        this._authService.login();
    }
}
