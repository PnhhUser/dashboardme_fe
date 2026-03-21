import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/response.model';
import { IImageProduct, ISetThumbnail } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductImageService {
  private api = `${environment.apiUrl}/Products`;

  constructor(private http: HttpClient) {}

  uploadImage(productId: number, files: FormData): Observable<void> {
    return this.http.post<void>(`${this.api}/${productId}/images`, files);
  }

  getThumbnail(productId: number): Observable<IApiResponse<IImageProduct>> {
    return this.http.get<IApiResponse<IImageProduct>>(
      `${this.api}/${productId}/images/thumbnail`,
    );
  }

  getImages(productId: number): Observable<IApiResponse<IImageProduct[]>> {
    return this.http.get<IApiResponse<IImageProduct[]>>(
      `${this.api}/${productId}/images`,
    );
  }

  setThumbnail(model: ISetThumbnail): Observable<void> {
    return this.http.put<void>(
      `${this.api}/${model.productId}/images/thumbnail`,
      model,
    );
  }

  removeImage(productId: number, displayOrder: number): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/${productId}/images/${displayOrder}`,
    );
  }
}
