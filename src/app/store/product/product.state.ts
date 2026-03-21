import { IBaseState } from '../../core/models/base.model';
import { IProduct } from '../../core/models/product.model';

export interface IProductState extends IBaseState {
  entities: IProduct[];
  selectProduct: IProduct | null;
}
