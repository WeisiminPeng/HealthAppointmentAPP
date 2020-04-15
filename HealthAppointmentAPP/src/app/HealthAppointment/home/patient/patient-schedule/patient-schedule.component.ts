import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Internationalization } from '@syncfusion/ej2-base';

import { PatientService } from '../../../services/patient.service'
import { AppointmentService } from '../../../services/appointment.service'
import { doctorsData, workHours, appointmentData, success, breakhour, patientData } from 'src/app/HealthAppointment/healthappoint.model';


@Component({
  selector: 'app-patient-schedule',
  templateUrl: './patient-schedule.component.html',
  styleUrls: ['./patient-schedule.component.scss']
})
export class PatientScheduleComponent implements OnInit {

  constructor(public patientService: PatientService, public appointmentService: AppointmentService, public routes: ActivatedRoute) { }

  public username:string;
  public currentPatient: patientData;
  public appointments: Array<appointmentData>;
  public dataStartHour: Date;
  public dataEndHour: Date;
  public intl: Internationalization = new Internationalization();

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username');
    this.appointmentService.get(this.username).subscribe(appointments => {
      this.appointments = appointments;
  });
}

getStartTimeDetails(data: any) {
    this.dataStartHour = new Date(data.StartTime);
    return `${this.intl.formatDate(this.dataStartHour, { skeleton: "yMMMEd"  })} - ${this.intl.formatDate(this.dataStartHour, { skeleton: "hm"})}`;
}

getEndTimeDetails(data: any) {
  this.dataEndHour = new Date(data.EndTime);
  return `${this.intl.formatDate(this.dataEndHour, { skeleton: "yMMMEd"  })} - ${this.intl.formatDate(this.dataEndHour, { skeleton: "hm"})}`;
}

}
