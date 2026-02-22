import { Injectable } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private nzI18n: NzI18nService,
    private translate: TranslateService,
  ) {
    const saved = localStorage.getItem('lang') || 'en';
    this.setLanguage(saved);
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);

    // 1️⃣ NG-ZORRO
    this.nzI18n.setLocale(lang === 'vi' ? vi_VN : en_US);

    // 2️⃣ ngx-translate
    this.translate.use(lang);

    // 3️⃣ HTML lang attribute (SEO + accessibility)
    document.documentElement.lang = lang;
  }
}
