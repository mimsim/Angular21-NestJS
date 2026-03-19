import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL_MODULES } from '../material.providers';
import { Auth } from '../shared/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  formBuilder = inject(FormBuilder);
  private authService = inject(Auth)
  private router = inject(Router)

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }
}
