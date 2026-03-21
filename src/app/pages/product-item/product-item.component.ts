import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HeaderComponent } from '../../layout/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import * as ProductActions from '../../store/product/product.action';
import {
  selectProductLoading,
  selectProductOne,
} from '../../store/product/product.selector';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-product-item',
  imports: [
    CommonModule,
    NzCarouselModule,
    NzTagModule,
    NzDividerModule,
    HeaderComponent,
    NzIconModule,
    TranslateModule,
    NzButtonModule,
    LoaderComponent,
    NzModalModule,
    NzSkeletonModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.less',
})
export class ProductItemComponent implements OnInit {
  product$;
  loading$;

  productId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private modalService: NzModalService,
  ) {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.loading$ = this.store.select(selectProductLoading);
    this.product$ = this.store.select(selectProductOne);
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.store.dispatch(
      ProductActions.getProduct({ productId: this.productId }),
    );
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getImageUrl(path: string) {
    return environment.fileUrl + path;
  }

  onUpdate() {
    this.router.navigate(['update'], { relativeTo: this.route });
  }

  setImage() {
    this.router.navigate(['picture'], { relativeTo: this.route });
  }

  onRemove() {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this product?',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'Cancel',

      nzOnOk: () => {
        this.store.dispatch(
          ProductActions.removeProduct({ productId: this.productId }),
        );
      },
    });
  }
}
