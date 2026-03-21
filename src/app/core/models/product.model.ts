import { IBaseModel } from './base.model';
import { ICategory } from './category.model';

export interface IProduct extends IBaseModel {
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  code: string;
  categoryId: number;
  categoryModel: ICategory;
  images: IImageProduct[];
}

export interface IImageProduct extends IBaseModel {
  productId: number;
  imageUrl: string;
  displayOrder: number;
  isPrimary: boolean;
}

export interface IAddProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  code: string;
  categoryId: number;
}

export interface IUpdateProduct {
  id: number;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  code: string;
  categoryId: number;
}

export interface ISetThumbnail {
  productId: number;
  displayOrder: number;
}
