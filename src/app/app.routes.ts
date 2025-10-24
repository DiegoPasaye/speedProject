import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./inicio/inicio-module').then(m => m.InicioModule)
    }
];
