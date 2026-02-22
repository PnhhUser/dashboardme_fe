import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

export interface Card {
  id: number;
  name: string;
  total: number;
  link?: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NzCardModule, CommonModule, NzBadgeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.less',
})
export class CardComponent {
  @Input() card!: Card;
}
