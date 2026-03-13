import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuDrawerComponent } from '../../shared/components/menu/menu.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LanguageService,
  AppLanguage,
} from '../../core/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    HeaderComponent,
    NzIconModule,
    NzDrawerModule,
    NzCardModule,
    NzSelectModule,
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less',
})
export class SettingsComponent {
  language: AppLanguage;

  constructor(
    private drawerService: NzDrawerService,
    private languageService: LanguageService,
    private translateService: TranslateService,
  ) {
    this.language = this.languageService.getLanguage();
  }

  onMenuDrawer(): void {
    this.drawerService.create({
      nzTitle: this.translateService.instant('menu.title'),
      nzContent: MenuDrawerComponent,
      nzPlacement: 'right',
      nzWidth: 300,
    });
  }

  changeLanguage(lang: AppLanguage) {
    this.language = lang;
    this.languageService.setLanguage(lang);
  }
}
