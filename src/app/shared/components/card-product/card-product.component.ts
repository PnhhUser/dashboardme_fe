import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { IImageProduct, IProduct } from '../../../core/models/product.model';
import { environment } from '../../../../environments/environment.prod';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [
    NzCardModule,
    NzIconModule,
    NzButtonModule,
    NzTagModule,
    TranslateModule,
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.less',
})
export class CardProductComponent {
  @Input() card!: IProduct;

  private router = inject(Router);

  getThumbnail(images: IImageProduct[]): string {
    const thumbnail = images.find((img) => img.isPrimary);
    return thumbnail
      ? this.getImageUrl(thumbnail.imageUrl)
      : 'assets/images/not-image.png';
  }

  getImageUrl(path?: string | null) {
    if (!path) {
      return 'assets/images/not-image.png';
    }

    return environment.fileUrl + path;
  }

  onDetailProduct(id: number) {
    this.router.navigateByUrl('/data/product/' + id);
  }
}
