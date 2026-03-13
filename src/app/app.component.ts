import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/actions/auth.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {
  constructor(
    private languageService: LanguageService,
    private store: Store,
  ) {
    this.store.dispatch(AuthActions.restoreAuth());
    this.languageService.setLanguage(this.languageService.getLanguage());
  }
}
