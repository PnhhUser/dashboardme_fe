import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../../../layout/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';

export interface Product {
  id: number;
  name: string;
  price: number;
  stockStatus: 'inStock' | 'lowStock' | 'outStock';
  productStatus: 'active' | 'inactive';
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Product A',
    price: 100000000,
    stockStatus: 'inStock',
    productStatus: 'active',
  },
  {
    id: 2,
    name: 'Product B',
    price: 2000,
    stockStatus: 'lowStock',
    productStatus: 'inactive',
  },
  {
    id: 3,
    name: 'Product C',
    price: 3000,
    stockStatus: 'outStock',
    productStatus: 'active',
  },
  {
    id: 4,
    name: 'Product D',
    price: 10000,
    stockStatus: 'inStock',
    productStatus: 'active',
  },
  {
    id: 5,
    name: 'Product E',
    price: 500000,
    stockStatus: 'lowStock',
    productStatus: 'inactive',
  },
  {
    id: 6,
    name: 'Product F',
    price: 600000,
    stockStatus: 'outStock',
    productStatus: 'inactive',
  },
  {
    id: 7,
    name: 'Product G',
    price: 700000,
    stockStatus: 'lowStock',
    productStatus: 'inactive',
  },
  {
    id: 8,
    name: 'Product H',
    price: 800000,
    stockStatus: 'inStock',
    productStatus: 'active',
  },
];

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HeaderComponent,
    NzIconModule,
    NzDrawerModule,
    CommonModule,
    NzBadgeModule,
    NzCardModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.less',
})
export class ProductsComponent {
  title = '';
  productList = products;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private drawerService: NzDrawerService, // 👈 sửa tên biến
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('categorySlug');
    this.title = slug ? this.formatTitle(slug) : 'Products';
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onFilter(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Products Filter',
      nzContent: ProductsFilterComponent,
      nzPlacement: 'top',
      nzHeight: 600,
      nzClosable: false,
      nzBodyStyle: { overflow: 'hidden' },
    });

    drawerRef.afterOpen.subscribe(() => {
      const instance = drawerRef.getContentComponent();

      instance?.filterChange.subscribe((filter) => {
        console.log('Filter received:', filter);

        // 👉 xử lý filter tại đây
        // filter.keyword
        // filter.priceRange

        drawerRef.close();
      });
    });
  }

  getStockBadgeStatus(status: string) {
    switch (status) {
      case 'inStock':
        return 'success';
      case 'lowStock':
        return 'warning';
      case 'outStock':
        return 'error';
      default:
        return 'default';
    }
  }

  formatStock(status: string): string {
    switch (status) {
      case 'inStock':
        return 'In Stock';
      case 'lowStock':
        return 'Low Stock';
      case 'outStock':
        return 'Out of Stock';
      default:
        return '';
    }
  }

  formatProductStatus(status: string): string {
    return status === 'active' ? 'Active' : 'Inactive';
  }

  onCardClick(product: Product): void {
    this.router.navigate([this.router.url.concat('/'), product.id]);
  }

  private formatTitle(slug: string): string {
    return slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSliderModule,
    NzCheckboxModule,
  ],
  template: `
    <div class="filter-wrapper">
      <!-- SEARCH -->
      <nz-input-group nzSize="large" [nzSuffix]="suffixTpl">
        <input
          nz-input
          [(ngModel)]="keyword"
          placeholder="Search products..."
        />
      </nz-input-group>

      <ng-template #suffixTpl>
        <span nz-icon nzType="search"></span>
      </ng-template>

      <!-- PRICE RANGE -->
      <div class="price-section">
        <div class="price-label">
          Price: {{ priceRange[0] }} - {{ priceRange[1] }}
        </div>

        <nz-slider
          [(ngModel)]="priceRange"
          [nzRange]="true"
          [nzMin]="0"
          [nzMax]="1000"
        ></nz-slider>
      </div>

      <!-- STOCK STATUS -->
      <div class="filter-group">
        <div class="group-title">Stock Status</div>

        <label nz-checkbox [(ngModel)]="stockMap.inStock">In Stock</label>
        <label nz-checkbox [(ngModel)]="stockMap.lowStock">Low Stock</label>
        <label nz-checkbox [(ngModel)]="stockMap.outStock">Out of Stock</label>
      </div>

      <!-- PRODUCT STATUS -->
      <div class="filter-group">
        <div class="group-title">Product Status</div>

        <label nz-checkbox [(ngModel)]="productMap.active">Active</label>
        <label nz-checkbox [(ngModel)]="productMap.inactive">Inactive</label>
      </div>

      <!-- ACTION -->
      <div class="action-buttons">
        <button nz-button nzType="default" (click)="onReset()">Reset</button>

        <button nz-button nzType="primary" (click)="onApply()">Apply</button>
      </div>
    </div>
  `,
  styleUrl: './products.component.less',
})
export class ProductsFilterComponent {
  @Output() filterChange = new EventEmitter<{
    keyword: string;
    priceRange: [number, number];
    stockStatus: string[];
    productStatus: string[];
  }>();

  keyword = '';
  priceRange: [number, number] = [0, 1000];
  stockMap = {
    inStock: false,
    lowStock: false,
    outStock: false,
  };

  productMap = {
    active: false,
    inactive: false,
  };

  onApply(): void {
    const stockStatus = Object.entries(this.stockMap)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    const productStatus = Object.entries(this.productMap)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    this.filterChange.emit({
      keyword: this.keyword.trim(),
      priceRange: this.priceRange,
      stockStatus,
      productStatus,
    });
  }

  onReset(): void {
    this.keyword = '';
    this.priceRange = [0, 1000];

    this.stockMap = {
      inStock: false,
      lowStock: false,
      outStock: false,
    };

    this.productMap = {
      active: false,
      inactive: false,
    };

    this.onApply();
  }
}
