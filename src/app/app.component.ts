import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth2Service } from './core/auth2.service';
import * as fromRoot from './states/app.state';
import * as authActions from './states/auth.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    title = 'crossword-app';
    _isLoggedIn = true;

    get isLoggedIn() {
        return this._authService.authenticated;
    }

    get profile() {
        return this._authService.userProfile;
    }

    constructor(private _authService: Auth2Service, private _router: Router, private store: Store<fromRoot.State>) { }

    ngOnInit() {
        this.store.dispatch(new authActions.CheckLogin());
    }

}
