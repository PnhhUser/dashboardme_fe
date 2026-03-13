import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectAuthInitialized,
  selectIsLoggedIn,
} from '../../store/selectors/auth.selector';
import { combineLatest } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  return combineLatest([
    store.select(selectAuthInitialized),
    store.select(selectIsLoggedIn),
  ]).pipe(
    filter(([initialized]) => initialized), // đợi restoreAuth xong
    take(1),
    map(([_, isLogin]) => {
      if (!isLogin) return true;
      return router.createUrlTree(['/dashboard']);
    }),
  );
};
