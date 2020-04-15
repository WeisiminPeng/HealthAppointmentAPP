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
  public selectedDate: Date = new Date(2020, 1, 5);
  public currentDate: Date = this.selectedDate;

  public eventSettings: EventSettingsModel;

  public data: object[] = [{
    Id: 2,
    Subject: 'Paris',
    StartTime: new Date(Date.UTC(2020, 1, 14, 10, 0)),
    EndTime: new Date(Date.UTC(2020, 1, 14, 12, 30)),
    IsBlock: true,
  }];
  public updateModifyDate: string;
  public todoUpdate: success;
  public newTodo: appointmentData;
  public currentEvent;
  public updateAppointmentItem: string;
  // public showQuickInfo: Boolean = false;




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
    // var modifyDate: any = {};
    // modifyDate.PatientUsername = "testpatient1";
    // modifyDate.DoctorUsername = "testdoctor";
    // modifyDate.PatientName = "Laura Smith";
    // modifyDate.DoctorName = "Nembo Lukeni";
    // modifyDate.Symptims = "headache much";
    // modifyDate.StartTime = new Date(2020, 1, 14, 10, 0);
    // modifyDate.EndTime = new Date(2020, 1, 14, 12, 30);
    // this.updateModifyDate = JSON.stringify(modifyDate);
    // console.log(this.updateModifyDate);


    // this.appointmentService.save(this.updateModifyDate).subscribe(newTodo => {
    //   this.newTodo = newTodo;
    //   console.log(this.newTodo);
    // });


    // this.appointmentService.update(this.updateModifyDate, '5e93ee34f2896bb491f13c99').subscribe(todoUpdate => {
    //   this.todoUpdate = todoUpdate;
    //   console.log(this.todoUpdate)
    // });



    // this.eventData = this.generateEvents(this.activeDoctorData[0]);



    this.usernamePatient = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.usernameDoctor = this.routes.snapshot.paramMap.get('username').split('_')[1];
    // console.log(this.username)
    // console.log(this.data)

    // all the appointments of this doctor
    this.arraytemp = [];
    this.doctorService.get(this.usernameDoctor).subscribe(doctor => {
      this.currentDoctor = doctor;
      // var days = String(this.currentDoctor.AvailableDays).split(',');
      var result = Object.values(this.currentDoctor.AvailableDays);
      // console.log("******"+result)
      this.workDays = result;
      this.temp = this.currentDoctor.WorkDays


      for (var i = 0; i < 7; i++) {
        this.BreakStartHour = this.temp[i].BreakStartHour;
        this.BreakEndHour = this.temp[i].BreakEndHour;
        // this.BreakStartHour = new Date(2018,1,2,12,0);
        // this.BreakEndHour = new Date(2018,1,2,13,0);
        var addAppointment: any = {};
        addAppointment.PatientName = 'Break Hour';
        addAppointment.StartTime = this.BreakStartHour;
        addAppointment.EndTime = this.BreakEndHour;
        addAppointment.IsBlock = true;
        // addAppointment.Color = '#666666',
        // addAppointment.RecurrenceRule = "FREQ=DAILY;INTERVAL=1;UNTIL = 20300530T041343Z";
        addAppointment.RecurrenceRule = 'FREQ=WEEKLY;INTERVAL=1;COUNT = 1000';
      // console.log(addAppointment)
      this.currentBreakHourArray.push(addAppointment);
    }


    this.patientService.get(this.usernamePatient).subscribe(patient => {
      this.currentPatient = patient;
      this.currentPatientName = this.currentPatient.Text;
      console.log(this.currentPatientName)

    this.appointmentService.get(this.usernameDoctor).subscribe(appointments => {
      this.appointments = appointments;
      console.log(this.appointments);
      // console.log("***"+this.appointments.length)
      for(var j=0;j<this.appointments.length;j++){
        if(this.appointments[j].PatientUsername !== this.usernamePatient){
          this.appointments[j].IsBlock = true;
        }
      }
      console.log(this.appointments)
      this.arraytemp = this.currentBreakHourArray.concat(this.appointments);
      // }
      console.log("%%%%%%%%%")
      console.log(this.arraytemp)

      this.eventData = this.arraytemp;

      // this.eventData = this.appointments;

      this.eventSettings = {
        dataSource: this.eventData,
        // dataSource: this.data,
        // query: new Query(),
        fields: {
          subject: {
            // name: this.currentPatientName,
            name: 'PatientName',
            title: 'PatientName',
            // validation: {
            //   required: [true, 'Enter valid Patient Name'],
            //   // range: [this.nameValidation, 'Entered patient name is not present, please add new patient or select from list']
            // }
          },
          // location: { name: 'DoctorName', title: 'Doctor Name'},
          startTime: { title: 'From', validation: { required: true } },
          endTime: { title: 'To', validation: { required: true } },
          description: {
            name: 'Symptims',
            title: 'Symptims',
            validation: {
              required: [true, 'Please enter disease Symptoms'],
              minLength: [this.minValidation, 'Need atleast 5 letters to be entered']
            }
          }
        },
        resourceColorField: this.bookingColor
      };
    });
  });
    console.log("1");
    // console.log(this.data);
    // this.doctorService.get(this.username).subscribe(doctor => {
    //   this.currentDoctor = doctor;
    //   // console.log(this.currentDoctor);
    // });
    // });
      // console.log(this.currentDoctor);
      // // });
      // console.log("**********"+this.currentDoctor.WorkDays);
      // this.currentDoctor.WorkDays.forEach((element: workHours) => {
      //   console.log("_________"+element.BreakStartHour);
      //   if (element.State !== 'RemoveBreak') {
      //     const newBreakEvent: { [key: string]: Object } = {
      //       // Id: Math.max.apply(Math, this.eventData.map((data: { [key: string]: Object }) => data.Id)) + 1,
      //       PatientName: 'Break Time',
      //       StartTime: element.BreakStartHour,
      //       EndTime: element.BreakEndHour,
      //       IsBlock: true,
      //       // DoctorId: activeData['Id']
      //     };
      //     // console.log(newBreakEvent.BreakStartHour)
      //     // this.eventData.push(newBreakEvent);
      //     console.log(this.eventData)
      //   }
      // });
    });

    // this.patientService.get(this.usernamePatient).subscribe(patient => {
    //   this.currentPatient = patient;
    // });

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

  getEventDetails(data: Object) {
    return (this.instance.formatDate(new Date(data['StartTime']), { type: 'date', skeleton: 'long' }) +
      '(' + this.getString(new Date(data['StartTime']), 'hm') + '-' + this.getString(new Date(data['EndTime']), 'hm') + ')');
  }

  getString(value: Date, type: string) {
    return this.instance.formatDate(new Date(value), { type: 'dateTime', skeleton: type });
  }

  onEventRendered(args: any) {

  }


  public onActionBegin(args: ActionEventArgs): void {
    // const weekEnds: number[] = [0, 6];
    // if(args.requestType == 'eventCreate') {
    //     args.cancel = true;
    // }
  }



  // save data
  onActionComplete(args: ActionEventArgs): void {

  }
  showSidebar() { }


  // modify douclick popup

  public eventAdd(e) {

    var inputValue = (<HTMLInputElement>document.getElementById("Description")).value;
    if(inputValue == ''){
      alert("Symptoms must be filled!")
    }else{
{
    alert("debug");
    document.getElementById("field").style.display ="none";
}
    const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
    const eventData: { [key: string]: Object } = this.scheduleObj.eventWindow.getObjectFromFormData('e-schedule-dialog');
    this.scheduleObj.eventWindow.convertToEventData(data as { [key: string]: Object }, eventData);
    eventData.Id = this.scheduleObj.eventBase.getEventMaxID() as number + 1;
    console.log(eventData)
    var addAppointment: any = {};
    addAppointment.PatientName = this.currentPatient.Name;
    addAppointment.PatientUsername = this.usernamePatient;
    addAppointment.DoctorName = this.currentDoctor.Name;
    addAppointment.DoctorUsername = this.usernameDoctor
    addAppointment.Symptims = String(eventData.Symptims);
    addAppointment.Id = String(eventData.Id);
    addAppointment.StartTime = eventData.StartTime;
    addAppointment.EndTime = eventData.EndTime;
    // addAppointment.CategoryColor = this.getColor();
    addAppointment.CategoryColor = '#666666';
    this.updateAppointmentItem = JSON.stringify(addAppointment);
    console.log(this.updateAppointmentItem);
      this.appointmentService.save(this.updateAppointmentItem).subscribe(newTodo => {
      this.newTodo = newTodo;
      console.log(this.newTodo);
    });
    location.reload();

    this.scheduleObj.addEvent(eventData);
    this.dialogClose();
  }
  }
  public eventDelete(e) {
    const eventData: { [key: string]: Object } = this.scheduleObj.activeEventData.event as any;
    this.appointmentID = String(eventData.id);
    console.log(eventData)
    this.appointmentService.delete(this.appointmentID).subscribe(deleteMsg => {
      this.resMsg = deleteMsg;
      console.log(this.resMsg)
    });
    // this.scheduleObj.deleteEvent(7);
    this.dialogClose();
    location.reload();
  }
  public editEvent(e) {
    // debugger;
    const eventDataOriginal: { [key: string]: Object } = this.scheduleObj.activeEventData.event as any;
    const eventData: { [key: string]: Object } = this.scheduleObj.eventWindow.getObjectFromFormData('e-schedule-dialog');
    eventData.Id = this.currentEvent.Id;
    this.appointmentID = String(eventDataOriginal.id);
    console.log(eventDataOriginal)
    console.log(eventData)
    var updateAppointment: any = {};
    // updateAppointment.PatientName = String(eventData.PatientName);
    // updateAppointment.PatientUsername = this.usernamePatient;
    // updateAppointment.DoctorName = this.currentDoctor.Name;
    // updateAppointment.DoctorUsername = this.usernameDoctor
    updateAppointment.Symptims = String(eventData.Symptims);
    // updateAppointment.Id = String(eventData.Id);
    updateAppointment.StartTime = eventData.StartTime;
    updateAppointment.EndTime = eventData.EndTime;
    this.updateAppointmentItem = JSON.stringify(updateAppointment);
    console.log(this.updateAppointmentItem);
    this.appointmentService.update(this.updateAppointmentItem, this.appointmentID).subscribe(appointmentUpdate => {
      this.resMsg = appointmentUpdate;
      console.log(this.resMsg);
    });
    this.scheduleObj.saveEvent(eventData);
    this.dialogClose();
    // location.reload();
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
      // let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
      // if (!statusElement.classList.contains('e-dropdownlist')) {
      //   let dropDownListObject: DropDownList = new DropDownList({
      //     placeholder: 'Choose status', value: statusElement.value,
      //     dataSource: ['New', 'Requested', 'Confirmed']
      //   });
      //   dropDownListObject.appendTo(statusElement);
      //   statusElement.setAttribute('name', 'EventType');
      // }
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
  //   onPopupOpen(args: PopupOpenEventArgs): void {
  //     if (args.type === 'Editor') {
  //         let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
  //         // if (!statusElement.classList.contains('e-dropdownlist')) {
  //         //     let dropDownListObject: DropDownList = new DropDownList({
  //         //         placeholder: 'Choose status', value: statusElement.value,
  //         //         dataSource: ['New', 'Requested', 'Confirmed']
  //         //     });
  //         //     dropDownListObject.appendTo(statusElement);
  //         //     statusElement.setAttribute('name', 'EventType');
  //         // }
  //         let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
  //         if (!startElement.classList.contains('e-datetimepicker')) {
  //             new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
  //         }
  //         let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
  //         if (!endElement.classList.contains('e-datetimepicker')) {
  //             new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
  //         }
  //     }
  // }
  onNavigation(args: NavigatingEventArgs) { }

  //   generateEvents(activeData: doctorsData) {
  //     const filteredEvents: Object[] = [];
  //     // 找医生
  //     // const datas: Object[] = this.hospitalData.filter((item: any) =>
  //     //   item['DoctorId'] === activeData['Id'] || (Array.isArray(item['DoctorId']) && item['DoctorId'].indexOf(activeData['Id']) !== -1));
  //     // datas.forEach((element: Object) => filteredEvents.push(element));
  //     activeData.WorkDays.forEach((element: { [key: string]: Object }) => {
  //       if (element.State !== 'RemoveBreak') {
  //         const newBreakEvent: { [key: string]: Object } = {
  //           Id: Math.max.apply(Math, filteredEvents.map((data: { [key: string]: Object }) => data.Id)) + 1,
  //           Name: 'Break Time',
  //           StartTime: element.BreakStartHour,
  //           EndTime: element.BreakEndHour,
  //           IsBlock: true,
  //           // DoctorId: activeData['Id']
  //         };
  //         filteredEvents.push(newBreakEvent);
  //       }
  //       if (element.Enable) {
  //         const newOffworkEvent: { [key: string]: Object } = {
  //           Id: Math.max.apply(Math, filteredEvents.map((data: { [key: string]: Object }) => data.Id)) + 1,
  //           Name: 'Off Work',
  //           StartTime: element.WorkEndHour,
  //           EndTime: this.endHour,
  //           IsBlock: true,
  //           // DoctorId: activeData['Id']
  //         };
  //         filteredEvents.push(newOffworkEvent);   
  //       }
  //     });
  //     return filteredEvents;
  //   }

}
