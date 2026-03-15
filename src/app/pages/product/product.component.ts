import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NzIconModule,
    TranslateModule,
    CardProductComponent,
    NzButtonModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.less',
})
export class ProductComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
