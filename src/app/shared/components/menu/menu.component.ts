import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-menu-drawer',
  standalone: true,
  imports: [NzMenuModule, NzIconModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuDrawerComponent {
  constructor(private drawerRef: NzDrawerRef) {}

  close(): void {
    this.drawerRef.close();
  }
}
