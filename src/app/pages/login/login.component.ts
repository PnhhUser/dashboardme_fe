import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

// NG-ZORRO Modules
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../store/actions/auth.action';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsLoggedIn,
} from '../../store/selectors/auth.selector';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    ReactiveFormsModule,
    TranslateModule,
    LoaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  store$ = inject(Store);
  loginForm!: FormGroup;
  isRemember: WritableSignal<boolean> = signal(
    localStorage.getItem('rememberMe') === 'true',
  );
  passwordVisible: boolean = false;
  authError$ = this.store$.select(selectAuthError);
  authLoading$ = this.store$.select(selectAuthLoading);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: this.fb.control(this.isRemember()),
    });
  }

  onRememberChange(checked: boolean): void {
    this.isRemember.set(checked);
    this.loginForm.get('remember')?.setValue(checked);
    localStorage.setItem('rememberMe', checked.toString());
  }

  onPasswordVisibilityChange(visible: boolean): void {
    this.passwordVisible = visible;
  }

  // handle submit
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.store$.dispatch(
        AuthActions.login({ login: { username, password } }),
      );
      // Add your login logic here
    }
  }
}
