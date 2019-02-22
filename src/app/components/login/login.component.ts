import { Component, OnInit, Input } from '@angular/core';
import { Auth2Service } from 'src/app/core/auth2.service';

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

    @Input() profile: any;

    constructor(private authService: Auth2Service) {
    }



    ngOnInit(): void {
        // if (localStorage.getItem('isLoggedIn') === 'true') {
        //     this.authService.renewTokens();
        //     this.isLoggedIn = true;
        // } else {
        //     this.isLoggedIn = false;
        // }

        // if (this.authService.userProfile) {
        //     this.profile = this.authService.userProfile;
        //   } else {
        //     this.authService.getProfile((err, profile) => {
        //       this.profile = profile;
        //     });
        // }
        // console.log(this.profile);
    }

    get isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    getUsername() {
        if (this.profile) {
            return this.profile.name;
        }
    }

}
