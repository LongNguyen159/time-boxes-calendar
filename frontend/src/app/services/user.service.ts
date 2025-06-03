import { inject, Injectable } from '@angular/core';
import { API_URL, UserData, UserRole } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';


interface ApiResponse<T> {
  data: T;
  message: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_STORAGE_KEY = 'calendarUserData'
  http = inject(HttpClient)
  router = inject(Router)
  
  constructor() { }



  checkIfUserIsLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  loginMockup(username: string, password: string): Observable<ApiResponse<UserData>> {
    // Mock UserData object
    const mockUser: UserData = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      password: 'password123',
      email: 'johndoe@example.com',
      role: UserRole.Teacher,
      class: '',
      allowPushMessage: true,
    };

    // Validate the mock user
    if (username === mockUser.username && password === mockUser.password) {
      const response: ApiResponse<UserData> = {
        data: mockUser,
        message: 'Login successful',
      };

      // Simulate storing user data in session storage
      console.log('Login successful, storing user data:', response);
      sessionStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(response.data));

      // Return an observable of the mock response
      return of(response);
    } else {
      // Simulate a failed login
      return throwError(() => new Error('Invalid username or password'));
    }
  }

  login(username: string, password: string): Observable<ApiResponse<UserData>> {
    return this.http.post<ApiResponse<UserData>>(`${API_URL}/user/login`, { username, password })
      .pipe(
        tap(response => {
          // Store user data in session storage
          console.log('Login successful, storing user data:', response);
          sessionStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(response.data));
        })
      );
  }

  registerUser(user: UserData): Observable<ApiResponse<UserData>> {
    return this.http.post<ApiResponse<UserData>>(`${API_URL}/user`, user);
  }



  getCurrentUser(): UserData | null {
    const userData = sessionStorage.getItem(this.USER_STORAGE_KEY);
    console.log('Current user data:', userData);
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


  updateUserDetailsOrSettings(userData: Partial<UserData>): Observable<ApiResponse<UserData> | null> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return of(null);
    
    return this.http.put<ApiResponse<UserData>>(
      `${API_URL}/user/${currentUser.username}`, 
      userData
    ).pipe(
      tap(response => {
        // Update the stored user data
        const updatedUser = {...currentUser, ...response.data};
        sessionStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(updatedUser));
      })
    );
  }


  logout() {
    sessionStorage.removeItem(this.USER_STORAGE_KEY);
    this.router.navigate(['/login']);
  }
}
