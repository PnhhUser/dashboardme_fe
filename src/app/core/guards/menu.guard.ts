import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MENU_DRAWER } from '../config/menu.config';

export const menuGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const menu = MENU_DRAWER.find((x) => state.url.startsWith(x.url));

  if (menu?.isDisable) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
