import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface ScoreEntry {
  display_name: string; 
  total_score: string;
}
interface LeaderboardResponse {
  leaderboard: ScoreEntry[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://speed-backend-rouge.vercel.app/api'; 
  // private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  getLeaderboard(): Observable<ScoreEntry[]> {
    return this.http.get<any>(`${this.apiUrl}/leaderboard/global`)
      .pipe(
        map(response => {
          if (response && response.leaderboard) {
            return response.leaderboard;
          }
          return response;
        })
      );
  }
}