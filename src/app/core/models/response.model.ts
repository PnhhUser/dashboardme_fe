export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: IError;
}

export interface IErrorResponse<T> {
  error: T;
  status: number;
}

export interface IError {
  code: string;
  status: number;
  message: string;
}
