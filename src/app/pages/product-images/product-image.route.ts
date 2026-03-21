import { Route } from '@angular/router';
import { ProductImagesComponent } from './product-images.component';

export const ProductImageRoute: Route[] = [
  {
    path: 'data/product/:id/picture',
    component: ProductImagesComponent,
  },
];
