import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeekService, MonthService, WorkWeekService, DayService, AgendaService, ScheduleComponent, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule'
import { ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScheduleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  title = 'time-boxes-calendar';


  onActionComplete(event: ActionEventArgs) {
    // console.log('Action complete:', event);


    if (event.requestType === 'eventCreated' && event.addedRecords) {
      event.addedRecords.forEach(event => this.saveEvent(event));
    }
    if (event.requestType === 'eventChanged' && event.changedRecords) {
      event.changedRecords.forEach(event => this.updateEvent(event));
    }
    if (event.requestType === 'eventRemoved' && event.deletedRecords) {
      event.deletedRecords.forEach(event => this.deleteEvent(event['Guid']));
    }
  }

  /** POST event to send to backend. Send the whole event object.
   * Backend to use ID based on the 'Id' attribute of the event object.
   */
  saveEvent(event: any) {
    // this.http.post(`${this.backendUrl}/create`, event).subscribe(response => {
    // });
    console.log('Event saved:', event);

    /** Save event, append class IT3XYZ if not given. Fetch the class from the current dropdown */
  }


  updateEvent(event: any) {
    // this.http.put(`${this.backendUrl}/update/${event.Id}`, event).subscribe(response => {
    // });
    console.log('Event updated:', event);

    /** Save event, append class IT3XYZ if not given. Fetch the class from the current dropdown */
  }

  deleteEvent(eventId: number) {
    // this.http.delete(`${this.backendUrl}/delete/${eventId}`).subscribe(response => {
    // });
    console.log('Event deleted:', eventId);
  }
}
