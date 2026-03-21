import { ISetThumbnail } from './../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { HeaderComponent } from '../../layout/header/header.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzDrawerModule,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { ProductImageService } from '../../core/services/product-image.service';
import { IImageProduct } from '../../core/models/product.model';
import { map, Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  selectProductLoading,
  selectProductOne,
} from '../../store/product/product.selector';
import * as ProductActions from '../../store/product/product.action';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-images',
  imports: [
    CommonModule,
    NzImageModule,
    NzButtonModule,
    HeaderComponent,
    TranslateModule,
    NzIconModule,
    NzDrawerModule,
    NzModalModule,
    LoaderComponent,
  ],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.less',
})
export class ProductImagesComponent implements OnInit {
  productId: number = 0;

  images$: Observable<IImageProduct[]>;

  selectedThumbnail: IImageProduct | null = null;
  initialThumbnail: IImageProduct | null = null;

  loading$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private drawerService: NzDrawerService,
    private ProductImageService: ProductImageService,
    private store: Store,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.loading$ = this.store.select(selectProductLoading);

    this.images$ = this.store
      .select(selectProductOne)
      .pipe(map((x) => (x ? x.images : [])));
  }

  ngOnInit(): void {
    this.store.dispatch(
      ProductActions.getProduct({ productId: this.productId }),
    );

    this.images$.subscribe((images) => {
      if (!images || images.length === 0) return;

      // giả sử thumbnail là displayOrder = 0
      const thumb = images.find((x) => x.isPrimary) || null;

      this.selectedThumbnail = thumb;
      this.initialThumbnail = thumb;
    });
  }

  onChange() {
    if (!this.selectedThumbnail) return;

    const img: ISetThumbnail = {
      productId: this.selectedThumbnail.productId,
      displayOrder: this.selectedThumbnail.displayOrder,
    };

    this.ProductImageService.setThumbnail(img).subscribe({
      next: () => {
        console.log('Set thumbnail thành công');

        this.store.dispatch(
          ProductActions.getProduct({ productId: this.productId }),
        );
      },
      error: (err) => {
        console.error('Lỗi set thumbnail', err);
      },
    });
  }

  get isChanged(): boolean {
    return this.selectedThumbnail?.id !== this.initialThumbnail?.id;
  }

  getImageUrl(path: string) {
    return environment.fileUrl + path;
  }

  selectThumbnail(image: IImageProduct) {
    this.selectedThumbnail = image;
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onUploadImage() {
    this.images$.pipe(take(1)).subscribe((images) => {
      if (images.length >= 6) {
        this.message.warning(`Bạn chỉ có thể thêm ${images.length} ảnh`);
        return;
      }

      this.drawerService.create({
        nzTitle: 'Upload image',
        nzWidth: 300,
        nzPlacement: 'right',
        nzContent: UploadImage,
        nzData: { productId: this.productId, currentCount: images.length },
      });
    });
  }

  onRemoveImage(image: IImageProduct) {
    if (image.isPrimary) {
      this.modalService.warning({
        nzTitle: 'Không thể xoá',
        nzContent:
          'Đây là ảnh đang làm thumbnail. Vui lòng chọn ảnh khác trước.',
      });
      return;
    }

    this.modalService.confirm({
      nzTitle: 'Xác nhận xoá ảnh',
      nzContent: 'Bạn có chắc muốn xoá ảnh này không?',
      nzOkText: 'Xoá',
      nzOkDanger: true,
      nzCancelText: 'Huỷ',

      nzOnOk: () => {
        return this.ProductImageService.removeImage(
          image.productId,
          image.displayOrder,
        ).subscribe({
          next: () => {
            this.store.dispatch(
              ProductActions.getProduct({ productId: image.productId }),
            );
          },
        });
      },
    });
  }
}

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule, NzUploadModule, NzIconModule, NzButtonModule],
  template: `
    <div class="container">
      <nz-upload
        [(nzFileList)]="fileList"
        [nzBeforeUpload]="beforeUpload"
        nzListType="picture-card"
        [nzShowButton]="fileList.length < maxUpload"
        [nzMultiple]="true"
      >
        <div>
          <nz-icon nzType="plus" />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </nz-upload>

      <div class="action">
        <button
          nz-button
          nzType="primary"
          (click)="onUploadImage()"
          [disabled]="fileList.length === 0"
        >
          Upload image
        </button>
      </div>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .action {
      margin-top: auto;
    }

    .action button {
      width: 100%;
    }
  `,
})
class UploadImage {
  @Input() productId: number = 0;
  @Input() currentCount: number = 0;

  fileList: NzUploadFile[] = [];

  constructor(
    private productImageService: ProductImageService,
    private message: NzMessageService,
    private drawerRef: NzDrawerRef, // 👈 thêm
    private store: Store, // 👈 thêm
  ) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    if (this.fileList.length >= this.maxUpload) {
      this.message.warning(`Bạn chỉ có thể thêm ${this.maxUpload} ảnh`);
      return false;
    }

    const rawFile = file as unknown as File;

    const newFile: NzUploadFile = {
      uid: file.uid,
      name: file.name,
      status: 'done',
      originFileObj: rawFile,
      thumbUrl: URL.createObjectURL(rawFile),
    };

    this.fileList = [...this.fileList, newFile];
    return false;
  };

  get maxUpload(): number {
    return 6 - this.currentCount;
  }

  onUploadImage() {
    const formData = new FormData();

    this.fileList.forEach((file) => {
      formData.append('files', file.originFileObj as File);
    });

    this.productImageService.uploadImage(this.productId, formData).subscribe({
      next: () => {
        console.log('Upload thành công');

        // ✅ reload lại data
        this.store.dispatch(
          ProductActions.getProduct({ productId: this.productId }),
        );

        // ✅ đóng drawer
        this.drawerRef.close();

        // reset UI (optional)
        this.fileList = [];
      },
      error: (err) => {
        console.error('Upload lỗi', err);
      },
    });
  }
}
