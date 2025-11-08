import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth.models';
import { heroEnvelope, heroLockClosed, heroUser } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [NgIconComponent, CommonModule, FormsModule, HttpClientModule],
  providers: [provideIcons({ heroEnvelope, heroLockClosed, heroUser })],
})

export class Register {

  formData: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    display_name: ''
  };

  confirmPassword = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    if (!this.formData.username || !this.formData.email || !this.formData.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    if (this.formData.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.formData.display_name = this.formData.username;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.formData).subscribe({
      next: (res) => {
        alert(res.message);
        this.isLoading = false;
        this.formData = { username: '', email: '', password: '', display_name: '' };
        this.confirmPassword = '';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Ocurrió un error durante el registro.';
      }
    });
  }
}
