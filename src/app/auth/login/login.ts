import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../services/auth.service';
import { heroEnvelope, heroLockClosed } from '@ng-icons/heroicons/outline';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [NgIconComponent, CommonModule, FormsModule, HttpClientModule],
  providers: [provideIcons({ heroEnvelope, heroLockClosed })],
})
export class Login {

  formData = {
    username: '',
    password: ''
  };

  isLoading = false;

  constructor(
    private authService: AuthService,
    private toast: ToastService
  ) {}

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
        // Aquí podrías guardar datos del usuario o redirigir
      },
      error: (err) => {
        this.isLoading = false;
        const errorMsg = err.error?.error || 'Usuario o contraseña incorrectos ❌';
        this.toast.error(errorMsg);
      }
    });
  }
}
