import { IBaseState } from '../../core/models/base.model';
import { ICategory } from '../../core/models/category.model';

export interface ICategoryState extends IBaseState {
  entities: ICategory[];
}
