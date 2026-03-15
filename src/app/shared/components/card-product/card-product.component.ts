import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [NzCardModule, NzIconModule, NzButtonModule, NzTagModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.less',
})
export class CardProductComponent {
  imgUrl = 'https://picsum.photos/100';

  private router = inject(Router);

  onDetailProduct() {
    this.router.navigateByUrl('/data/product/1');
  }
}
