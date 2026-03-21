import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/response.model';
import { IAddProduct, IProduct, IUpdateProduct } from '../models/product.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = `${environment.apiUrl}/Products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IApiResponse<IProduct[]>> {
    return this.http.get<IApiResponse<IProduct[]>>(`${this.api}`);
  }

  getById(id: number): Observable<IApiResponse<IProduct>> {
    return this.http.get<IApiResponse<IProduct>>(`${this.api}/${id}`);
  }

  add(model: IAddProduct): Observable<IApiResponse<IProduct>> {
    return this.http.post<IApiResponse<IProduct>>(this.api, model);
  }

  update(model: IUpdateProduct): Observable<IApiResponse<IProduct>> {
    return this.http.put<IApiResponse<IProduct>>(
      `${this.api}/${model.id}`,
      model,
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
