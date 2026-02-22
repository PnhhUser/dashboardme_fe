import { products } from './../products.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../layout/header/header.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../products.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NzIconModule,
    NzBadgeModule,
    NzButtonModule,
    NzCarouselModule,
    NzImageModule,
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.less',
})
export class ItemComponent {
  title = 'Detail';
  products: Product[] = products;
  currentProduct?: Product;

  images = [
    'https://picsum.photos/1600/1000?random=1',
    'https://picsum.photos/1600/1000?random=2',
    'https://picsum.photos/1600/1000?random=3',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('productId'));

    if (!id) {
      this.title = 'Invalid product';
      return;
    }

    const product = this.products.find((p) => p.id === id);

    if (!product) {
      this.title = 'Product not found';
      return;
    }

    this.currentProduct = product;
    this.title = product.name;
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getStockBadgeStatus(status?: string) {
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

  formatStock(status?: string): string {
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

  formatProductStatus(status?: string): string {
    return status === 'active' ? 'Active' : 'Inactive';
  }
}
