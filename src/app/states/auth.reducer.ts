import * as fromRoot from './app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface State extends fromRoot.State {
    auth: AuthState;
}

export interface AuthState {
    accessToken: string;
    isLoggedIn: boolean;
    userProfile: any;
    scopes: any;
}

const initialState: AuthState = {
    accessToken: null,
    isLoggedIn: false,
    userProfile: null,
    scopes: null
};

const getAuthStateFeatureState = createFeatureSelector<AuthState>('auth');

export const getAccessToken = createSelector(
    getAuthStateFeatureState,
    state => state.accessToken
);

export const selectIsLoggedIn = createSelector(
    getAuthStateFeatureState,
    state => state.isLoggedIn
);

export const selectUserProfile = createSelector(
    getAuthStateFeatureState,
    state => state.userProfile
);

export const getScopes = createSelector(
    getAuthStateFeatureState,
    state => state.scopes
);

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.ProcessLogin:
            console.log('processing login');
            return {
                ...state,
                accessToken: action.payload['accessToken'],
                userProfile: action.payload['idTokenPayload'],
                scopes: action.payload['scope'],
                isLoggedIn: true
            };
        case AuthActionTypes.LogoutConfirmed:
            return {
                ...state,
                isLoggedIn: false
            };
        default:
            return {
                ...state
            };
    }
}



