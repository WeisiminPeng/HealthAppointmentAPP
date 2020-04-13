import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Internationalization } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { TimePicker } from '@syncfusion/ej2-angular-calendars';
import { EJ2Instance } from '@syncfusion/ej2-angular-schedule';

import { DoctorService } from '../../../services/doctor.service'
import { doctorsData } from 'src/app/HealthAppointment/healthappoint.model';
import { success } from 'src/app/HealthAppointment/healthappoint.model';
// import { workHours } from 'src/app/HealthAppointment/healthappoint.model';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {

  constructor(public doctorService: DoctorService, public routes: ActivatedRoute) { }

  public doctors: Array<doctorsData>;
  public doctor: doctorsData;
  public id: string;
  public workStartHoursData: Date;
  public workEndHoursData: Date;
  public breakHoursData: Object;
  public intl: Internationalization = new Internationalization();
  public animationSettings: Object = { effect: 'None' };
  // test breakhour show
  // public BreakStart= new Date(2018, 6, 1, 12, 0);
  // public BreakEnd=new Date(2018, 6, 1, 13, 0);
  dataBreakStartHour: Date;
  dataBreakEndHour: Date;
  dataBreakStartHourDetail: Date;
  dataBreakEndHourDetail: Date;
  @ViewChild('breakHourObj')
  public breakHourObj: DialogComponent;
  public doctorUpdate: success;

  ngOnInit(): void {
    // get id
    this.id = this.routes.snapshot.paramMap.get('id');

    // get doctor's workhours
    this.doctorService.get(this.id).subscribe(doctor => {
      this.doctor = doctor;
      console.log(this.doctor)
      // this.workHoursData = this.doctor.WorkDays;
      // this.breakHoursData = JSON.parse(JSON.stringify(this.workHoursData));
      // console.log("test!: "+JSON.parse(JSON.stringify(this.workHoursData)))
      this.breakHoursData = this.doctor.WorkDays;
      // this.workStartHoursData = new Date(<Date>this.doctor.StartHour);
      // new Date(<Date>workDays[i].WorkStartHour);
      // console.log("this.breakHoursData: " + this.breakHoursData)
      // console.log(this.workHoursData)
      // this.filteredDoctors = this.doctors;
    });
    // this.doctor = this.doctors.filter(
    //   (item: doctorsData) => item.Id === this.id)[0];
    //   console.log(this.doctor.Name)

    // this.workHoursData = JSON.parse(JSON.stringify(this.selectedDoctor.WorkDays));
    // this.workHoursData = this.doctor.WorkDays;
    // console.log(this.workHoursData)
  }

  onEditBreak() {
    this.breakHourObj.show();
  }

  getWorkDayName(day: string) {
    return day.charAt(0).toUpperCase() + day.slice(1);
  }
  getDayName(day: string) {
    return day.split('')[0].toUpperCase();
  }

  onChangeStates(args: any) {
    args.preventDefault();
    const currentState: string = args.target.getAttribute('data-state');
    console.log(currentState);
    const currentDay: string = args.target.getAttribute('id').split('_')[0];
    let newState: String = '';
    // switch state
    // !! not change database
    switch (currentState) {
      case 'TimeOff':
        newState = 'RemoveBreak';
        break;
      case 'RemoveBreak':
        newState = 'AddBreak';
        break;
      case 'AddBreak':
        newState = 'TimeOff';
        break;
    }

    //find the switched day and change state
    for (let i = 0; i < (<{ [key: string]: Object }[]>this.breakHoursData).length; i++) {
      if (this.breakHoursData[i].Day === currentDay) {
        this.breakHoursData[i].State = newState;
      }
    }
  }

  //if state is no break, unenable it 
  getStatus(state: string) {
    return state === 'RemoveBreak' ? false : true;
  }

  //change showing style
  getBreakStartHour(BreakStartHour: string) {
    return this.dataBreakStartHourDetail = new Date(BreakStartHour)
    // return `${this.intl.formatDate(this.dataBreakStartHourDetail, { skeleton: 'hm' })}`;
  }
  //change showing style
  getBreakEndHour(BreakEndHour: string) {
    return this.dataBreakEndHourDetail= new Date(BreakEndHour)
    // return `${this.intl.formatDate(this.dataBreakEndHourDetail, { skeleton: 'hm' })}`;
  }

  getBreakDetails(data: any) {
    if (data.State === 'TimeOff') {
      return 'TIME OFF';
    } else if (data.State === 'RemoveBreak') {
      return '---';
    } else {
      // this.BreakStart = data.BreakStartHour;
      // this.BreakEnd = data.BreakEndHour;
      // console.log("data.BreakStartHour:  " + data.BreakStartHour)
      // console.log("this.BreakStart: "+this.BreakStart);
      // console.log(this.BreakEnd);
      this.dataBreakStartHour = new Date(data.BreakStartHour);
      this.dataBreakEndHour = new Date(data.BreakEndHour);
      return `${this.intl.formatDate(this.dataBreakStartHour, { skeleton: 'hm' })} - ${this.intl.formatDate(this.dataBreakEndHour, { skeleton: 'hm' })}`;
      // return `${this.intl.formatDate(data.BreakStartHour, { skeleton: 'hm' })} - ${this.intl.formatDate(data.BreakEndHour, { skeleton: 'hm' })}`;
    }
  }

  onCancelClick() {
    this.doctorService.get(this.id).subscribe(doctor => {
      this.doctor = doctor;
      // console.log(this.doctor)
      // this.workHoursData = this.doctor.WorkDays;
      // this.breakHoursData = JSON.parse(JSON.stringify(this.workHoursData));
      this.breakHoursData = this.doctor.WorkDays;
    });
    // this.breakDays = this.dataService.getActiveDoctorData()['WorkDays'];
    this.breakHourObj.hide();
  }

  onSaveClick() {
    const formelement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.break-hour-dialog .e-field'));
    // const workDays: { [key: string]: Object }[] = JSON.parse(JSON.stringify(this.breakHoursData));
    const workDays: { [key: string]: Object }[] = JSON.parse(JSON.stringify(this.breakHoursData));
    // console.log(workDays)
    for (const curElement of formelement) {
      const dayName: string = curElement.parentElement.getAttribute('id').split('_')[0];
      const valueName: string = curElement.parentElement.getAttribute('id').split('_')[1];
      const instance: TimePicker = (curElement.parentElement as EJ2Instance).ej2_instances[0] as TimePicker;
      for (let i = 0; i < workDays.length; i++) {
        if (workDays[i].Day === dayName) {
          if (valueName === 'start') {
            workDays[i].BreakStartHour = instance.value;
            // console.log("instance.value;: "+instance.value)
            // console.log("workDays[i].BreakStartHour: "+workDays[i].BreakStartHour)
            // workDays[i].BreakStartHour = new Date(<Date>workDays[i].BreakStartHour);
            workDays[i].WorkStartHour = new Date(<Date>workDays[i].WorkStartHour);
          } else {
            workDays[i].BreakEndHour = instance.value;
            // console.log(instance.value)
            // workDays[i].BreakEndHour = new Date(<Date>workDays[i].BreakEndHour);
            workDays[i].WorkEndHour = new Date(<Date>workDays[i].WorkEndHour);
          }
        }
        workDays[i].Enable = !(workDays[i].State === 'TimeOff');
        // console.log(workDays[i])
      }
    }
    // console.log(workDays)
    this.breakHoursData = workDays;


    //change AvailableDays
    const availableDays: Array<number> = [];
    workDays.forEach(workDay => {
      if (workDay.Enable) {
        availableDays.push(<number>workDay['Index']);
      }
    });
    var editDoctorWorkDays: any = {};
    editDoctorWorkDays.WorkDays = workDays;
    editDoctorWorkDays.AvailableDays = availableDays;
    console.log(editDoctorWorkDays)
    this.doctorService.update(editDoctorWorkDays, this.id).subscribe(doctorUpdate => {
      this.doctorUpdate = doctorUpdate;
      console.log(this.doctorUpdate)
    });
    this.breakHourObj.hide();




    // const availableDays: Array<number> = [];
    // workDays.forEach(workDay => {
    //   if (workDay.Enable) {
    //     availableDays.push(<number>workDay['Index']);
    //   }
    // });
    // this.activeData.AvailableDays = availableDays;
    // this.activeData.WorkDays = workDays;
    // this.dataService.onUpdateData('WorkDays', workDays, 'doctor', this.activeData);
    // this.breakHourObj.hide();
  }


}
