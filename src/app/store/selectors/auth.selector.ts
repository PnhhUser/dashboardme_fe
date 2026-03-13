import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

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
