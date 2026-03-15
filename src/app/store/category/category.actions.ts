import { createAction, props } from '@ngrx/store';
import {
  IAddCategory,
  ICategory,
  IUpdateCategory,
} from '../../core/models/category.model';
import { IError } from '../../core/models/response.model';

export const getCategories = createAction('[Category] Get Categories');

export const getCategoriesSuccess = createAction(
  '[Category] Get Categories Success',
  props<{ categories: ICategory[] }>(),
);

export const getCategoriesFailure = createAction(
  '[Category] Get Categories Failure',
  props<{ error: IError }>(),
);

// ADD CATEGORY
export const addCategory = createAction(
  '[Category] Add Category',
  props<{ category: IAddCategory }>(),
);

export const addCategorySuccess = createAction(
  '[Category] Add Category Success',
  props<{ category: ICategory }>(),
);

export const addCategoryFailure = createAction(
  '[Category] Add Category Failure',
  props<{ error: IError }>(),
);

// UPDATE CATEGORY
export const updateCategory = createAction(
  '[Category] Update Category',
  props<{ category: IUpdateCategory }>(),
);

export const updateCategorySuccess = createAction(
  '[Category] Update Category Success',
  props<{ category: ICategory }>(),
);

export const updateCategoryFailure = createAction(
  '[Category] Update Category Failure',
  props<{ error: IError }>(),
);

// REMOVE CATEGORY
export const removeCategory = createAction(
  '[Category] Remove Category',
  props<{ id: number }>(),
);

export const removeCategorySuccess = createAction(
  '[Category] Remove Category Success',
  props<{ id: number }>(),
);

export const removeCategoryFailure = createAction(
  '[Category] Remove Category Failure',
  props<{ error: IError }>(),
);
