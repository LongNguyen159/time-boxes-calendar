import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { WeekService, MonthService, WorkWeekService, DayService, AgendaService, ScheduleComponent, ActionEventArgs, PopupOpenEventArgs, EventSettingsModel, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule'
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';


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
export class CalendarComponent {
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



  onActionComplete(event: ActionEventArgs) {
    console.log('Action complete:', event);


    // if (event.requestType === 'eventCreated' && event.addedRecords) {
    //   event.addedRecords.forEach(event => this.saveEvent(event));
    // }
    // if (event.requestType === 'eventChanged' && event.changedRecords) {
    //   event.changedRecords.forEach(event => this.updateEvent(event));
    // }
    // if (event.requestType === 'eventRemoved' && event.deletedRecords) {
    //   event.deletedRecords.forEach(event => this.deleteEvent(event['Guid']));
    // }
  }


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
