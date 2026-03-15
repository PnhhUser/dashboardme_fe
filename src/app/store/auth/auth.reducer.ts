import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.action';
import { IAuthState } from './auth.state';

export const authState: IAuthState = {
  auth: null,
  loading: false,
  error: null,
  initialized: false,
};

export const authReducer = createReducer(
  authState,

  // LOGIN
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { auth }) => ({
    ...state,
    auth,
    loading: false,
    error: null,
    initialized: true,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    initialized: true,
  })),

  // RESTORE AUTH
  on(AuthActions.restoreAuth, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.restoreAuthSuccess, (state, { auth }) => ({
    ...state,
    auth,
    loading: false,
    error: null,
    initialized: true,
  })),

  on(AuthActions.restoreAuthFailure, (state) => ({
    ...state,
    auth: null,
    loading: false,
    initialized: true,
  })),

  // LOGOUT
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    auth: null,
    loading: false,
    error: null,
    initialized: true,
  })),
);
