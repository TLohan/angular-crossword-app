import { Injectable, OnInit } from '@angular/core';
import * as fromAuth from './auth.actions';
import * as fromRoot from './app.state';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Auth2Service } from '../core/auth2.service';
import { Router } from '@angular/router';
import { of, empty } from 'rxjs';
import { tap, exhaustMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthEffects implements OnInit {

    constructor(private actions$: Actions, private authService: Auth2Service, private router: Router) {
        console.log('hit auth effects');
    }

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(ofType<fromAuth.Login>(fromAuth.AuthActionTypes.Login), tap(() => {
        console.log('hit login in effect');
        return this.authService.login();
    }));

    @Effect()
    loginComplete$ = this.actions$.pipe(
        ofType<fromAuth.Login>(fromAuth.AuthActionTypes.LoginComplete),
        exhaustMap(() => {
            return this.authService.parseHash$().pipe(
                map((authResult: any) => {
                    console.log('authRes', authResult);
                    if (authResult && authResult.accessToken) {
                        this.authService.setAuth(authResult);
                        window.location.hash = '';
                        return new fromAuth.LoginSuccess(authResult);
                    }
                }, tap(() => this.router.navigate(['/home']))),
                catchError(error => of(new fromAuth.LoginFailure(error)))
            );
        })
    );

    @Effect({dispatch: false})
    loginRedirect$ = this.actions$.pipe(
        ofType<fromAuth.LoginSuccess>(fromAuth.AuthActionTypes.LoginSuccess),
        tap(() =>  this.router.navigate(['/home']) )
    );

    @Effect({ dispatch: false })
    loginErrorRedirect$ = this.actions$.pipe(
        ofType<fromAuth.LoginFailure>(fromAuth.AuthActionTypes.LoginFailure),
        map(action => {
            return action.payload;
        }),
        tap((err: any) => {
            if (err.error_description) {
                console.error(`Error: ${err.error_description}`);
            } else {
                console.log('ERROR: ', err);
            }
            this.router.navigate(['/']);
        })
    );

    @Effect()
    checkLogin$ = this.actions$.pipe(
        ofType<fromAuth.CheckLogin>(fromAuth.AuthActionTypes.CheckLogin),
        exhaustMap(() => {
            if (this.authService.authenticated) {
                return this.authService.checkSession$({}).pipe(
                    map((authResult: any) => {
                        console.log(authResult);
                        if (authResult && authResult.accessToken) {
                            this.authService.setAuth(authResult);
                            return new fromAuth.LoginSuccess(authResult);
                        }
                    }),
                    catchError(error => {
                        this.authService.resetAuthFlag();
                        return of(new fromAuth.LoginFailure(error));
                    })
                );
            } else {
                return empty();
            }
        })
    );


    @Effect()
    logoutConfirmation$ = this.actions$.pipe(ofType<fromAuth.Logout>(fromAuth.AuthActionTypes.Logout),
        map(() => new fromAuth.LogoutConfirmed() )
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType<fromAuth.LogoutConfirmed>(fromAuth.AuthActionTypes.LogoutConfirmed),
        tap(() => this.authService.logout())
    );



    ngOnInit() {

    }

}
