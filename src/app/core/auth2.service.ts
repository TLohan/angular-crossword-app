import { Injectable, Output, EventEmitter } from '@angular/core';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class Auth2Service {

    private _userProfile: any;

    set userProfile(value: any) {
        this._userProfile = value;
    }

    get userProfile() {
        return this._userProfile;
    }

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
        redirectUri:  `${this.baseAppUrl}/callback`,
        scope: this.requestedScopes,
        responseType: 'token id_token',
    });


    constructor(public router: Router) {
        this._idToken = '';
        this._accessToken = '';
        this._expiresAt = 0;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    get idToken(): string {
        return this._idToken;
    }

    get expiresAt(): number {
        return this._expiresAt;
    }

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
        this._accessToken = authResult.accessToken;
        console.log(this.accessToken);
        const scopes = authResult.scope || '';
        this._idToken = authResult.idToken;
        this._expiresAt = expiresAt;
        this.getProfile((err, profile) => {
            this.userProfile = profile;
        });
        console.log(scopes);
        this._scopes = JSON.stringify(scopes);
        localStorage.setItem('scopes', this._scopes);
    }

    public userHasScopes(scopes: string[]): boolean {
        const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
        return scopes.every(scope => grantedScopes.includes(scope));
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
        this.router.navigate(['/home']);
    }

    isAuthenticated(): boolean {
        // Check whether the current time is less than the access token's expiry time.
        return new Date().getTime() < this._expiresAt;
    }

    public getProfile(cb) {
        if (!this.accessToken) {
            throw new Error('Access token must exist to fetch profile.');
        }

        const self = this;
        this.auth0.client.userInfo(this._accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }

            cb(err, profile);
        });
    }

}
