import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../models';
import { Observable, of} from 'rxjs';
import { UserService } from './user.service';
import { throwError } from 'rxjs';



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

  getAllEventsOfUser() {
    const userData = this.userService.getCurrentUser();
    if (!userData) {
      return throwError(() => new Error('User is not logged in.'));
    }

    
    return this.http.get(`${API_URL}/timebox/filter?userId=${userData.id}`);
  }



  saveEvents(event: any): Observable<any> {
    const userId = this.userService.getCurrentUser()?.id

    const postData = {
      UserId: userId,
      ...event
    }

    console.log('POST payload saving evts', postData)

    return this.http.post(`${API_URL}/timebox`, postData);
  }


  updateEvent(event: any): Observable<any> {
    const userId = this.userService.getCurrentUser()?.id

    const postData = {
      UserId: userId,
      ...event
    }

    console.log('PUT payload saving evts', postData)

    return this.http.put(`${API_URL}/timebox`, postData);
  }

  

  deleteEvent(event: any): Observable<any> {
    return this.http.delete(`${API_URL}/timebox?id=${event.Id}`);
  }
}