import { Route } from '@angular/router';
import { DATA_ROUTE } from '../../core/const/route.const';
import { DataComponent } from './data.component';

export const DataRoute: Route[] = [
  {
    path: DATA_ROUTE,
    component: DataComponent,
  },
];
