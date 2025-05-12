import { Routes } from '@angular/router';
import { RoutePath } from './models';

export const routes: Routes = [
    { path: RoutePath.HomePage.split('/')[1], loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent) },
    { path: RoutePath.CalendarPage.split('/')[1], loadComponent: () => import('./pages/calendar-page/calendar-page.component').then(m => m.CalendarPageComponent) },


    { path: '**', redirectTo: RoutePath.HomePage }
];
