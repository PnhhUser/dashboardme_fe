import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from '../../layout/header/header.component';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { MenuDrawerComponent } from '../../shared/components/menu/menu.component';
import {
  Card,
  CardComponent,
} from '../../shared/components/card/card.component';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    NzIconModule,
    HeaderComponent,
    NzDrawerModule,
    CardComponent,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NzModalModule,
  ],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.less',
})
export class WarehouseComponent {
  readonly title = 'Warehouse';

  cards: Card[] = [
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
    private modal: NzModalService,
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

  addCategory(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Add new category',
      nzContent: AddCategoryModalComponent,
      nzClosable: false,
      nzFooter: null, // tự custom nút
    });

    const instance = modalRef.getContentComponent();

    modalRef.updateConfig({
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => modalRef.destroy(),
        },
        {
          label: 'Add',
          type: 'primary',
          onClick: () => instance.submit(),
        },
      ],
    });

    modalRef.afterClose.subscribe((name: string) => {
      if (!name) return;

      const isExist = this.cards.some(
        (c) => c.name.toLowerCase() === name.toLowerCase(),
      );

      if (isExist) {
        this.modal.error({
          nzTitle: 'Category already exists',
        });
        return;
      }

      this.cards = [
        ...this.cards,
        {
          id: Date.now(),
          name,
          total: 0,
        },
      ];
    });
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule],
  template: `
    <div>
      <input
        nz-input
        placeholder="Enter category name"
        [(ngModel)]="categoryName"
      />
    </div>
  `,
})
class AddCategoryModalComponent {
  categoryName = '';

  constructor(private modalRef: NzModalRef<string>) {}

  submit(): void {
    const value = this.categoryName.trim();
    if (!value) return;

    this.modalRef.close(value);
  }

  cancel(): void {
    this.modalRef.destroy();
  }
}
