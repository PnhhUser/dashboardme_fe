import { Component, signal, WritableSignal } from '@angular/core';
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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isRemember: WritableSignal<boolean> = signal(
    localStorage.getItem('rememberMe') === 'true',
  );
  passwordVisible: boolean = false;

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
      console.log('Login submitted:', { username, password });
      // Add your login logic here
    } else {
      console.log('Form is invalid');
    }
  }
}
