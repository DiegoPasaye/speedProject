import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUserCircle } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconComponent],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
  providers: [provideIcons({ heroUserCircle })]
})
export class NavBar {
  isMenuOpen = false;

  constructor(public authService: AuthService) {}

  get isLoggedIn(): boolean {
    return !!this.authService.currentUser;
  }

  get userName(): string {
    return this.authService.currentUser?.profile?.display_name || 'Usuario';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}