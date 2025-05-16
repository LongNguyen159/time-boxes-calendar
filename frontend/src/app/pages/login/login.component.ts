import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from '../../models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router){}

  onLogin() {

    const mockUsers = [
      { username: 'Student', password: '1234', role: 'student' }, //bool if allow PushMessages, ID, Email, 
      { username: 'Teacher', password: '1234', role: 'teacher' }
    ];

    //Give Backend Data UserName/Email and Password and then Get all the User Data from the Database

    const foundUser = mockUsers.find(
      user => user.username === this.username && user.password === this.password
    );

    if (foundUser) {
      localStorage.setItem('role', foundUser.role);
      localStorage.setItem('username', foundUser.username);

      //Redirect to the Correct Page
      this.router.navigate([RoutePath.HomePage]);
    } else {
      alert('Invalid credentials');
    }
  }

  onRegister() {
    const mockUsers = [
      { username: 'Student', password: '1234', role: 'student' }, //bool if allow PushMessages, ID, Email, 
      { username: 'Teacher', password: '1234', role: 'teacher' }
    ];

    //Give Backend Data UserName/Email and Password and then Get all the User Data from the Database

    // Check if the entered username already exists
    const userExists = mockUsers.some(
      user => user.username.toLowerCase() === this.username.toLowerCase()
    );

    if (userExists) {
      alert('Username already exists. Please choose another one.');
    } else {
      //Redirect to the Correct Page
      this.router.navigate([RoutePath.HomePage]);
      alert('Account created successfully (not saved permanently). You can now log in.');
    }
  }
}
