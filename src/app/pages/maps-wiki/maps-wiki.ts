import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroMap, heroGlobeAmericas, heroUsers, heroCurrencyDollar, heroTag,
  heroTrophy, heroClock, heroChartBar, heroXMark, heroPlay, heroLockClosed
} from '@ng-icons/heroicons/outline';
import { environment } from '../../../environments/environment';
import { MapWikiItem } from '../../models/maps.models';

interface MapVisualConfig {
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  length: string;
  laps: number;
  weather: string;
  attributes: {
    curves: number;
    straights: number;
    technical: number;
  };
}

@Component({
  selector: 'app-maps-wiki',
  standalone: true,
  imports: [CommonModule, NgIconComponent, HttpClientModule],
  templateUrl: './maps-wiki.html',
  providers: [provideIcons({
    heroMap, heroGlobeAmericas, heroUsers, heroCurrencyDollar, heroTag,
    heroTrophy, heroClock, heroChartBar, heroXMark, heroPlay, heroLockClosed
  })]
})
export class MapsWikiComponent implements OnInit {
  maps: MapWikiItem[] = [];
  isLoading = true;

  selectedMap: MapWikiItem | null = null;

  mapVisuals: Record<string, MapVisualConfig> = {
    'Cañón Desértico': {
      image: 'https://images.unsplash.com/photo-1545134969-8a839f535329?q=80&w=800&auto=format&fit=crop',
      difficulty: 'Easy',
      length: '3.5 km',
      laps: 3,
      weather: 'Dry / Sandstorms',
      attributes: { curves: 45, straights: 80, technical: 30 }
    },
    'Montaña Nevada': {
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop',
      difficulty: 'Medium',
      length: '4.8 km',
      laps: 3,
      weather: 'Snow / Blizzard',
      attributes: { curves: 60, straights: 60, technical: 95 }
    },
    'Ciudad Neón': {
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop',
      difficulty: 'Hard',
      length: '5.2 km',
      laps: 2,
      weather: 'Rain / Clear Night',
      attributes: { curves: 70, straights: 50, technical: 85 }
    },
    'Superficie Lunar': {
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
      difficulty: 'Expert',
      length: '6.1 km',
      laps: 2,
      weather: 'Low Gravity / Vacuum',
      attributes: { curves: 85, straights: 40, technical: 100 }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMaps();
  }

  loadMaps() {
    this.http.get<MapWikiItem[]>(`${environment.apiUrl}/maps/public`)
      .subscribe({
        next: (data) => {
          this.maps = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading wiki', err);
          this.isLoading = false;
        }
      });
  }

  openMapDetails(map: MapWikiItem) {
    this.selectedMap = map;
    document.body.style.overflow = 'hidden';
  }

  closeMapDetails() {
    this.selectedMap = null;
    document.body.style.overflow = 'auto';
  }

  getVisuals(mapName: string): MapVisualConfig {
    return this.mapVisuals[mapName] || {
      image: 'https://via.placeholder.com/800x400',
      difficulty: 'Easy',
      length: 'Unknown',
      laps: 0,
      weather: 'Unknown',
      attributes: { curves: 0, straights: 0, technical: 0 }
    };
  }

  getDifficultyColor(diff: string): string {
    switch(diff) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  }
}
