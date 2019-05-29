import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComplete } from '../../states/auth.actions';
import * as fromRoot from '../../states/app.state';
import { Store } from '@ngrx/store';

@Component({
    template: `
        <div class="loading">
            <img src="../../../assets/loading.svg" alt="loading">
        </div>
    `
})

export class CallbackComponent implements OnInit {
    constructor(private router: Router, private store: Store<fromRoot.State>) {
        console.log('callback comp cons');
     }

    ngOnInit() {
        console.log('hit callback component');
        this.store.dispatch(new LoginComplete());
        // this.router.navigate(['/']);
     }
}
