import { Routes } from '@angular/router';
import { IaDemoComponent } from '../app/features/ia-demo/ia-demo';

export const routes: Routes = [
  { path: 'ia-demo', component: IaDemoComponent },
  // Otras rutas...
  { path: '', redirectTo: 'ia-demo', pathMatch: 'full' } // Ruta por defecto
];
