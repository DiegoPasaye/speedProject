import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './inicio/components/header/header';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('speedProyect');
}
