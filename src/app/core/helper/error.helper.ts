import { IError, IErrorResponse } from '../models/response.model';

// error normalize
export function normalizeError(err: IErrorResponse<IError>): IError {
  if (err.status === 0) {
    return {
      code: 'NETWORK_ERROR',
      status: 0,
      message: 'Cannot connect to server',
    };
  }

  return {
    code: err.error.code,
    status: err.error.status,
    message: err.error.message,
  };
}
