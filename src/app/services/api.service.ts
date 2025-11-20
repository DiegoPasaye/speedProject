import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ScoreEntry {
  username: string;
  high_score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'speed-backend-rouge.vercel.app/api'; 

  constructor(private http: HttpClient) { }

  getLeaderboard(): Observable<ScoreEntry[]> {
    return this.http.get<ScoreEntry[]>(`${this.apiUrl}/leaderboard`);
  }
}