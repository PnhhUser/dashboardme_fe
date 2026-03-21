import { Route } from '@angular/router';
import { UpdateProductComponent } from './update-product.component';

export const UpdateProductRoute: Route[] = [
  {
    path: 'data/product/:id/update',
    component: UpdateProductComponent,
  },
];
