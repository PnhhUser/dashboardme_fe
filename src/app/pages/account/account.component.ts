import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardAccountComponent } from '../../shared/components/card-account/card-account.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NzIconModule,
    TranslateModule,
    CardAccountComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.less',
})
export class AccountComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
