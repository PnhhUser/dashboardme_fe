import { IError } from './response.model';

export interface IBaseState {
  loading: boolean;
  error: IError | null;
}

export interface IBaseModel {
  id: number;
  createdAt: string;
  updatedAt: string;
}
