import { Routes } from '@angular/router';
import { Area } from './area/area';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Area },
  { path: '**', redirectTo: '/home' }
];
