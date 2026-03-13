import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-card-account',
  standalone: true,
  imports: [
    NzCardModule,
    NzIconModule,
    NzButtonModule,
    NzTagModule,
    NzBadgeModule,
    NzAvatarModule,
  ],
  templateUrl: './card-account.component.html',
  styleUrl: './card-account.component.less',
})
export class CardAccountComponent {}
