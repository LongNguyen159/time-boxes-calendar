import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeekService, MonthService, WorkWeekService, DayService, AgendaService, ScheduleComponent, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule'
import { ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScheduleModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
})
export class AppComponent implements OnInit{
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  title = 'time-boxes-calendar';

  private backendUrl = 'http://192.168.15.107:8080';

  editMode: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  onActionComplete(event: ActionEventArgs) {
    console.log('Action complete:', event);


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
    console.log("Saving event...", event)
    // Make a POST request to create the event on the backend
    this.http.post(`${this.backendUrl}/timebox/calendar?calendarId=1`, event).subscribe(response => {
      console.log('Event saved:', response);
    }, error => {
      console.error('Error saving event:', error);
    });
  }


  updateEvent(event: any) {
    console.log("Updating event...", event)
    // Sending the ID as a query parameter for the update
    const updateUrl = `${this.backendUrl}/timebox/id?id=${event.Id}`;
    this.http.put(updateUrl, event).subscribe(response => {
      console.log('Event updated:', response);
    }, error => {
      console.error('Error updating event:', error);
    });
  }

  deleteEvent(eventId: string) {
    console.log("Deleting event...", eventId)
    // Sending the ID as a query parameter for deletion
    const deleteUrl = `${this.backendUrl}/calendar/id?id=${eventId}`;
    this.http.delete(deleteUrl).subscribe(response => {
      console.log('Event deleted:', response);
    }, error => {
      console.error('Error deleting event:', error);
    });
  }


  fetchEvents() {
    console.log("Fetching events...")
    // Sending a GET request to fetch all events
    this.http.get(`${this.backendUrl}/calendar`).subscribe((response: any) => {
      console.log('Fetched events:', response);
      // Assuming the response contains the event data, you can populate the schedule here
      this.scheduleObj.addEvent(response);
    }, error => {
      console.error('Error fetching events:', error);
    });
  }
}
