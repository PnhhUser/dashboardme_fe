import { Route } from '@angular/router';
import { DATA_ROUTE } from '../../core/const/route.const';
import { DataComponent } from './data.component';
import { CategoryRoute } from '../category/category.route';
import { ProductRoute } from '../product/product.route';
import { AccountRoute } from '../account/account.route';

export const DataRoute: Route[] = [
  {
    path: DATA_ROUTE,
    component: DataComponent,
  },
  ...CategoryRoute,
  ...ProductRoute,
  ...AccountRoute,
];
