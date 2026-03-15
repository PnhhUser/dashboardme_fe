import { Route } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductItemRoute } from '../product-item/product-item.route';

export const ProductRoute: Route[] = [
  {
    path: 'data/product',
    component: ProductComponent,
  },
  ...ProductItemRoute,
];
