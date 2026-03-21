import { createAction, props } from '@ngrx/store';
import {
  IAddProduct,
  IProduct,
  IUpdateProduct,
} from '../../core/models/product.model';
import { IError } from '../../core/models/response.model';

// LOAD
export const loadProducts = createAction('[Product] load Products');

export const loadProductSuccess = createAction(
  '[Product] load list Product Success',
  props<{ products: IProduct[] }>(),
);

export const loadProductFailure = createAction(
  '[Product] load list Product Failure',
  props<{ error: IError }>(),
);

// GET ONE
export const getProduct = createAction(
  '[Product] get product',
  props<{ productId: number }>(),
);

export const getProductSuccess = createAction(
  '[Product] get product success',
  props<{ product: IProduct }>(),
);

export const getProductFailure = createAction(
  '[Product] get product failure',
  props<{ error: IError }>(),
);

// ADD
export const addProduct = createAction(
  '[Product] Add Product',
  props<{ model: IAddProduct }>(),
);

export const addProdctSuccess = createAction(
  '[Product] Add Product Success',
  props<{ product: IProduct }>(),
);

export const addProdctFailure = createAction(
  '[Product] Add Product Failure',
  props<{ error: IError }>(),
);

// UPDATE
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ model: IUpdateProduct }>(),
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: IProduct }>(),
);

export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: IError }>(),
);

// REMOVE
export const removeProduct = createAction(
  '[Product] Remove product',
  props<{ productId: number }>(),
);

export const removeProductSuccess = createAction(
  '[Product] Remove Product Success',
  props<{ productId: number }>(),
);

export const removeProductFailure = createAction(
  '[Product] Remove Product Failure',
  props<{ error: IError }>(),
);
