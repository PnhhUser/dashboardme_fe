import { Route } from '@angular/router';
import { DASHBOARD_ROUTE } from '../../core/const/route.const';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoute: Route[] = [
  {
    path: DASHBOARD_ROUTE,
    component: DashboardComponent,
  },
];
