import { Component, OnInit } from '@angular/core';
import { Auth2Service } from 'src/app/core/auth2.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../states/app.state';
import * as fromAuth from 'src/app/states/auth.actions';

@Component({
    selector: 'app-landing-page',
    templateUrl: 'landing-page.component.html',
    styleUrls: ['./landing-page.component.sass']
})

export class LandingPageComponent implements OnInit {
    constructor(private _authService: Auth2Service, private store: Store<fromRoot.State>) { }

    ngOnInit() { }

    login(): void {
        this.store.dispatch(new fromAuth.Login());
        // this._authService.login();
    }
}
