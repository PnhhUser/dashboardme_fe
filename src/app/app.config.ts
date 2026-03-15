import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';

import { AuthEffects } from './store/auth/auth.effect';
import { categoryReducer } from './store/category/category.reducer';
import { authReducer } from './store/auth/auth.reducer';
import { CategoryEffect } from './store/category/category.effects';
import { authInterceptor } from './core/interceptor/auth.interceptor';

registerLocaleData(en);
registerLocaleData(vi);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideNzI18n(en_US),

    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        useDefaultLang: true,
      }),
    ),

    provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json',
    }),

    provideStore({
      auth: authReducer,
      category: categoryReducer,
    }),

    provideEffects([AuthEffects, CategoryEffect]),
  ],
};
