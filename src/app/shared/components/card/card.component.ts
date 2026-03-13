import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface Card {
  id: number;
  name: string;
  link?: string;
  icon: string;
  total: number;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NzCardModule, CommonModule, NzBadgeModule, NzIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.less',
})
export class CardComponent {
  @Input() card!: Card;

  title = 'Title đề của card';

  imageUrl = 'https://picsum.photos/200';
}
