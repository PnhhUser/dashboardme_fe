import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layout/header/header.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzDrawerModule,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ActivatedRoute, Router } from '@angular/router';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';

interface InfoSupplier {
  name: string;
  phone: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-create-orders',
  standalone: true,
  imports: [
    HeaderComponent,
    NzIconModule,
    NzDrawerModule,
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzInputNumberModule,
    FormsModule,
  ],
  templateUrl: './create-orders.component.html',
  styleUrl: './create-orders.component.less',
})
export class CreateOrdersComponent {
  title = 'Create Purchase Order';

  selectedSupplier?: InfoSupplier;
  selectedProducts: Product[] = [];

  shippingFee: number = 0;
  otherFee: number = 0;

  constructor(
    private drawerService: NzDrawerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onReset(): void {
    this.selectedSupplier = undefined;
    this.selectedProducts = [];
    this.shippingFee = 0;
    this.otherFee = 0;
  }

  onCreate(): void {
    const payload = {
      supplier: this.selectedSupplier,
      products: this.selectedProducts,
      shippingFee: this.shippingFee,
      otherFee: this.otherFee,
    };

    console.log(payload);
  }

  get totalAmount(): number {
    const productTotal = this.selectedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );

    return productTotal + (this.shippingFee || 0) + (this.otherFee || 0);
  }

  removeProduct(id: number): void {
    this.selectedProducts = this.selectedProducts.filter((p) => p.id !== id);
  }

  openDrawerSupplier(): void {
    const drawerRef = this.drawerService.create<
      SupplierComponent,
      null,
      InfoSupplier
    >({
      nzTitle: 'Choose supplier',
      nzContent: SupplierComponent,
      nzWidth: 380,
    });

    drawerRef.afterClose.subscribe((result) => {
      if (result) {
        this.selectedSupplier = result;
      }
    });
  }

  openDrawerProduct(): void {
    const drawerRef = this.drawerService.create<
      ProductComponent,
      { selectedIds: number[] },
      Product
    >({
      nzTitle: 'Choose product',
      nzContent: ProductComponent,
      nzWidth: 380,
      nzContentParams: {
        selectedIds: this.selectedProducts.map((p) => p.id),
      },
    });

    drawerRef.afterClose.subscribe((product) => {
      if (!product) return;

      this.selectedProducts.push({
        ...product,
        quantity: 1,
      });
    });
  }
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    NzCardModule,
    NzButtonModule,
  ],
  template: `
    <div style="margin-bottom:16px">
      <a nz-button nzType="link" style="padding:0">
        <span nz-icon nzType="plus"></span>
        Create new supplier
      </a>
    </div>

    <nz-input-group [nzSuffix]="searchIcon">
      <input nz-input placeholder="Search supplier" />
    </nz-input-group>

    <ng-template #searchIcon>
      <span nz-icon nzType="search"></span>
    </ng-template>

    <div style="margin-top:16px">
      @for (supplier of suppliers; track supplier.name) {
        <nz-card
          nzHoverable
          style="margin-bottom:10px;cursor:pointer"
          (click)="selectSupplier(supplier)"
        >
          <div style="display:flex;justify-content:space-between;">
            <div>
              <div style="font-weight:600">
                {{ supplier.name }}
              </div>
              <div style="color:#888;font-size:13px">
                {{ supplier.phone }}
              </div>
            </div>
            <span nz-icon nzType="right"></span>
          </div>
        </nz-card>
      }
    </div>
  `,
})
class SupplierComponent {
  suppliers: InfoSupplier[] = [
    { name: 'ABC', phone: '0905789654' },
    { name: 'XYZ', phone: '0511785214' },
  ];

  constructor(private drawerRef: NzDrawerRef<InfoSupplier>) {}

  selectSupplier(supplier: InfoSupplier): void {
    this.drawerRef.close(supplier);
  }
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
  ],
  template: `
    <div style="margin-bottom:16px">
      <a nz-button nzType="link" style="padding:0">
        <span nz-icon nzType="plus"></span>
        Create new product
      </a>
    </div>

    <nz-input-group [nzSuffix]="searchIcon">
      <input nz-input placeholder="Search product" />
    </nz-input-group>

    <ng-template #searchIcon>
      <span nz-icon nzType="search"></span>
    </ng-template>

    <div style="margin-top:16px">
      @for (product of filteredProducts; track product.id) {
        <nz-card
          nzHoverable
          style="margin-bottom:10px;cursor:pointer"
          (click)="selectProduct(product)"
        >
          <div style="display:flex;justify-content:space-between;">
            <div>
              <div style="font-weight:600">
                {{ product.name }}
              </div>
              <div style="color:#888;font-size:13px">
                {{ product.price | number }} đ
              </div>
            </div>
            <span nz-icon nzType="right"></span>
          </div>
        </nz-card>
      }

      @if (filteredProducts.length === 0) {
        <div style="text-align:center;color:#999;margin-top:20px">
          All products already selected
        </div>
      }
    </div>
  `,
})
class ProductComponent {
  selectedIds: number[] = [];

  products: Product[] = [
    { id: 1, name: 'Laptop', price: 15000000, quantity: 0 },
    { id: 2, name: 'Mouse', price: 200000, quantity: 0 },
    { id: 3, name: 'Keyboard', price: 500000, quantity: 0 },
    { id: 4, name: 'Glass', price: 500000, quantity: 0 },
    { id: 5, name: 'Book250', price: 500000, quantity: 0 },
  ];

  constructor(private drawerRef: NzDrawerRef<Product>) {}

  get filteredProducts(): Product[] {
    return this.products.filter((p) => !this.selectedIds.includes(p.id));
  }

  selectProduct(product: Product): void {
    this.drawerRef.close(product);
  }
}
