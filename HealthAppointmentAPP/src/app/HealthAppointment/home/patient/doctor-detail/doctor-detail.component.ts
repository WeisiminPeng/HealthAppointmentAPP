import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Query, Predicate, DataManager } from '@syncfusion/ej2-data';

import {
  DayService, WeekService, WorkWeekService, MonthService, AgendaService,
  ResizeService, DragAndDropService, EventSettingsModel, ActionEventArgs,
  ToolbarActionArgs, ScheduleComponent, CellClickEventArgs, TimeScaleModel,
  PopupOpenEventArgs, EJ2Instance, getWeekFirstDate, addDays, NavigatingEventArgs, WorkHoursModel
} from '@syncfusion/ej2-angular-schedule';
import {
  remove, addClass, closest, Browser, L10n, Internationalization, extend, isNullOrUndefined, createElement
} from '@syncfusion/ej2-base';
import { ClickEventArgs, Button, CheckBox } from '@syncfusion/ej2-angular-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { Dialog } from '@syncfusion/ej2-popups';


import { DoctorService } from '../../../services/doctor.service'
import { PatientService } from '../../../services/patient.service'
import { AppointmentService } from '../../../services/appointment.service'
import { doctorsData, workHours, appointmentData, success, breakhour, patientData } from 'src/app/HealthAppointment/healthappoint.model';
// import { CalendarSettings } from './../../calenderSetting';


L10n.load({
  'en-US': {
    'schedule': {
      'newEvent': 'Add Appointment',
      'editEvent': 'Edit Appointment'
    }
  }
});
@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss'],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, AgendaService,
    ResizeService, DragAndDropService
  ]
})
export class DoctorDetailComponent implements OnInit {

  constructor(public doctorService: DoctorService, public patientService: PatientService, public appointmentService: AppointmentService, public routes: ActivatedRoute) { }



  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;

  public startHour: string = '08:00';
  public endHour: string = '18:00';
  public usernamePatient: string;
  public usernameDoctor: string;
  public appointments: Array<appointmentData>;
  public BreakStartHour: Date;
  public BreakEndHour: Date;
  public currentBreakHourArray: any[] = [];
  public currentBreakHour: appointmentData;
  public arraytemp: any[] = [];
  public temp: workHours[];

  public instance: Internationalization = new Internationalization();


  public currentDoctor: doctorsData;
  public currentPatient: patientData;
  public currentPatientName: string;
  public currentDoctorData: doctorsData;
  public resMsg: success;
  public appointmentID: string;


  // canlender settings
  // public calendarSettings: CalendarSettings;
  public eventData: Object[];
  // public eventData = new Array();
  public currentView: string = 'Week';
  public workDays: Array<number> = [0, 1, 2, 3, 4, 5, 6];
  public workHours: WorkHoursModel = { start: '08:00', end: '21:00' };
  public animationSettings: Object = { effect: 'None' };
  public timeScale: TimeScaleModel = { enable: true, interval: 60 };
  public firstDayOfWeek: Number = 0;
  public bookingColor: '#FF0000';
  public selectedDate: Date = new Date(Date.now());
  // new Date(2020, 1, 5);
  public currentDate: Date = this.selectedDate;

  public eventSettings: EventSettingsModel;
  public updateModifyDate: string;
  public todoUpdate: success;
  public newAppointment: appointmentData;
  public currentEvent;
  public updateAppointmentItem: string;
  public addAppointmentItem: string;
  public showQuickInfo: Boolean = false;
  public yes: Boolean = true;




  ngOnInit(): void {
    // get doctor/patient username
    this.usernamePatient = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.usernameDoctor = this.routes.snapshot.paramMap.get('username').split('_')[1];

    // all the appointments of this doctor
    this.arraytemp = [];
    this.doctorService.get(this.usernameDoctor).subscribe(doctor => {
      this.currentDoctor = doctor;

      // only show the days doctor works everyweek
      var result = Object.values(this.currentDoctor.AvailableDays);
      this.workDays = result;

      // disable cell in canlender when it is breakhour
      this.temp = this.currentDoctor.WorkDays
      for (var i = 0; i < 7; i++) {
        if (this.temp[i].State != 'RemoveBreak') {
          this.BreakStartHour = this.temp[i].BreakStartHour;
          this.BreakEndHour = this.temp[i].BreakEndHour;
          var addAppointment: any = {};
          addAppointment.PatientName = 'Break Hour';
          addAppointment.StartTime = this.BreakStartHour;
          addAppointment.EndTime = this.BreakEndHour;
          addAppointment.IsBlock = true;
          addAppointment.RecurrenceRule = 'FREQ=WEEKLY;INTERVAL=1;COUNT = 1000';
          this.currentBreakHourArray.push(addAppointment);
        }
      }

      // get patient info
      this.patientService.get(this.usernamePatient).subscribe(patient => {
        this.currentPatient = patient;
        this.currentPatientName = this.currentPatient.Text;
        // get all the appointment of this doctor
        this.appointmentService.get(this.usernameDoctor).subscribe(appointments => {
          this.appointments = appointments;
          for (var j = 0; j < this.appointments.length; j++) {
            if (this.appointments[j].PatientUsername !== this.usernamePatient) {
              this.appointments[j].IsBlock = true;
            }
          }
          // combine this two array
          this.arraytemp = this.currentBreakHourArray.concat(this.appointments);

          this.eventData = this.arraytemp;
          this.eventSettings = {
            dataSource: this.eventData,
            fields: {
              subject: {
                name: 'PatientName',
                title: 'PatientName',
              },
              startTime: { title: 'From', validation: { required: true } },
              endTime: { title: 'To', validation: { required: true } },
              description: {
                name: 'Symptims',
                title: 'Symptims',
              }
            },
            resourceColorField: this.bookingColor
          };
        });
      });
    });
  }

