import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IMenuDrawer, MENU_DRAWER } from '../../../core/config/menu.config';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/actions/auth.action';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-drawer',
  standalone: true,
  imports: [
    NzMenuModule,
    NzIconModule,
    RouterModule,
    NzButtonModule,
    TranslateModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuDrawerComponent {
  constructor(
    private drawerRef: NzDrawerRef,
    private router: Router,
    private store: Store,
  ) {}

  menuDrawer: IMenuDrawer[] = MENU_DRAWER;

  navigate(item: IMenuDrawer) {
    if (item.isDisable) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.router.navigate([item.url]);
    this.drawerRef.close();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.drawerRef.close();
  }
}
