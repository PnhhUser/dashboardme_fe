import { Route } from '@angular/router';
import { LOGIN_ROUTE } from '../../core/const/route.const';
import { LoginComponent } from './login.component';

export const LoginRoute: Route = {
  path: LOGIN_ROUTE,
  component: LoginComponent,
};
