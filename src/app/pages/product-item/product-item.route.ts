import { Route } from '@angular/router';
import { ProductItemComponent } from './product-item.component';
import { UpdateProductRoute } from '../update-product/update-product.route';
import { ProductImageRoute } from '../product-images/product-image.route';

export const ProductItemRoute: Route[] = [
  {
    path: 'data/product/:id',
    component: ProductItemComponent,
  },
  ...UpdateProductRoute,
  ...ProductImageRoute,
];
