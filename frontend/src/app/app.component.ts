import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'time-boxes-calendar';
  userService = inject(UserService)
  router = inject(Router)

  ngOnInit(): void {
    // Check if the user is logged in. If not, redirect to the login page.
    if (!this.userService.checkIfUserIsLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
