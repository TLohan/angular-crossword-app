import { Component, OnInit, Input } from '@angular/core';
import { Auth2Service } from 'src/app/core/auth2.service';
import * as fromRoot from '../../states/app.state';
import { Store, select } from '@ngrx/store';
import * as authActions from '../../states/auth.actions';
import * as fromAuth from '../../states/auth.reducer';

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

    constructor(private authService: Auth2Service, private store: Store<fromRoot.State>) {
    }



    ngOnInit(): void {
        this.store.pipe(select(fromAuth.selectUserProfile)).subscribe(profile => {
            if (profile) {
                this.profile = profile;
            }
        });
    }

    get isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    login() {
        this.store.dispatch(new authActions.Login());
    }

    logout() {
        this.store.dispatch(new authActions.Logout());
    }

    getUsername() {
        if (this.profile) {
            return this.profile.name;
        }
    }

}
