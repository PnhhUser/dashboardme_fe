import { createReducer, on } from '@ngrx/store';
import { IProductState } from './product.state';
import * as ProductActions from '../product/product.action';

export const productState: IProductState = {
  entities: [],
  loading: false,
  error: null,
  selectProduct: null,
};

export const productReducer = createReducer(
  productState,

  // LOAD PRODUCTS
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.loadProductSuccess, (state, { products }) => ({
    ...state,
    entities: products,
    loading: false,
  })),

  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ADD PRODUCT
  on(ProductActions.addProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.addProdctSuccess, (state, { product }) => ({
    ...state,
    entities: [...state.entities, product],
    loading: false,
  })),

  on(ProductActions.addProdctFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // GET ONE
  on(ProductActions.getProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.getProductSuccess, (state, { product }) => ({
    ...state,
    selectProduct: product,
    loading: false,
  })),

  on(ProductActions.getProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // UPDATE
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    entities: state.entities.map((p) => (p.id === product.id ? product : p)),
    loading: false,
  })),

  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // REMOVE
  on(ProductActions.removeProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductActions.removeProductSuccess, (state, { productId }) => ({
    ...state,
    entities: state.entities.filter((c) => c.id !== productId),
    loading: false,
  })),

  on(ProductActions.removeProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
