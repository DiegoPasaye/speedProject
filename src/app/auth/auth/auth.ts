import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class Auth {
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
}
