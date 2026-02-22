import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from '../../layout/header/header.component';
import {
  NzDrawerModule,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';
import { MenuDrawerComponent } from '../../shared/components/menu/menu.component';
import {
  Card,
  CardComponent,
} from '../../shared/components/card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  imports: [NzIconModule, HeaderComponent, NzDrawerModule, CardComponent],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.less',
})
export class WarehouseComponent {
  readonly title = 'Warehouse';

  readonly cards: Card[] = [
    {
      id: 1,
      name: 'Electronics',
      total: 150,
    },
    {
      id: 2,
      name: 'Furniture',
      total: 80,
    },
    {
      id: 3,
      name: 'Clothing',
      total: 200,
    },
  ];

  constructor(
    private drawerService: NzDrawerService,
    private router: Router,
  ) {}

  onMenuClick(): void {
    this.drawerService.create({
      nzTitle: 'Menu',
      nzContent: MenuDrawerComponent,
      nzPlacement: 'right',
      nzWidth: 300,
    });
  }

  onCardClick(card: Card): void {
    this.router.navigate(['/warehouse', card.name.toLowerCase()]);
  }

  onToCreateOrders(): void {
    this.router.navigate(['/warehouse/create-orders']);
  }
}
