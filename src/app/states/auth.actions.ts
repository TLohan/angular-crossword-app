import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    SetAccessToken = '[Auth] Set Access Token',

    Login = '[Auth] Login',
    LoginComplete = '[Auth] Login Complete',
    LoginSuccess = '[Auth] Login Success',
    LoginFailure = '[Auth] Login Failure',

    CheckLogin = '[Auth] Check Login',

    Logout = '[Auth] Logout',
    LogoutConfirmed = '[Auth] Logout Success',
    LogoutFailure = '[Auth] Logout Failure'
}

export class SetAccessToken implements Action {

    readonly type = AuthActionTypes.SetAccessToken;

    constructor(public payload: string) { }
}

export class Login implements Action {

    readonly type = AuthActionTypes.Login;
}

export class LoginComplete implements Action {

    readonly type = AuthActionTypes.LoginComplete;
}

export class LoginSuccess implements Action {

    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: any) {}
}

export class LoginFailure implements Action {

    readonly type = AuthActionTypes.LoginFailure;

    constructor(public payload: string) { }
}

export class CheckLogin implements Action {

    readonly type = AuthActionTypes.CheckLogin;
}

export class Logout implements Action {

    readonly type = AuthActionTypes.Logout;
}
export class LogoutConfirmed implements Action {

    readonly type = AuthActionTypes.LogoutConfirmed;
}
export class LogoutFailure implements Action {

    readonly type = AuthActionTypes.LogoutFailure;
}


export type AuthActions =
    SetAccessToken
    | Login
    | LoginComplete
    | LoginSuccess
    | LoginFailure
    | CheckLogin
    | Logout
    | LogoutConfirmed
    | LoginFailure;


