import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../store/auth/auth.selector';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  let token: string | null | undefined = null;

  store
    .select(selectAccessToken)
    .subscribe((t) => (token = t))
    .unsubscribe();

  if (token) {
    const clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clone);
  }

  return next(req);
};
