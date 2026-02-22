import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoginedIn = true;

  if (!isLoginedIn) {
    return true;
  }

  return router.createUrlTree(['/']);
};
