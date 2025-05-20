import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CalendarService } from './calendar.service';

export const authGuard: CanActivateFn = (route, state) => {
  const calendarService = inject(CalendarService);
  const router = inject(Router);
  
  if (calendarService.checkIfUserIsLoggedIn()) {
    return true;
  }
  
  // Redirect to the login page
  return router.createUrlTree(['/login']);
};
