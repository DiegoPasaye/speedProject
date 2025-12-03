import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-app.html',
  styleUrl: './mobile-app.css'
})
export class MobileAppPage {
  features = [
    {
      title: "RECLAMA RECOMPENSAS",
      description: "Conéctate diariamente y obtén monedas, piezas exclusivas y potenciadores directamente desde tu celular.",
      image: '/premios.webp'
    },
    {
      title: "GALERÍA DE VEHÍCULOS",
      description: "Explora nuestra colección completa de autos en 3D. Revisa sus estadísticas, mejoras y skins disponibles.",
      image: "/car_details.webp"
    },
    {
      title: "TU PROGRESO",
      description: "Sigue tu avance en tiempo real. Revisa tu nivel, experiencia acumulada y estadísticas de carrera donde sea.",
      image: "/progreso.webp"
    },
    {
      title: "LOGROS DESBLOQUEADOS",
      description: "Presume tus trofeos. Visualiza todos los logros que has completado y descubre cuáles te faltan por conquistar.",
      image: "/perfil.webp"
    }
  ];

  activeSlide = 0;

  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.features.length;
  }

  prevSlide() {
    this.activeSlide = (this.activeSlide - 1 + this.features.length) % this.features.length;
  }
}