import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RoutePath } from '../../models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule, RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  @Input() showBackButton: boolean = true;
  
  @Input() showCalendarPageButton: boolean = true;
  @Input() showHomeButton: boolean = true;
  @Input() showUserProfileButton: boolean = true;


  @Input() backLink: string = RoutePath.HomePage; // Optional back link: if provided, will navigate to this link when click on 'Back'
  @Input() backLabel: string = 'Back';

  RoutePath = RoutePath;
  private location = inject(Location)
  private router = inject(Router)


  navigateBack() {
    // If a backLink is provided, navigate to that link
    if (this.backLink) {
      this.router.navigate([this.backLink]);
      return
    }
    
    // If no backLink is provided, check the history length then navigate back
    if (window.history.length > 1) {
      this.location.back();
    } else {
      // If no back history, navigate to a fallback route (e.g., homepage)
      this.router.navigate([RoutePath.HomePage]);
    }
  }
}