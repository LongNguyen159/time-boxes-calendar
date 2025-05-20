import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserData, UserRole } from './models';
import { Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

interface ApiResponse<T> {
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  http = inject(HttpClient)
  router = inject(Router)
  private readonly apiUrl = 'http://localhost:8000/api'
  private readonly USER_STORAGE_KEY = 'calendarUserData'

  constructor() { }

  getAllEventsOfUser(userId: string) {
    const userData = this.getCurrentUser();
    if (!userData) return of(null);
    
    return this.http.get(`${this.apiUrl}/events/user/${userId}`);
  }

  checkIfUserIsLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  login(username: string, password: string): Observable<ApiResponse<UserData>> {
    return this.http.post<ApiResponse<UserData>>(`${this.apiUrl}/user/login`, { username, password })
      .pipe(
        tap(response => {
          // Store user data in session storage
          sessionStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(response.data));
        })
      );
  }

  registerUser(user: UserData): Observable<ApiResponse<UserData>> {
    return this.http.post<ApiResponse<UserData>>(`${this.apiUrl}/user`, user);
  }

  updateUserDetailsOrSettings(userData: Partial<UserData>): Observable<ApiResponse<UserData> | null> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return of(null);
    
    return this.http.put<ApiResponse<UserData>>(
      `${this.apiUrl}/user/${currentUser.username}`, 
      userData
    ).pipe(
      tap(response => {
        // Update the stored user data
        const updatedUser = {...currentUser, ...response.data};
        sessionStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(updatedUser));
      })
    );
  }

  getCurrentUser(): UserData | null {
    const userData = sessionStorage.getItem(this.USER_STORAGE_KEY);
    if (!userData) return null;
    
    try {
      const user = JSON.parse(userData) as UserData;
      // Validate that the data has the expected structure
      if (!user.username) {
        this.logout(); // Clear invalid data
        return null;
      }
      return user;
    } catch (error) {
      console.error('Error parsing stored user data', error);
      this.logout(); // Clear invalid data
      return null;
    }
  }

  logout() {
    sessionStorage.removeItem(this.USER_STORAGE_KEY);
    this.router.navigate(['/login']);
  }
}