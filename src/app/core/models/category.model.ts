import { IBaseModel } from './base.model';

export interface ICategory extends IBaseModel {
  name: string;
  description: string;
}

export interface IAddCategory {
  name: string;
  description: string;
}

export interface IUpdateCategory {
  id: number;
  name: string;
  description: string;
}
