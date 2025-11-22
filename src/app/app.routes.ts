import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inicio/inicio-module').then(m => m.InicioModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'features',
    loadChildren: () => import('./features/features-module').then(m => m.FeaturesModule)
  },
];
