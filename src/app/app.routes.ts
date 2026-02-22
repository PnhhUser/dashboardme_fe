import { Routes } from '@angular/router';
import { DashboardRoute } from './pages/dashboard/dashboard.route';
import { AppLayout } from './layout/app.layout';
import { DASHBOARD_ROUTE } from './core/const/route.const';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './core/guards/login-auth.guard';
import { authGuard } from './core/guards/auth.guard';
import { WarehouseRoute } from './pages/warehouse/warehouse.route';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: '',
    redirectTo: DASHBOARD_ROUTE,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [DashboardRoute, ...WarehouseRoute],
  },
  {
    path: '**',
    redirectTo: DASHBOARD_ROUTE,
  },
];
