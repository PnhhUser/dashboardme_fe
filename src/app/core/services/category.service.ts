import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import {
  IAddCategory,
  ICategory,
  IUpdateCategory,
} from '../models/category.model';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../store/auth/auth.selector';
import { IApiResponse } from '../models/response.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private api = 'http://localhost:5127/api/Category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<IApiResponse<ICategory[]>> {
    return this.http.get<IApiResponse<ICategory[]>>(`${this.api}/list`);
  }

  addCategory(category: IAddCategory) {
    return this.http.post<IApiResponse<ICategory>>(
      `${this.api}/create`,
      category,
    );
  }

  updateCategory(
    category: IUpdateCategory,
  ): Observable<IApiResponse<ICategory>> {
    return this.http.put<IApiResponse<ICategory>>(`${this.api}/edit`, category);
  }

  removeCategory(id: number): Observable<IApiResponse<ICategory>> {
    return this.http.delete<IApiResponse<ICategory>>(
      `${this.api}/remove/${id}`,
    );
  }
}
