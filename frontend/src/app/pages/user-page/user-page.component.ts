import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UserService } from '../../services/user.service';
import { UserData } from '../../models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [NavbarComponent, MatCardModule,
    MatButtonModule
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userData: UserData | null = null;
  userService = inject(UserService)
  uiService = inject(UiService)
  constructor() {}

  ngOnInit(): void {
    this.userData = this.userService.getCurrentUser();
  }

  onLogout(): void {
    this.userService.logout();
    this.userData = null;
    this.uiService.openSnackBar('You have been logged out successfully.', 'Close', 3000);
  }
}
