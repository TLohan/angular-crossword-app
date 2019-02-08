import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserManagerSettings, UserManager } from 'oidc-client';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthService {

    private _user: User;
    private _userManager: UserManager;
    config: UserManagerSettings;

    baseAppUrl = environment.baseAppUrl;

    constructor(private httpClient: HttpClient, private _router: Router) {
        this.config = {
            authority: 'https://tlohan.eu.auth0.com',
            client_id: 'JLigKfV71nyicgxpAdkoAmac0xi3YDHl',
            redirect_uri:  `${this.baseAppUrl}/assets/oidc-login-redirect.html`,
            // 'https://crossword-app-c79dd.firebaseapp.com/assets/oidc-login-redirect.html',
            scope: 'openid projects-api profile',
            response_type: 'id_token token',
            post_logout_redirect_uri: `${this.baseAppUrl}/?postLogout=true`,
            // 'https://crossword-app-c79dd.firebaseapp.com/?postLogout=true'
        };


        this._userManager = new UserManager(this.config);
        this._userManager.getUser().then((user: User) => {
            if (user && !user.expired) {
                this._user = user;
            }
        });
    }

    get user(): User {
        const userStr = window.localStorage.getItem(`oidc.user:${this.config.authority}:${this.config.client_id}`);
        return <User>JSON.parse(userStr);
    }

    login(): Promise<any> {
        return this._userManager.signinRedirect();
    }

    logout(): Promise<any> {
        window.localStorage.removeItem(`oidc.user:${this.config.authority}:${this.config.client_id}`);
        this._router.navigate(['/']);
        return this._userManager.signoutRedirect();
    }

    isLoggedIn(): boolean {
       if (this.user && this.user.access_token && !this.user.expired) {
           return true;
       }
       return false;
    }

    getAccessToken(): string {
        return this._user ? this._user.access_token : '';
    }

    signoutRedirectCallback(): Promise<any> {
        return this._userManager.signoutRedirectCallback();
    }
}
