export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: IError;
}

export interface IErrorResponse<T> {
  error: T;
  status: number;
}

export interface IError {
  Code: string;
  Status: number;
  Message: string;
}
