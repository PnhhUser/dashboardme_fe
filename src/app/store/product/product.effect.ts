import { IError, IErrorResponse } from './../../core/models/response.model';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, of, switchMap, tap } from 'rxjs';
import { normalizeError } from '../../core/helper/error.helper';
import { ProductService } from '../../core/services/product.service';
import * as ProductActions from '../product/product.action';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductEffect {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private router = inject(Router);

  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      delay(500),
      switchMap(() => {
        return this.productService.getProducts().pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            return ProductActions.loadProductSuccess({
              products: res.data,
            });
          }),

          catchError((err: IErrorResponse<IError>) =>
            of(
              ProductActions.loadProductFailure({
                error: normalizeError(err),
              }),
            ),
          ),
        );
      }),
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      delay(500),
      switchMap(({ model }) => {
        return this.productService.add(model).pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            return ProductActions.addProdctSuccess({
              product: res.data,
            });
          }),
          catchError((err: IErrorResponse<IError>) => {
            console.log(err);

            return of(
              ProductActions.addProdctFailure({
                error: normalizeError(err),
              }),
            );
          }),
        );
      }),
    );
  });

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProduct),
      delay(500),
      switchMap(({ productId }) => {
        return this.productService.getById(productId).pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            return ProductActions.getProductSuccess({
              product: res.data,
            });
          }),
          catchError((err: IErrorResponse<IError>) =>
            of(
              ProductActions.getProductFailure({
                error: normalizeError(err),
              }),
            ),
          ),
        );
      }),
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      delay(500),
      switchMap(({ model }) => {
        return this.productService.update(model).pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            return ProductActions.updateProductSuccess({
              product: res.data,
            });
          }),
          catchError((err: IErrorResponse<IError>) =>
            of(
              ProductActions.updateProductFailure({
                error: normalizeError(err),
              }),
            ),
          ),
        );
      }),
    );
  });

  updateProductSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.updateProductSuccess),
        tap(({ product }) => {
          this.router.navigate(['/data/product', product.id]);
        }),
      );
    },
    { dispatch: false },
  );

  removeProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.removeProduct),
      delay(500),
      switchMap(({ productId }) => {
        return this.productService.remove(productId).pipe(
          map(() => {
            return ProductActions.removeProductSuccess({
              productId,
            });
          }),
          catchError((err: IErrorResponse<IError>) =>
            of(
              ProductActions.removeProductFailure({
                error: normalizeError(err),
              }),
            ),
          ),
        );
      }),
    );
  });

  deleteProductSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.removeProductSuccess),
        tap(() => {
          this.router.navigate(['/data/product']);
        }),
      );
    },
    { dispatch: false },
  );
}
