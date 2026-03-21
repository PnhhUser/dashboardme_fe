import { createReducer, on } from '@ngrx/store';
import { ICategoryState } from './category.state';
import * as CategoryActions from '../category/category.actions';

export const categoryState: ICategoryState = {
  entities: [],
  loading: false,
  error: null,
};

export const categoryReducer = createReducer(
  categoryState,

  // GET CATEGORIES
  on(CategoryActions.getCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CategoryActions.getCategoriesSuccess, (state, { categories }) => ({
    ...state,
    entities: categories,
    loading: false,
  })),

  on(CategoryActions.getCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ADD
  on(CategoryActions.addCategory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CategoryActions.addCategorySuccess, (state, { category }) => ({
    ...state,
    entities: [...state.entities, category],
    loading: false,
  })),

  on(CategoryActions.addCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // UPDATE
  on(CategoryActions.updateCategory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CategoryActions.updateCategorySuccess, (state, { category }) => ({
    ...state,
    entities: state.entities.map((c) => (c.id === category.id ? category : c)),
    loading: false,
  })),

  on(CategoryActions.updateCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // REMOVE
  on(CategoryActions.removeCategory, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CategoryActions.removeCategorySuccess, (state, { id }) => ({
    ...state,
    entities: state.entities.filter((c) => c.id !== id),
    loading: false,
  })),

  on(CategoryActions.removeCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
