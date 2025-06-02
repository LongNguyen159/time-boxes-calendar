import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../models';
import { Observable, of} from 'rxjs';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})

/**
 * Manages calendar-related operations such as fetching events for a user.
 */
export class CalendarService {
  userService = inject(UserService);
  http = inject(HttpClient);


  constructor() { }

  getAllEventsOfUser(userId: string) {
    const userData = this.userService.getCurrentUser();
    if (!userData) return of(null);
    
    return this.http.get(`${API_URL}/events/user/${userId}`);
  }
}