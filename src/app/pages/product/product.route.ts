import { Route } from '@angular/router';
import { ProductComponent } from './product.component';

export const ProductRoute: Route[] = [
  {
    path: 'data/product',
    component: ProductComponent,
  },
];
