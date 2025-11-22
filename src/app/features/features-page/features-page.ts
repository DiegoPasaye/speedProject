import { Component } from '@angular/core';
import { NavBar } from '../../inicio/components/nav-bar/nav-bar';
import { Footer } from '../../inicio/components/footer/footer';
@Component({
  selector: 'app-features-page',
  imports: [Footer, NavBar],
  standalone: true,
  templateUrl: './features-page.html',
  styleUrl: './features-page.css',
})
export class FeaturesPage {
    updates = [
    {
      version: 'v2.1.0',
      date: '05 NOV 2025',
      title: 'Season of Storms',
      type: 'MAJOR UPDATE',
      changes: [
        'Nuevo mapa: "Thunder Peak" con clima dinámico.',
        'Vehículo añadido: "Storm Chaser" 4x4.',
        'Mejoras en la física de colisiones aéreas.'
      ]
    },
    {
      version: 'v2.0.5',
      date: '20 OCT 2025',
      title: 'Halloween Event',
      type: 'EVENT',
      changes: [
        'Evento de tiempo limitado: "Spooky Hills".',
        'Skins temáticas para todos los vehículos.'
      ]
    },
    {
      version: 'v2.0.0',
      date: '01 OCT 2025',
      title: 'The Big Engine Overhaul',
      type: 'PATCH',
      changes: [
        'Rebalanceo total del sistema de mejoras de motor.',
        'Nueva interfaz de usuario para el garaje.'
      ]
    }
  ];
}
