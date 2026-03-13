import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-card-category',
  standalone: true,
  imports: [NzCardModule, NzIconModule, NzButtonModule],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.less',
})
export class CardCategoryComponent {}
