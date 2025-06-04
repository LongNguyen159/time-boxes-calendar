import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { WeekService, MonthService, WorkWeekService, DayService, AgendaService, ScheduleComponent, ActionEventArgs, PopupOpenEventArgs, EventSettingsModel, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule'
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
import { CalendarService } from '../../services/calendar.service';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    ScheduleModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarService = inject(CalendarService)


  classOptions = [
    { text: 'All classes', value: 'all' },
    { text: 'IT3X', value: 'it3x' },
    { text: 'IT3Y', value: 'it3y' },
    { text: 'IT3Z', value: 'it3z' },
  ];


  selectedClass: string = 'all'; // Default selection

  // Library event settings model. This manages internal data source and events handling
  eventSettings: EventSettingsModel = {
    dataSource: []
  };

  private allEvents: any[] = []; // Store all events initially

  editMode: boolean = true;

  ngOnInit(): void {
    // this.loadEventsFromLocalStorage();
    this.loadEventsFromAPI()
  }

  /** Get events from API: Fetch all events of given user:
   * Get current user from SessionStorage.
   * Fetch events from API using user metadata.
   */
  private loadEventsFromLocalStorage(): void {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      this.allEvents = JSON.parse(savedEvents);
      console.log('Loaded events from local storage:', this.allEvents);
      
      // Update the eventSettings to use the loaded events
      this.eventSettings = {
        dataSource: this.allEvents,
        fields: {
          id: 'Id',
          subject: { name: 'Subject' },
          startTime: { name: 'StartTime' },
          endTime: { name: 'EndTime' }
        }
      };
    }
  }

  private loadEventsFromAPI(): void {
      this.calendarService.getAllEventsOfUser().subscribe(
        (events: any) => {
          this.allEvents = events.json ?? events.data ?? [];
          console.log('Loaded events response', events)
          console.log('Loaded events from API:', this.allEvents);
  
          // Update the eventSettings to use the loaded events
          this.eventSettings = {
            dataSource: this.allEvents,
            fields: {
              id: 'Id',
              subject: { name: 'Subject' },
              startTime: { name: 'StartTime' },
              endTime: { name: 'EndTime' }
            }
          };
        },
        (error) => {
          console.error('Error fetching events from API:', error);
        }
      );
    }



  onActionComplete(event: ActionEventArgs): void {
    console.log('Action complete:', event);

    if (event.requestType === 'eventCreated' && event.addedRecords) {
      event.addedRecords.forEach((newEvent) => {
        // this.allEvents.push(newEvent); // Update the allEvents array
        this.saveEventsToAPI(newEvent); // Save the single event to the API
      });
    }

    if (event.requestType === 'eventChanged' && event.changedRecords) {
      event.changedRecords.forEach((updatedEvent) => {
        // const index = this.allEvents.findIndex((e) => e.Id === updatedEvent['Id']);
        // if (index !== -1) {
        //   this.allEvents[index] = updatedEvent; // Update the allEvents array
        // }
        this.updateEventAPI(updatedEvent); // Save the single event to the API
      });
    }

    if (event.requestType === 'eventRemoved' && event.deletedRecords) {
      console.log('events', event)
      console.log('all events', this.allEvents)
      event.deletedRecords.forEach((deletedEvent) => {
        this.deleteEventAPI(deletedEvent); // Delete the single event from the API
        // const index = this.allEvents.findIndex((e) => e.Id === deletedEvent['Id']);
        // if (index !== -1) {
        //   console.log('Delete event:', deletedEvent)
        //   this.allEvents.splice(index, 1); // Update the allEvents array
        // }
      });
    }
  }



  private saveEventsToAPI(event: any): void {
    this.calendarService.saveEvents(event).subscribe({
      next: (response) => {
        console.log('Events saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving events to API:', error);
      }
    });
  }

  private updateEventAPI(event: any): void {
    this.calendarService.updateEvent(event).subscribe({
      next: (response) => {
        console.log('Events saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving events to API:', error);
      }
    });
  }


  private deleteEventAPI(event: any): void {
    this.calendarService.deleteEvent(event).subscribe({
      next: (response) => {
        console.log('Events saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving events to API:', error);
      }
    });
  }

  


  private saveEventsToLocalStorage(): void {
    // // Create a map to store the most recent version of each event by ID
    // const eventMap = new Map<string, any>();
    
    // // Process events in order, so later occurrences of the same ID will overwrite earlier ones
    // this.allEvents.forEach(event => {
    //   if (event.Id) {
    //     eventMap.set(event.Id, event);
    //   } else {
    //     // For events without ID, generate one to avoid issues
    //     const newId = 'event_' + new Date().getTime().toString();
    //     event.Id = newId;
    //     eventMap.set(newId, event);
    //   }
    // });
    
    // // Convert map values back to array
    // const uniqueEvents = Array.from(eventMap.values());
    
    // // Save to localStorage
    // localStorage.setItem('calendarEvents', JSON.stringify(uniqueEvents));
    
    // // Update our allEvents array with the deduplicated data
    // this.allEvents = uniqueEvents;
  }


  /** Customise fields on opening event editor */
  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      const formElement = args.element.querySelector('.e-schedule-form') as HTMLElement;

      const fieldsToHide = [
        // '.e-location-container',  // Hides "Location"
        // '.e-description-container',  // Hides "Description"
        '.e-all-day-time-zone-row',  // Hides "All-day" checkbox & Timezone
        // '.e-recurrenceeditor-container'  // Hides "Repeat" (Recurrence) option
      ];

      fieldsToHide.forEach(selector => {
          const field = formElement.querySelector(selector) as HTMLElement;
          if (field) {
              field.style.display = 'none';  // Hides the field
          }
      });


      // Check if the custom field already exists
      if (!args.element.querySelector('.custom-field-row')) {
        // Create a new row for the dropdown
        let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
        let formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;

        // Insert before the title input field
        formElement.firstChild?.insertBefore(row, args.element.querySelector('.e-title-location-row'));

        let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
        let inputEle: HTMLInputElement = createElement('input', {
          className: 'e-field',
          attrs: { name: 'Class' }
        }) as HTMLInputElement;

        container.appendChild(inputEle);
        row.appendChild(container);

        // Initialize the dropdown list
        let dropDownList: DropDownList = new DropDownList({
          dataSource: this.classOptions,
          fields: { text: 'text', value: 'value' },
          value: (<{ [key: string]: Object; }>(args.data))['Class'] as string || 'all',
          floatLabelType: 'Always',
          placeholder: 'Class'
        });

        dropDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'Class');
      }
    }
  }





  
}
