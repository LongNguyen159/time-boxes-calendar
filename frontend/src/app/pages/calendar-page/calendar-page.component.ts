import { Component } from '@angular/core';
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [CalendarComponent, NavbarComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {

}
