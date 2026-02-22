import { Route } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';

export const WarehouseRoute: Route[] = [
  {
    path: 'warehouse',
    component: WarehouseComponent,
  },
  {
    path: 'warehouse/create-orders',
    loadComponent: () =>
      import('./create-orders/create-orders.component').then(
        (m) => m.CreateOrdersComponent,
      ),
  },
  {
    path: 'warehouse/:categorySlug',
    loadComponent: () =>
      import('./products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: 'warehouse/:categorySlug/:productId',
    loadComponent: () =>
      import('./products/item/item.component').then((m) => m.ItemComponent),
  },
];
