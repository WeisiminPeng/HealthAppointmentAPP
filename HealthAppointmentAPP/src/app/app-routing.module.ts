import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorAppointmentComponent } from './HealthAppointment/home/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorScheduleComponent } from './HealthAppointment/home/doctor/doctor-schedule/doctor-schedule.component';
import { PatientAppointmentComponent } from './HealthAppointment/home/patient/patient-appointment/patient-appointment.component';
import { PatientSidebarComponent } from './HealthAppointment/home/patient/patient-sidebar/patient-sidebar.component';
import { PatientScheduleComponent } from './HealthAppointment/home/patient/patient-schedule/patient-schedule.component';



const routes: Routes = [
  {
    path: 'doctorAppointment/:username',
    // path: 'doctorAppointment',
    component: DoctorAppointmentComponent
  },
  {
    path: 'doctorSchdule/:username',
    // path: 'doctorSchdule',
    component: DoctorScheduleComponent
  },
  {
    path: 'patientAppointment/:username',
    // path: 'patientAppointment',
    component: PatientAppointmentComponent
  },
  {
    path: 'patientSchdule/:username',
    // path: 'patientAppointment',
    component: PatientScheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