  getEventDetails(data: Object) {
    return (this.instance.formatDate(new Date(data['StartTime']), { type: 'date', skeleton: 'long' }) +
      '(' + this.getString(new Date(data['StartTime']), 'hm') + '-' + this.getString(new Date(data['EndTime']), 'hm') + ')');
  }

  getString(value: Date, type: string) {
    return this.instance.formatDate(new Date(value), { type: 'dateTime', skeleton: type });
  }



  //  edit appointment
  // validation: Symptoms must be filled
  public eventAdd(e) {

    var inputValue = (<HTMLInputElement>document.getElementById("Description")).value;
    if (inputValue == '') {
      alert("Symptoms must be filled!")
    } else {

      const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
      const eventData: { [key: string]: Object } = this.scheduleObj.eventWindow.getObjectFromFormData('e-schedule-dialog');
      this.scheduleObj.eventWindow.convertToEventData(data as { [key: string]: Object }, eventData);
      eventData.Id = this.scheduleObj.eventBase.getEventMaxID() as number + 1;
      var addAppointment: any = {};
      addAppointment.PatientName = this.currentPatient.Name;
      addAppointment.PatientUsername = this.usernamePatient;
      addAppointment.DoctorName = this.currentDoctor.Name;
      addAppointment.DoctorUsername = this.usernameDoctor
      addAppointment.Symptims = String(eventData.Symptims);
      addAppointment.Id = String(eventData.Id);
      addAppointment.StartTime = eventData.StartTime;
      addAppointment.EndTime = eventData.EndTime;
      addAppointment.CategoryColor = '#666666';
      this.addAppointmentItem = JSON.stringify(addAppointment);
      this.appointmentService.save(this.addAppointmentItem).subscribe(newAppointment => {
        this.newAppointment = newAppointment;
      });
      location.reload();

      this.scheduleObj.addEvent(eventData);
      this.dialogClose();
    }
  }
  public eventDelete(e) {
    if (this.yes) {
      alert("Are you sure to delete this appointment?");
      this.yes = false;
    } else {
      const eventData: { [key: string]: Object } = this.scheduleObj.activeEventData.event as any;
      this.appointmentID = String(eventData.id);
      this.appointmentService.delete(this.appointmentID).subscribe(deleteMsg => {
        this.resMsg = deleteMsg;
      });
      this.dialogClose();
      location.reload();
      this.yes = true;
    }
  }

  // edit appointment
  public editEvent(e) {
    var inputValue = (<HTMLInputElement>document.getElementById("Description")).value;
    if (inputValue == '') {
      alert("Symptoms must be filled!")
    } else {
      const eventDataOriginal: { [key: string]: Object } = this.scheduleObj.activeEventData.event as any;
      const eventData: { [key: string]: Object } = this.scheduleObj.eventWindow.getObjectFromFormData('e-schedule-dialog');
      eventData.Id = this.currentEvent.Id;
      this.appointmentID = String(eventDataOriginal.id);
      var updateAppointment: any = {};
      updateAppointment.Symptims = String(eventData.Symptims);
      updateAppointment.StartTime = eventData.StartTime;
      updateAppointment.EndTime = eventData.EndTime;
      this.updateAppointmentItem = JSON.stringify(updateAppointment);
      this.appointmentService.update(this.updateAppointmentItem, this.appointmentID).subscribe(appointmentUpdate => {
        this.resMsg = appointmentUpdate;
      });
      this.scheduleObj.saveEvent(eventData);
      this.dialogClose();
    }
  }
  public dialogClose() {
    let dialogObj: Dialog = (document.querySelector('.e-schedule-dialog') as EJ2Instance).ej2_instances[0] as Dialog;
    dialogObj.hide();
    location.reload();
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      let dialogObj: Dialog = (args.element as EJ2Instance).ej2_instances[0] as Dialog;
      let buttons;
      if (args.target.classList.contains('e-appointment')) {
        this.currentEvent = this.scheduleObj.getEventDetails(args.target);
        buttons = [{
          buttonModel: { content: 'Edit', isPrimary: true }, click: this.editEvent.bind(this)
        }, {
          buttonModel: { content: 'Delete', cssClass: 'e-event-delete' }, click: this.eventDelete.bind(this)
        }];
      } else {
        buttons = [{
          buttonModel: { content: 'Add', isPrimary: true }, click: this.eventAdd.bind(this)
        }, {
          buttonModel: { content: 'Close', cssClass: 'e-event-delete' }, click: this.dialogClose.bind(this)
        }];
      }
      dialogObj.buttons = buttons;
      dialogObj.dataBind();
      let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
      if (!startElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
      }
      let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
      }
    }
  }

}
