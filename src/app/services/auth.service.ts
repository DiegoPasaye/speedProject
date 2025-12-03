import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environments.prod';
import { RegisterRequest, RegisterResponse, LoginResponse, UserSession, } from '../models/auth.models';
import { UpdateProfileResponse } from '../models/profile.models';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = environment.apiUrl;
  private userKey = 'speed_user_session';

  constructor(private http: HttpClient) {}

  // --- REGISTRO ---
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data);
  }

  // --- LOGIN ---
  login(data: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => {
        if (response && response.user) {
          this.saveUserToStorage(response.user);
        }
      })
    );
  }

  private saveUserToStorage(user: UserSession): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  updateProfile(userId: string, data: { username: string; display_name: string; email: string }): Observable<UpdateProfileResponse> {
    return this.http.put<UpdateProfileResponse>(`${this.apiUrl}/profile/${userId}`, data);
  }

  get currentUser(): UserSession | null {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as UserSession;
    } catch (e) {
      console.error('Error al leer usuario del storage', e);
      return null;
    }
  }

  get currentUserId(): string | null {
    return this.currentUser?.user_id || null;
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
  }
}
