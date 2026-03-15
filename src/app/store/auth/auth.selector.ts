import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<IAuthState>('auth');

export const selectAuth = createSelector(
  selectAuthState,
  (state) => state.auth,
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading,
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error,
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => !!state.auth?.accessToken,
);

export const selectAuthInitialized = createSelector(
  selectAuthState,
  (state) => state.initialized,
);

export const selectAccessToken = createSelector(
  selectAuth,
  (state) => state?.accessToken,
);
