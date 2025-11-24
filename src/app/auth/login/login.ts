import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../services/auth.service';
import {
  heroEnvelope,
  heroLockClosed,
  heroUser,
  heroEye,
  heroEyeSlash,
} from '@ng-icons/heroicons/outline';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [NgIconComponent, CommonModule, FormsModule, HttpClientModule, RouterModule],
  providers: [provideIcons({ heroEnvelope, heroLockClosed, heroUser, heroEye, heroEyeSlash })],
})
export class Login {

  formData = {
    username: '',
    password: ''
  };

  isLoading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.formData.username || !this.formData.password) {
      this.toast.info('Por favor completa todos los campos.');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toast.success(res.message || 'Inicio de sesión exitoso 🎉');
        console.log('Usuario:', res.user);

        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err.error?.error || 'Usuario o contraseña incorrectos ❌';
        this.toast.error(errorMsg);
      }
    });
  }
}
