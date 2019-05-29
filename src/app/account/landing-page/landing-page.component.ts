import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../states/app.state';
import * as authActions from '../../states/auth.actions';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

    constructor(private store: Store<fromRoot.State>) { }

    ngOnInit() {
    }

    login(): void {
        this.store.dispatch(new authActions.Login());
        // this._authService.login();
    }
}
