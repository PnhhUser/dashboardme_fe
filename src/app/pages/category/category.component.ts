import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardMetaComponent } from 'ng-zorro-antd/card';
import { CardCategoryComponent } from '../../shared/components/card-category/card-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NzIconModule,
    TranslateModule,
    CardCategoryComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.less',
})
export class CategoryComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addCategory() {}
}
