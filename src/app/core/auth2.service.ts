import { Injectable, Output, EventEmitter } from '@angular/core';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, bindNodeCallback } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../states/app.state';
import * as authActions from '../states/auth.actions';
import * as fromAuth from '../states/auth.reducer';

@Injectable()
export class Auth2Service {
    _authFlag = 'isLoggedIn';

    get userProfile() {
        return this._userProfile;
    }


    constructor(public router: Router, private http: HttpClient, private store: Store<fromRoot.State>) {
        this._idToken = '';
        this._accessToken = '';
        this._expiresAt = 0;

        this.store.pipe(select(fromAuth.selectUserProfile)).subscribe(profile => {
            this._userProfile = profile;
        });

        this.store.pipe(select(fromAuth.getAccessToken)).subscribe(accessToken => {
            this._accessToken = accessToken;
        });

        this.store.pipe(select(fromAuth.getScopes)).subscribe(scopes => {
            this._scopes = scopes;
        });
    }

    get accessToken(): string {
        return this._accessToken;
    }

    get idToken(): string {
        return this._idToken;
    }

    get authenticated() {
        const x = JSON.parse(localStorage.getItem(this._authFlag));
        return x;
    }

    get expiresAt(): number {
        return this._expiresAt;
    }

    userProfileSource = new Subject<any>();

    private _userProfile: any;

    private _accessToken: string;
    private _idToken: string;
    private _expiresAt: number;

    private _scopes: string;
    private requestedScopes = 'openid profile edit:board delete:board create:board';

    baseAppUrl = environment.baseAppUrl;

    auth0 = new auth0.WebAuth({
        domain: 'tlohan.eu.auth0.com',
        audience: 'localhost:60844',
        clientID: 'JLigKfV71nyicgxpAdkoAmac0xi3YDHl',
        redirectUri: `${this.baseAppUrl}/callback`,
        scope: this.requestedScopes,
        responseType: 'token id_token'
    });

    parseHash$ = bindNodeCallback(this.auth0.parseHash.bind(this.auth0));
    checkSession$ = bindNodeCallback(this.auth0.checkSession.bind(this.auth0));

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            console.log(authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.localLogin(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['']);
                console.log(err);
            }
        });
    }

    private localLogin(authResult): void {
        // set isLogggedIn flag in local storage
        localStorage.setItem('isLoggedIn', 'true');
        // set the time that the access token will expire at
        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        // this._accessToken = authResult.accessToken;
        this.store.dispatch(new authActions.SetAccessToken(this._accessToken));
        console.log(this.accessToken);
        const scopes = authResult.scope || '';
        this._idToken = authResult.idToken;
        this._expiresAt = expiresAt;
        // this.getProfile((err, profile) => {
        //     this.userProfile = profile;
        // });
        this._scopes = JSON.stringify(scopes);
        localStorage.setItem('scopes', this._scopes);
    }

    public setAuth(authResult: any) {
        this._expiresAt = authResult.expiresIn * 1000 + Date.now();
        localStorage.setItem(this._authFlag, JSON.stringify(true));
    }

    public resetAuthFlag() {
        window.localStorage.removeItem(this._authFlag);
    }

    public userHasScopes(scopes: string[]): boolean {
        if (this._scopes) {
            const grantedScopes = this._scopes.split(' ');
            return scopes.every(scope => grantedScopes.includes(scope));
        }
        return false;
    }

    public renewTokens(): void {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult);
            } else if (err) {
                alert(`Could not get a new token (${err.error}: ${err.errorDescription})`);
                this.logout();
            }
        });
    }

    public logout(): void {
        // remove tokens and expiry time
        this._accessToken = '';
        this._idToken = '';
        this._expiresAt = 0;
        // remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        // go back to home route
        this.auth0.logout({
            returnTo: `${this.baseAppUrl}/`,
            clientID: 'JLigKfV71nyicgxpAdkoAmac0xi3YDHl'
        });
        // this.http.get('https://tlohan.eu.auth0.com/v2/logout').subscribe();
        this.router.navigate(['/home']);
    }

    public getProfile(cb) {
        console.log('cb', cb);
        if (!this.accessToken) {
            throw new Error('Access token must exist to fetch profile.');
        }

        const self = this;
        this.auth0.client.userInfo(this._accessToken, (err, profile) => {
            if (profile) {
                this._userProfile = profile;
            }
            console.log('err', err);
            console.log('profile', profile);
            cb(err, profile);
        });
    }

}
