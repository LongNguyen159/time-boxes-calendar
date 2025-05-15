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
      { username: 'Student', password: '1234', role: 'student' },
      { username: 'Teacher', password: '1234', role: 'teacher' }
    ];

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
}
