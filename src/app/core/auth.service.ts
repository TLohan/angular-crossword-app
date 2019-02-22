import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserManagerSettings, UserManager, OidcClientSettings } from 'oidc-client';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface ConfigSetings extends OidcClientSettings {
    readonly popup_redirect_uri?: string;
    readonly popupWindowFeatures?: string;
    readonly popupWindowTarget?: any;
    readonly silent_redirect_uri?: any;
    readonly silentRequestTimeout?: any;
    readonly automaticSilentRenew?: boolean;
    readonly includeIdTokenInSilentRenew?: boolean;
    readonly monitorSession?: boolean;
    readonly checkSessionInterval?: number;
    readonly query_status_response_type?: string;
    readonly stopCheckSessionOnError?: boolean;
    readonly revokeAccessTokenOnSignout?: any;
    readonly accessTokenExpiringNotificationTime?: number;
    readonly redirectNavigator?: any;
    readonly popupNavigator?: any;
    readonly iframeNavigator?: any;
    readonly userStore?: any;
    readonly audience?: string;
}

@Injectable()
export class AuthService {

    private _user: User;
    private _userManager: UserManager;
    config: ConfigSetings;

    baseAppUrl = environment.baseAppUrl;

    constructor(private httpClient: HttpClient, private _router: Router) {
        this.config = {
            authority: 'https://tlohan.eu.auth0.com',
            audience: 'localhost:60844',
            client_id: 'JLigKfV71nyicgxpAdkoAmac0xi3YDHl',
            redirect_uri:  `${this.baseAppUrl}/assets/oidc-login-redirect.html`,
            scope: 'openid profile get:boards',
            response_type: 'id_token token',
            post_logout_redirect_uri: `${this.baseAppUrl}/?postLogout=true`,
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
