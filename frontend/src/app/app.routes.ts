import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'countries',
    loadComponent: () => import('./features/countries/countries').then((m) => m.Countries),
  },
  {
    path: 'routes',
    loadComponent: () => import('./features/routes/routes').then((m) => m.Routes),
  },
  {
    path: 'activities',
    loadComponent: () => import('./features/activities/activities').then((m) => m.Activities),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
