import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Internationalization } from '@syncfusion/ej2-base';

import { PatientService } from '../../../services/patient.service';
import { AppointmentService } from '../../../services/appointment.service';
import { doctorsData, workHours, appointmentData, success, breakhour, patientData } from 'src/app/HealthAppointment/healthappoint.model';


@Component({
  selector: 'app-patient-schedule',
  templateUrl: './patient-schedule.component.html',
  styleUrls: ['./patient-schedule.component.scss']
})
export class PatientScheduleComponent implements OnInit {

  constructor(public patientService: PatientService, public appointmentService: AppointmentService, public routes: ActivatedRoute, private router: Router) { }

  public username: string;
  public currentPatient: patientData;
  public appointments: Array<appointmentData>;
  public dataStartHour: Date;
  public dataEndHour: Date;
  public dataWeek: Date;
  public dataMonth: Date;
  public dataDay: Date;
  public dataYear: Date;
  public intl: Internationalization = new Internationalization();
  public dataStart: Date;
  public dateNow = Date.now();
  public resMsg: success;
  public yes: Boolean = true;

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username');
    this.appointmentService.get(this.username).subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  getWeekDetails(data: any) {
    this.dataWeek = new Date(data.StartTime);
    return `${this.intl.formatDate(this.dataWeek, { skeleton: 'E'  })}`;
  }

  getMonthDetails(data: any) {
    this.dataMonth = new Date(data.StartTime);
    return `${this.intl.formatDate(this.dataMonth, { skeleton: 'MMM'  })}`;
  }
  getDayDetails(data: any) {
    this.dataDay = new Date(data.StartTime);
    return `${this.intl.formatDate(this.dataDay, { skeleton: 'd'  })}`;
  }
  getYearDetails(data: any) {
    this.dataYear = new Date(data.StartTime);
    return `${this.intl.formatDate(this.dataYear, { skeleton: 'y'  })}`;
  }
  getStartTimeDetails(data: any) {
    this.dataStartHour = new Date(data.StartTime);
    this.dataEndHour = new Date(data.EndTime);
    return `${this.intl.formatDate(this.dataStartHour, { skeleton: 'hm'})}`;
  }
  getEndTimeDetails(data: any) {
    this.dataStartHour = new Date(data.StartTime);
    this.dataEndHour = new Date(data.EndTime);
    return `${this.intl.formatDate(this.dataEndHour, { skeleton: 'hm'})}`;
  }

  // this function compares start date and current date to return different status
  compareDate(data: any) {
    this.dataStart = new Date(data.StartTime);
    // this.dateNow =  new Date.now();
    if (this.dataStart.getTime() <= this.dateNow) {
      return `Expired`;
    } else {
      return `Upcoming`;
    }
  }

  deleteAppointment(data: any) {
    if (this.yes) {
      alert("Are you sure to delete this appointment?");
      this.yes = false;
    } else {
    this.appointmentService.delete(data.id).subscribe(deleteMsg => {
      this.resMsg = deleteMsg;
      location.reload();
      this.yes = true;
    });
  }
  }

  gotoAppointment(data: any) {
    this.router.navigateByUrl('/patientDoctorDetail/' + data.PatientUsername + '_' + data.DoctorUsername);
  }

  sendMsg() {
    this.router.navigateByUrl('/messages/' + this.username + '_patient');
  }
  showText() {
    document.getElementById('deleteImg').hidden = true;
    if (document.getElementById('appStatus').innerText === 'Expired') {
      document.getElementById('deleteOrCancle').hidden = false;
      document.getElementById('deleteOrCancle').innerText = 'DELETE';
    } else {
      document.getElementById('deleteOrCancle').hidden = false;
      document.getElementById('deleteOrCancle').innerText = 'DELETE';
    }
  }
  showImg() {
      document.getElementById('deleteImg').hidden = false;
      document.getElementById('deleteOrCancle').hidden = true;
  }


}
