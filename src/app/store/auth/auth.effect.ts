import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import * as AuthActions from './auth.action';
import { AuthService } from '../../core/services/auth.service';
import { IError, IErrorResponse } from '../../core/models/response.model';
import { normalizeError } from '../../core/helper/error.helper';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);

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
                error: normalizeError(err),
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
          this.router.navigate(['/login']);
        }),
      ),
    { dispatch: false },
  );
}
