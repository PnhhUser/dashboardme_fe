import { Route } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';
import { menuGuard } from '../../core/guards/menu.guard';

export const WarehouseRoute: Route[] = [
  {
    path: 'warehouse',
    component: WarehouseComponent,
    canActivate: [menuGuard],
  },
];
