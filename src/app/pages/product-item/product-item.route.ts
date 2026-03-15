import { Route } from '@angular/router';
import { ProductItemComponent } from './product-item.component';

export const ProductItemRoute: Route[] = [
  {
    path: 'data/product/:id',
    component: ProductItemComponent,
  },
];
