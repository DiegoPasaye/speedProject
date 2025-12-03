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

  //Inicializacion con la obtencion del leaderboard
  ngOnInit(): void {
    this.obtenerLeaderboard();
  }

  //Funcion para obtener el leaderboard desde el servicio API
  obtenerLeaderboard() {
    this.apiService.getLeaderboard().subscribe({
      next: (data: any) => {
        if (data.leaderboard) {
            this.topPlayers = data.leaderboard;
        } else if (Array.isArray(data)) {
            this.topPlayers = data;
        }
        // console.log('Data recibida: ', this.topPlayers);
      },
      error: (err) => {
        console.error('Error al obtener el leaderboard:', err);
      }
    });
  }
}