import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark, heroCamera, heroCog6Tooth } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { UserProfile, UpdateProfileResponse } from '../../../models/profile.models';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  templateUrl: './edit-profile-modal.html',
  providers: [provideIcons({ heroXMark, heroCamera, heroCog6Tooth })]
})
export class EditProfileModalComponent implements OnInit {
  @Input() user!: UserProfile;
  @Output() close = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<void>();

  isLoading = false;
  errorMessage = '';

  formData = {
    username: '',
    display_name: '',
    email: ''
  };

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    if (this.user) {
      this.formData.username = this.user.username;
      this.formData.display_name = this.user.display_name;
    }
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    const userId = this.authService.currentUserId;
    if (!userId) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.updateProfile(userId, this.formData).subscribe({
      next: (res: UpdateProfileResponse) => {
        this.isLoading = false;

        this.toastService.success('Perfil actualizado correctamente');

        this.userUpdated.emit();
        this.onClose();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error(err);
        this.errorMessage = err.error?.error || 'Error al guardar los cambios.';

        this.toastService.error(this.errorMessage);
      }
    });
  }
}
