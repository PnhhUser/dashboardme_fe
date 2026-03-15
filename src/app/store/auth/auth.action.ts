import { createAction, props } from '@ngrx/store';
import { ILoginSuccess, ILogin } from '../../core/models/auth.model';
import { IError } from '../../core/models/response.model';

// login
export const login = createAction(
  '[Login Page] Login',
  props<{ login: ILogin }>(),
);

export const loginSuccess = createAction(
  '[Login API] Login Success',
  props<{ auth: ILoginSuccess }>(),
);

export const loginFailure = createAction(
  '[Login API] Login Failure',
  props<{ error: IError }>(),
);

// logout
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth API] Logout Success');

export const logoutFail = createAction(
  '[Auth API] Logout Fail',
  props<{ error: IError }>(),
);

// restore auth
export const restoreAuth = createAction('[Auth] Restore Auth');

export const restoreAuthSuccess = createAction(
  '[Auth API] Restore Success',
  props<{ auth: ILoginSuccess }>(),
);

export const restoreAuthFailure = createAction('[Auth API] Restore Failure');
