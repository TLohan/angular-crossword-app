import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
    templateUrl: './login.component.html',
    selector: 'app-login',
    styles: [`
        @media (max-width: 767.98px) {
            .buttons {
                padding-top: 8px;
            }
            .btn-sm {
                font-size: 1rem;
            }
        }
    `]
})
export class LoginComponent implements OnInit {


    constructor(private authService: AuthService) {
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    ngOnInit(): void {
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    getUsername() {
        return this.authService.user.profile.name;
    }

}
