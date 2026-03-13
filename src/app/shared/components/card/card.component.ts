import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export interface Card {
  name: string;
  url?: string;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NzCardModule,
    CommonModule,
    NzBadgeModule,
    NzIconModule,
    TranslateModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.less',
})
export class CardComponent {
  @Input() card!: Card;

  constructor(private router: Router) {}

  onNavigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
