<<<<<<< HEAD
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'',
    component:MainComponent
=======
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorAppointmentComponent } from './HealthAppointment/home/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorScheduleComponent } from './HealthAppointment/home/doctor/doctor-schedule/doctor-schedule.component';
import { PatientAppointmentComponent } from './HealthAppointment/home/patient/patient-appointment/patient-appointment.component';
import { PatientSidebarComponent } from './HealthAppointment/home/patient/patient-sidebar/patient-sidebar.component';
import { PatientScheduleComponent } from './HealthAppointment/home/patient/patient-schedule/patient-schedule.component';



const routes: Routes = [
  {
    path: 'doctorAppointment/:id',
    // path: 'doctorAppointment',
    component: DoctorAppointmentComponent
  },
  {
    path: 'doctorSchdule/:id',
    // path: 'doctorSchdule',
    component: DoctorScheduleComponent
  },
  {
    // path: 'patientAppointment/:id',
    path: 'patientAppointment',
    component: PatientAppointmentComponent
  },
  {
    // path: 'patientSchdule/:id',
    path: 'patientAppointment',
    component: PatientScheduleComponent
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
export class AppRoutingModule {}
=======
export class AppRoutingModule { }
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
