import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HeaderComponent } from '../../layout/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.less',
})
export class ProductItemComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  images = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
  ];

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onUpdate() {
    console.log('update product');
  }

  onRemove() {
    console.log('remove product');
  }
}
