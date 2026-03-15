import { ILoginSuccess } from '../../core/models/auth.model';
import { IBaseState } from '../../core/models/base.model';

export interface IAuthState extends IBaseState {
  auth: ILoginSuccess | null;
  initialized: boolean;
}
