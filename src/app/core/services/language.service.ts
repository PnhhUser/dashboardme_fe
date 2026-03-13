import { Injectable } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { TranslateService } from '@ngx-translate/core';

export type AppLanguage = 'en' | 'vi';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANG_KEY = 'lang';

  constructor(
    private nzI18n: NzI18nService,
    private translate: TranslateService,
  ) {
    const saved = (localStorage.getItem(this.LANG_KEY) as AppLanguage) || 'en';
    this.setLanguage(saved);
  }

  setLanguage(lang: AppLanguage) {
    localStorage.setItem(this.LANG_KEY, lang);

    // NG-ZORRO
    this.nzI18n.setLocale(lang === 'vi' ? vi_VN : en_US);

    // ngx-translate
    this.translate.use(lang);

    // HTML lang
    document.documentElement.lang = lang;
  }

  getLanguage(): AppLanguage {
    return (localStorage.getItem(this.LANG_KEY) as AppLanguage) || 'en';
  }
}
