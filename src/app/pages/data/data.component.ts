import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuDrawerComponent } from '../../shared/components/menu/menu.component';
import {
  Card,
  CardComponent,
} from '../../shared/components/card/card.component';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NzIconModule,
    TranslateModule,
    NzDrawerModule,
    CardComponent,
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.less',
})
export class DataComponent {
  constructor(
    private drawerService: NzDrawerService,
    private translateService: TranslateService,
  ) {}

  cardList: Card[] = [
    {
      name: 'data.product.title',
      url: 'data/product',
      icon: 'product',
      description: 'data.product.description',
    },
    {
      name: 'data.category.title',
      url: 'data/category',
      icon: 'tags',
      description: 'data.category.description',
    },
    {
      name: 'data.account.title',
      url: 'data/account',
      icon: 'team',
      description: 'data.account.description',
    },
  ];

  onMenuDrawer(): void {
    this.drawerService.create({
      nzTitle: this.translateService.instant('menu.title'),
      nzContent: MenuDrawerComponent,
      nzPlacement: 'right',
      nzWidth: 300,
    });
  }
}
