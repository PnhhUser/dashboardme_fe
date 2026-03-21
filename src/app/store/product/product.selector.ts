import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductState } from './product.state';

export const selectProductState =
  createFeatureSelector<IProductState>('product');

export const selectProduct = createSelector(
  selectProductState,
  (state) => state.entities,
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state) => state.loading,
);

export const selectProductError = createSelector(
  selectProductState,
  (state) => state.error,
);

export const selectProductById = (id: number) =>
  createSelector(selectProduct, (products) =>
    products.find((p) => p.id === id),
  );

export const selectProductOne = createSelector(
  selectProductState,
  (state) => state.selectProduct,
);
