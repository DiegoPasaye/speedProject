import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ScoreEntry } from '../../../services/api.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard implements OnInit {
  private apiService = inject(ApiService);
  
  topPlayers: ScoreEntry[] = [];

  ngOnInit(): void {
    this.obtenerLeaderboard();
  }

  obtenerLeaderboard() {
    this.apiService.getLeaderboard().subscribe({
      next: (data: any) => {
        if (data.leaderboard) {
            this.topPlayers = data.leaderboard;
        } else if (Array.isArray(data)) {
            this.topPlayers = data;
        } else {
            console.error('Formato de datos inesperado:', data);
            this.topPlayers = [];
        }
        
        console.log('Leaderboard listo para mostrar:', this.topPlayers);
      },
      error: (err) => {
        console.error('Error al obtener el leaderboard:', err);
      }
    });
  }
}