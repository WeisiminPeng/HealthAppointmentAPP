import { DoctorAppointmentComponent } from './HealthAppointment/home/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorScheduleComponent } from './HealthAppointment/home/doctor/doctor-schedule/doctor-schedule.component';
import { PatientAppointmentComponent } from './HealthAppointment/home/patient/patient-appointment/patient-appointment.component';
import { PatientSidebarComponent } from './HealthAppointment/home/patient/patient-sidebar/patient-sidebar.component';
import { PatientScheduleComponent } from './HealthAppointment/home/patient/patient-schedule/patient-schedule.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DoctorDetailComponent } from './HealthAppointment/home/patient/doctor-detail/doctor-detail.component';
import { PatientInfoComponent } from './HealthAppointment/home/patient/patient-info/patient-info.component';
import { DoctorInfoComponent } from './HealthAppointment/home/doctor/doctor-info/doctor-info.component';


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
  },
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

  },
  {
    path: 'patientDoctorDetail/:username',
    // path: 'patientAppointment',
    component: DoctorDetailComponent

  },
  {
    path: 'patientInfo/:username',
    // path: 'patientAppointment',
    component: PatientInfoComponent

  },{
    path: 'doctorInfo/:username',
    // path: 'patientAppointment',
    component: DoctorInfoComponent

  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}



