import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth.models';
import {
  heroEnvelope,
  heroLockClosed,
  heroUser,
  heroEye,
  heroEyeSlash,
} from '@ng-icons/heroicons/outline';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [NgIconComponent, CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [provideIcons({ heroEnvelope, heroLockClosed, heroUser, heroEye, heroEyeSlash })],
})

export class Register {
  formData: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    display_name: '',
  };

  confirmPassword = '';
  isLoading = false;
  errorMessage = '';

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) { }

  togglePasswordVisibility(type: 'password' | 'confirm'): void {
    if (type === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    if (!this.formData.username || !this.formData.email || !this.formData.password || !this.confirmPassword) {
      this.toastService.info('Por favor completa todos los campos.');
      return;
    }

    if (this.formData.password !== this.confirmPassword) {
      this.toastService.error('Las contraseñas no coinciden.');
      return;
    }

    this.formData.display_name = this.formData.username;

    this.isLoading = true;

    this.authService.register(this.formData).subscribe({
      next: (res) => {
        this.toastService.success('¡Registro exitoso, ahora inicia sesión!');

        this.isLoading = false;

        this.formData = { username: '', email: '', password: '', display_name: '' };
        this.confirmPassword = '';

        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error(err.error?.error || 'Ocurrió un error durante el registro.');
      },
    });
  }
}
