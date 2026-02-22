import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { MenuDrawerComponent } from '../../shared/components/menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, CommonModule, NzIconModule, NzDrawerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less',
})
export class DashboardComponent {
  readonly title = 'Dashboard';

  constructor(private drawerService: NzDrawerService) {}

  onMenuClick(): void {
    this.drawerService.create({
      nzTitle: 'Menu',
      nzContent: MenuDrawerComponent,
      nzPlacement: 'right',
      nzWidth: 300,
    });
  }
}
