import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICategoryState } from './category.state';

export const selectCategoryState =
  createFeatureSelector<ICategoryState>('category');

export const selectCategory = createSelector(
  selectCategoryState,
  (state) => state.entities,
);

export const selectCategoryLoading = createSelector(
  selectCategoryState,
  (state) => state.loading,
);

export const selectCategoryError = createSelector(
  selectCategoryState,
  (state) => state.error,
);
