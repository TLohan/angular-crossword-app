import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Auth2Service } from '../core/auth2.service';
import * as fromRoot from '../states/app.state';
import { Store } from '@ngrx/store';
import * as fromAuth from '../states/auth.reducer';
import { take, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public authService: Auth2Service, private store: Store<fromRoot.State>) {
    }

    canActivate() {
        return this.checkStoreAuthentication().pipe(
            mergeMap(storeAuth => {
                if (storeAuth) {
                    return of(true);
                }
            return this.checkApiAuthentication();
            }),
            map((storeOrApiAuth) => {
                if (!storeOrApiAuth) {
                    this.router.navigate(['/home']);
                    return false;
                }

                return true;
            })
        );
        // if (!this.authService.authenticated) {
        //     this.router.navigate(['']);
        //     return false;
        // }

        // // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }} );
        // return true;
    }

    checkStoreAuthentication() {
        return this.store.select(fromAuth.selectIsLoggedIn).pipe(take(1));
    }

    checkApiAuthentication() {
        return of(this.authService.authenticated);
    }

}
