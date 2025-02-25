import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeekService, MonthService, WorkWeekService, DayService, AgendaService, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScheduleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  title = 'time-boxes-calendar';
}
