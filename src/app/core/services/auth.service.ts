import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { ILoginSuccess, ILogin } from '../models/auth.model';
import { IApiResponse } from '../models/response.model';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../store/auth/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:5127/api/authentication';

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  login(data: ILogin): Observable<IApiResponse<ILoginSuccess>> {
    return this.http.post<IApiResponse<ILoginSuccess>>(
      `${this.api}/login`,
      data,
      {
        withCredentials: true,
      },
    );
  }

  logout(): Observable<void> {
    return this.store.select(selectAccessToken).pipe(
      take(1),
      switchMap((token) =>
        this.http.post<void>(
          `${this.api}/logout`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      ),
    );
  }

  refreshToken(): Observable<IApiResponse<ILoginSuccess>> {
    return this.http.post<IApiResponse<ILoginSuccess>>(
      `${this.api}/refresh-token`,
      {},
      {
        withCredentials: true,
      },
    );
  }
}
