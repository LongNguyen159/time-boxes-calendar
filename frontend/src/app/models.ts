
export const API_URL = 'http://192.168.208.107:8080/api';

export enum RoutePath {
  HomePage = '/',
  LoginPage = '/login',
  CalendarPage = '/calendar',
  UserProfilePage = '/user-profile',
}

export interface UserData {
  id?: number;
  name: string;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  class: string;
  allowPushMessage: boolean;
}

export enum UserRole {
  Teacher = 'teacher',
  Student = 'student'
}

