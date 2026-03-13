export interface ILogin {
  username: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}
