import { IError, IErrorResponse } from './../../core/models/response.model';
import { inject, Injectable } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryActions from '../category/category.actions';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import { normalizeError } from '../../core/helper/error.helper';

@Injectable({ providedIn: 'root' })
export class CategoryEffect {
  private actions$ = inject(Actions);
  private categoryService = inject(CategoryService);

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.getCategories),
      delay(500),
      switchMap(() => {
        return this.categoryService.getCategories().pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            return CategoryActions.getCategoriesSuccess({
              categories: res.data,
            });
          }),

          catchError((err: IErrorResponse<IError>) =>
            of(
              CategoryActions.getCategoriesFailure({
                error: normalizeError(err),
              }),
            ),
          ),
        );
      }),
    );
  });

  addCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.addCategory),
      delay(500),
      switchMap(({ category }) =>
        this.categoryService.addCategory(category).pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            return CategoryActions.addCategorySuccess({
              category: res.data,
            });
          }),
          catchError((err: IErrorResponse<IError>) =>
            of(
              CategoryActions.addCategoryFailure({
                error: normalizeError(err),
              }),
            ),
          ),
        ),
      ),
    );
  });

  updateCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      delay(500),
      switchMap(({ category }) =>
        this.categoryService.updateCategory(category).pipe(
          map((res) => {
            if (!res?.data) {
              throw new Error('Invalid response data');
            }

            return CategoryActions.updateCategorySuccess({
              category: res.data,
            });
          }),
          catchError((err: IErrorResponse<IError>) =>
            of(
              CategoryActions.updateCategoryFailure({
                error: normalizeError(err),
              }),
            ),
          ),
        ),
      ),
    );
  });

  removeCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.removeCategory),
      delay(500),
      switchMap(({ id }) =>
        this.categoryService.removeCategory(id).pipe(
          map(() => CategoryActions.removeCategorySuccess({ id })),
          catchError((err: IErrorResponse<IError>) =>
            of(
              CategoryActions.removeCategoryFailure({
                error: normalizeError(err),
              }),
            ),
          ),
        ),
      ),
    );
  });
}
