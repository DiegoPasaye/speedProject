import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ScoreEntry } from '../../../services/api.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true, // Aseguramos que sea standalone
  imports: [CommonModule], // Importamos CommonModule
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard implements OnInit {
  // Inyectamos el servicio
  private apiService = inject(ApiService);
  
  // Variable para guardar el top 3
  topPlayers: ScoreEntry[] = [];

  ngOnInit(): void {
    this.obtenerLeaderboard();
  }

  obtenerLeaderboard() {
    this.apiService.getLeaderboard().subscribe({
      next: (data) => {
        this.topPlayers = data;
        console.log('Top 3 recibido:', this.topPlayers);
      },
      error: (err) => {
        console.error('Error al obtener el leaderboard:', err);
      }
    });
  }
}