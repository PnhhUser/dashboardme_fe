import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectAuthInitialized,
  selectIsLoggedIn,
} from '../../store/auth/auth.selector';
import { filter, map, switchMap, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectAuthInitialized).pipe(
    filter((initialized) => initialized),
    take(1),
    switchMap(() => store.select(selectIsLoggedIn).pipe(take(1))),
    map((isLogin) => {
      if (isLogin) return true;
      return router.createUrlTree(['/login']);
    }),
  );
};
