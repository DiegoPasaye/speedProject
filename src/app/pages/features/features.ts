
import { Component } from '@angular/core';
import { NavBar } from '../../inicio/components/nav-bar/nav-bar';
import { Footer } from '../../inicio/components/footer/footer';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-features',
  imports: [CommonModule, Footer, NavBar],
  standalone: true,
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class FeaturesPage {
    updates = [
    {
      version: 'v1.1.0',
      date: '01 DEC 2025',
      title: 'New Major Update Released!',
      type: 'MAJOR UPDATE',
      changes: [
        '2 Nuevos mapas!.',
        '2 Vehiculos nuevos añadidos.',
        'Mejoras en la física de colisiones y efectos del vehiculo.'
      ]
    },
    {
      version: 'v1.0.1',
      date: '12 NOV 2025',
      title: 'Bug Fixes & Improvements',
      type: 'FIX UPDATE',
      changes: [
        'Solución del bug en el choque del vehiculo.',
        'Solución de la pausa inesperada en la música.'
      ]
    },
    {
      version: 'v1.0.0',
      date: '05 NOV 2025',
      title: 'Launch Event',
      type: 'LAUNCH',
      changes: [
        'Todos los cambios planteados.',
        'Vehiculos extras añadidos.'
      ]
    }
  ];
}
