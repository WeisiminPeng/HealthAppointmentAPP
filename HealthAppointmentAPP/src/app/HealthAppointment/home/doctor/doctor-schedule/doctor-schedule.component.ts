import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Query, Predicate, DataManager } from '@syncfusion/ej2-data';

import {
  DayService, WeekService, WorkWeekService, MonthService, AgendaService,
  ResizeService, DragAndDropService, EventSettingsModel, ActionEventArgs,
  ToolbarActionArgs, ScheduleComponent, CellClickEventArgs, TimeScaleModel,
  PopupOpenEventArgs, EJ2Instance, getWeekFirstDate, addDays, NavigatingEventArgs, WorkHoursModel
} from '@syncfusion/ej2-angular-schedule';
import { ClickEventArgs, Button, CheckBox } from '@syncfusion/ej2-angular-buttons';


import { DoctorService } from '../../../services/doctor.service'
import { AppointmentService } from '../../../services/appointment.service'
import { doctorsData } from 'src/app/HealthAppointment/healthappoint.model';
import { appointmentData } from 'src/app/HealthAppointment/healthappoint.model';
import { success } from 'src/app/HealthAppointment/healthappoint.model';
// import { CalendarSettings } from './../../calenderSetting';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.scss'],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, AgendaService,
    ResizeService, DragAndDropService
  ]
})
export class DoctorScheduleComponent implements OnInit {

  constructor(public doctorService: DoctorService, public appointmentService: AppointmentService, public routes: ActivatedRoute) { }

  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;

  public startHour: string;
  public endHour: string;
  public username: string;
  public appointments: Array<appointmentData>;


  public currentDoctor: doctorsData;


  // canlender settings
  // public calendarSettings: CalendarSettings;
  public eventData: Object[];
  public currentView: string = 'Week';
  public workDays: Array<number> = [0,1, 2, 3, 4, 5,6];
  public workHours: WorkHoursModel = { start: '08:00', end: '21:00' };
  public animationSettings: Object = { effect: 'None' };
  public timeScale: TimeScaleModel = { enable: true, interval: 60 };
  public firstDayOfWeek: Number = 0;
  public bookingColor: '#FF0000';
  public selectedDate: Date = new Date(2020, 1, 5);
  public currentDate: Date = this.selectedDate;

  public eventSettings: EventSettingsModel;

  public data: object[] = [{
    Id: 2,
    Subject: 'Paris',
    StartTime: new Date(2020, 1, 14, 10, 0),
    EndTime: new Date(2020, 1, 14, 12, 30)
}];
public updateModifyDate:string;
public todoUpdate: success;
public newTodo: appointmentData;




  ngOnInit(): void {

    // this.calendarSettings = {
    //   bookingColor: '#FF0000',
    //   calendar: {
    //     start: '08:00',
    //     end: '21:00'
    //   },
    //   currentView: 'Week',
    //   interval: 60,
    //   firstDayOfWeek: 0
    // };



    // !!!create new appointment
    var modifyDate: any = {};
    modifyDate.PatientUsername = "testpatient1";
    modifyDate.DoctorUsername = "testdoctor";
    modifyDate.PatientName = "Laura Smith";
    modifyDate.DoctorName = "Nembo Lukeni";
    modifyDate.Symptims = "headache much";
    modifyDate.StartTime = new Date(2020, 1, 14, 10, 0);
    modifyDate.EndTime = new Date(2020, 1, 14, 12, 30);
    this.updateModifyDate = JSON.stringify(modifyDate);
    console.log(this.updateModifyDate);


    this.appointmentService.save(this.updateModifyDate).subscribe(newTodo => {
      this.newTodo = newTodo;
      console.log(this.newTodo);
    });


    // this.appointmentService.update(this.updateModifyDate, '5e93ee34f2896bb491f13c99').subscribe(todoUpdate => {
    //   this.todoUpdate = todoUpdate;
    //   console.log(this.todoUpdate)
    // });



    this.username = this.routes.snapshot.paramMap.get('username');
    // console.log(this.username)

    // all the appointments of this doctor
    this.appointmentService.get(this.username).subscribe(appointments => {
      this.appointments = appointments;
      console.log(this.appointments);
      this.eventData = this.appointments;
      this.eventSettings = {
        dataSource: this.eventData,
        // dataSource: this.data,
        query: new Query(),
        fields: {
          subject: {
            name: 'Name',
            validation: {
              required: [true, 'Enter valid Patient Name'],
              // range: [this.nameValidation, 'Entered patient name is not present, please add new patient or select from list']
            }
          },
          startTime: { title: 'From', validation: { required: true } },
          endTime: { title: 'To', validation: { required: true } },
          description: {
            name: 'Symptoms',
            title: 'Symptom',
            validation: {
              required: [true, 'Please enter disease Symptoms'],
              minLength: [this.minValidation, 'Need atleast 5 letters to be entered']
            }
          }
        },
        resourceColorField: this.bookingColor
      };
    });
    console.log("1");
    // console.log(this.data);
    this.doctorService.get(this.username).subscribe(doctor => {
      this.currentDoctor = doctor;
      // console.log(this.currentDoctor);
    });


    // canlender settings
    

    // this.currentView = this.currentView;
    // this.firstDayOfWeek = this.firstDayOfWeek;
    // this.eventSettings = {
    //   dataSource: this.eventData,
    //   // dataSource: this.data,
    //   query: new Query(),
    //   fields: {
    //     subject: {
    //       name: 'Name',
    //       validation: {
    //         required: [true, 'Enter valid Patient Name'],
    //         // range: [this.nameValidation, 'Entered patient name is not present, please add new patient or select from list']
    //       }
    //     },
    //     startTime: { title: 'From', validation: { required: true } },
    //     endTime: { title: 'To', validation: { required: true } },
    //     description: {
    //       name: 'Symptoms',
    //       title: 'Symptom',
    //       validation: {
    //         required: [true, 'Please enter disease Symptoms'],
    //         minLength: [this.minValidation, 'Need atleast 5 letters to be entered']
    //       }
    //     }
    //   },
    //   resourceColorField: this.bookingColor
    // };
  }

// input's lenth must larger than 5 for symptoms
  public minValidation: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string; }) => {
    return args['value'].length >= 5;
  }

  onEventRendered(args: any) {}
  onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {}
  onActionComplete(args: ActionEventArgs): void {}
  onPopupOpen(args: PopupOpenEventArgs) {}
  onNavigation(args: NavigatingEventArgs) {}

}
