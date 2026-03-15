import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ICategory } from '../../../core/models/category.model';

export interface ICardCategory extends ICategory {}

@Component({
  selector: 'app-card-category',
  standalone: true,
  imports: [NzCardModule, NzIconModule, NzButtonModule],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.less',
})
export class CardCategoryComponent {
  @Input() card!: ICardCategory;
  @Output() detailCard = new EventEmitter<ICardCategory>();

  onClick(card: ICardCategory) {
    this.detailCard.emit(card);
  }
}
