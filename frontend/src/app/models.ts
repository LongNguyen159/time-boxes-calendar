

export enum RoutePath {
  HomePage = '/',
  LoginPage = '/login',
  CalendarPage = '/calendar',
}

export interface UserData {
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

