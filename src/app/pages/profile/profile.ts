import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroTrophy, heroTruck, heroCurrencyDollar, heroMap, heroClock,
  heroShieldCheck, heroBolt, heroChevronRight, heroShare,
  heroCog6Tooth, heroLockClosed, heroFlag, heroCloud, heroMoon, heroUser
} from '@ng-icons/heroicons/outline';
import { AuthService } from '../../services/auth.service';
import { CarItem, TrophyItem, RecordItem, ProfileResponse } from '../../models/profile.models';
import { environment } from '../../../environments/environments.prod';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgIconComponent, HttpClientModule],
  templateUrl: './profile.html',
  providers: [
    provideIcons({
      heroTrophy, heroTruck, heroCurrencyDollar, heroMap, heroClock,
      heroShieldCheck, heroBolt, heroChevronRight, heroShare,
      heroCog6Tooth, heroLockClosed, heroFlag, heroCloud, heroMoon, heroUser
    })
  ]
})
export class ProfileComponent implements OnInit {
  activeTab: 'garage' | 'trophies' | 'records' = 'garage';
  isLoading = true;

  profileData: ProfileResponse | null = null;

  carImages: Record<string, string> = {
    // --- MODELO 1: Street Tuner (Hatchback/JDM) ---
    'Street Tuner Rojo': 'cars/car1_red.webp',
    'Street Tuner Verde': 'cars/car1_green.webp',
    'Street Tuner Púrpura': 'cars/car1_purple.webp',
    'Street Tuner Amarillo': 'cars/car1_yellow.webp',

    // --- MODELO 2: Terra SUV (Jeep/Offroad) ---
    'Terra SUV Rojo': 'cars/car2_red.webp',
    'Terra SUV Verde': 'cars/car2_green.webp',
    'Terra SUV Púrpura': 'cars/car2_purple.webp',
    'Terra SUV Amarillo': 'cars/car2_yellow.webp',

    // --- MODELO 3: Phantom GT (Deportivo/Muscle) ---
    'Phantom GT Rojo': 'cars/car3_red.webp',
    'Phantom GT Verde': 'cars/car3_green.webp',
    'Phantom GT Púrpura': 'cars/car3_purple.webp',
    'Phantom GT Amarillo': 'cars/car3_yellow.webp',

    // --- MODELO 4: Solaris Supercar (Futurista/Hypercar) ---
    'Solaris Supercar Rojo': 'cars/car4_red.webp',
    'Solaris Supercar Verde': 'cars/car4_green.webp',
    'Solaris Supercar Púrpura': 'cars/car4_purple.webp',
    'Solaris Supercar Amarillo': 'cars/car4_yellow.webp',
  };


  trophyConfig: Record<string, { icon: string; color: string }> = {
    'Primeros Pasos': { icon: 'heroFlag', color: 'text-green-500' },
    'Velocista': { icon: 'heroBolt', color: 'text-yellow-500' },
    'Magnate': { icon: 'heroCurrencyDollar', color: 'text-yellow-400' },
    'Coleccionista': { icon: 'heroTruck', color: 'text-blue-500' },
    'Imparable': { icon: 'heroShieldCheck', color: 'text-purple-500' },
    'Explorador': { icon: 'heroMap', color: 'text-green-400' },
    'Mecánico': { icon: 'heroCog6Tooth', color: 'text-gray-400' },
    'Ahorrador': { icon: 'heroCurrencyDollar', color: 'text-green-300' }
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const userId = this.authService.currentUserId;

    if (!userId) {
      console.error("No hay usuario logueado");
      this.isLoading = false;
      return;
    }

    const apiUrl = `${environment.apiUrl}/profile/${userId}`;

    this.http.get<ProfileResponse>(apiUrl).subscribe({
      next: (data) => {
        this.profileData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
        this.isLoading = false;
      }
    });
  }

  setActiveTab(tab: 'garage' | 'trophies' | 'records'): void {
    this.activeTab = tab;
  }

  getCarImage(name: string): string {
    return this.carImages[name] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=400';
  }

  getCarClass(cost: number): string {
    if (cost === 0) return 'D-Class';
    if (cost < 3000) return 'C-Class';
    if (cost < 6000) return 'B-Class';
    if (cost < 9000) return 'A-Class';
    return 'S-Class';
  }

  getTrophyIcon(name: string): string {
    return this.trophyConfig[name]?.icon || 'heroTrophy';
  }

  getTrophyColor(name: string, achieved: boolean): string {
    if (!achieved) return 'text-gray-600';
    return this.trophyConfig[name]?.color || 'text-yellow-500';
  }

  getRank(score: number): string {
    if (score > 15000) return 'S';
    if (score > 10000) return 'A';
    if (score > 5000) return 'B';
    return 'C';
  }

  getRankColor(score: number): string {
    const rank = this.getRank(score);
    if (rank === 'S') return 'bg-yellow-500/20 text-yellow-500 border-yellow-500';
    if (rank === 'A') return 'bg-purple-500/20 text-purple-500 border-purple-500';
    return 'bg-blue-500/20 text-blue-500 border-blue-500';
  }
}
