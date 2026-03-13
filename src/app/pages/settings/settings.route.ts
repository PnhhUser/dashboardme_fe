import { Route } from '@angular/router';
import { SETTINGS_ROUTE } from '../../core/const/route.const';
import { SettingsComponent } from './settings.component';

export const SettingsRoute: Route[] = [
  {
    path: SETTINGS_ROUTE,
    component: SettingsComponent,
  },
];
