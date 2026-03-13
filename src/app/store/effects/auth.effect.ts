import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import * as AuthActions from '../actions/auth.action';
import { AuthService } from '../../core/services/auth.service';
import { IError, IErrorResponse } from '../../core/models/response.model';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  // LOGIN
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ login }) =>
        this.authService.login(login).pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            const { accessToken, refreshToken, expiresAt } = res.data;

            return AuthActions.loginSuccess({
              auth: { accessToken, refreshToken, expiresAt },
            });
          }),
          catchError((err: IErrorResponse<IError>) =>
            of(
              AuthActions.loginFailure({
                error: this.normalizeError(err),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loginSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );

  // RESTORE AUTH
  restoreAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreAuth),
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            const { accessToken, refreshToken, expiresAt } = res.data;

            return AuthActions.restoreAuthSuccess({
              auth: { accessToken, refreshToken, expiresAt },
            });
          }),
          catchError(() => of(AuthActions.restoreAuthFailure())),
        ),
      ),
    ),
  );

  // LOGOUT
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess())),
        ),
      ),
    ),
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );

  // error normalize
  private normalizeError(err: IErrorResponse<IError>): IError {
    if (err.status === 0) {
      return {
        Code: 'NETWORK_ERROR',
        Status: 0,
        Message: 'Cannot connect to server',
      };
    }

    return {
      Code: err.error.Code,
      Status: err.error.Status,
      Message: err.error.Message,
    };
  }
}
