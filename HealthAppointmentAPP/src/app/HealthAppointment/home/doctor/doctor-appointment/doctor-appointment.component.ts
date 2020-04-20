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
  public username: string;
  public workStartHoursData: Date;
  public workEndHoursData: Date;
  public breakHoursData: Object;
  public intl: Internationalization = new Internationalization();
  public animationSettings: Object = { effect: 'None' };
  dataBreakStartHour: Date;
  dataBreakEndHour: Date;
  dataBreakStartHourDetail: Date;
  dataBreakEndHourDetail: Date;
  @ViewChild('breakHourObj')
  public breakHourObj: DialogComponent;
  public doctorUpdate: success;

  ngOnInit(): void {
    // get username
    this.username = this.routes.snapshot.paramMap.get('username');
    // console.log("this.username: " + this.username)

    // get doctor's workhours
    this.doctorService.get(this.username).subscribe(doctor => {
      this.doctor = doctor;
      this.breakHoursData = this.doctor.WorkDays;
    });
  }

  onEditBreak() {
    this.breakHourObj.show();
  }

  getDayName(day: string) {
    return day.split('')[0];
  }

  // three states: Timeoff/RemoveBreak/Addbreak
  onChangeStates(args: any) {
    args.preventDefault();
    const currentState: string = args.target.getAttribute('data-state');
    // console.log(currentState);
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
      if (this.breakHoursData[i].day === currentDay) {
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
    return this.dataBreakEndHourDetail = new Date(BreakEndHour)
    // return `${this.intl.formatDate(this.dataBreakEndHourDetail, { skeleton: 'hm' })}`;
  }

  getBreakDetails(data: any) {
    if (data.State === 'TimeOff') {
      return 'TIME OFF';
    } else if (data.State === 'RemoveBreak') {
      return '---';
    } else {
      this.dataBreakStartHour = new Date(data.BreakStartHour);
      this.dataBreakEndHour = new Date(data.BreakEndHour);
      return `${this.intl.formatDate(this.dataBreakStartHour, { skeleton: 'hm' })} - ${this.intl.formatDate(this.dataBreakEndHour, { skeleton: 'hm' })}`;
    }
  }

  onCancelClick() {
    this.doctorService.get(this.username).subscribe(doctor => {
      this.doctor = doctor;
      this.breakHoursData = this.doctor.WorkDays;
    });
    this.breakHourObj.hide();
  }

  onSaveClick() {
    const formelement: HTMLInputElement[] = [].slice.call(document.querySelectorAll('.break-hour-dialog .e-field'));
    const workDays: { [key: string]: Object }[] = JSON.parse(JSON.stringify(this.breakHoursData));
    for (const curElement of formelement) {
      const dayName: string = curElement.parentElement.getAttribute('id').split('_')[0];
      const valueName: string = curElement.parentElement.getAttribute('id').split('_')[1];
      const instance: TimePicker = (curElement.parentElement as EJ2Instance).ej2_instances[0] as TimePicker;
      for (let i = 0; i < workDays.length; i++) {
        if (workDays[i].day === dayName) {
          if (valueName === 'start') {
            workDays[i].BreakStartHour = instance.value;
            workDays[i].WorkStartHour = new Date(<Date>workDays[i].WorkStartHour);
          } else {
            workDays[i].BreakEndHour = instance.value;
            workDays[i].WorkEndHour = new Date(<Date>workDays[i].WorkEndHour);
          }
        }
        workDays[i].Enable = !(workDays[i].State === 'TimeOff');
      }
    }
    this.breakHoursData = workDays;


    //change AvailableDays
    const availableDays: Array<number> = [];
    workDays.forEach(workDay => {
      if (workDay.Enable) {
        availableDays.push(<number>workDay['index']);
      }
    });
    var editDoctorWorkDays: any = {};
    editDoctorWorkDays.WorkDays = workDays;
    editDoctorWorkDays.AvailableDays = availableDays;
    // console.log(editDoctorWorkDays)
    this.doctorService.update(editDoctorWorkDays, this.username).subscribe(doctorUpdate => {
      this.doctorUpdate = doctorUpdate;
      // console.log(this.doctorUpdate)
    });
    this.breakHourObj.hide();

  }


}
