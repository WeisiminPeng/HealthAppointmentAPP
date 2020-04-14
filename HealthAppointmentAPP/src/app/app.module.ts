import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import {FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent
=======

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';

import { DoctorAppointmentComponent } from './HealthAppointment/home/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorScheduleComponent } from './HealthAppointment/home/doctor/doctor-schedule/doctor-schedule.component';
import { PatientAppointmentComponent } from './HealthAppointment/home/patient/patient-appointment/patient-appointment.component';
import { PatientSidebarComponent } from './HealthAppointment/home/patient/patient-sidebar/patient-sidebar.component';
import { PatientScheduleComponent } from './HealthAppointment/home/patient/patient-schedule/patient-schedule.component';

import { DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { DoctorSidebarComponent } from './HealthAppointment/home/doctor/doctor-sidebar/doctor-sidebar.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { CheckBoxModule, ButtonModule, SwitchModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';


@NgModule({
  declarations: [
    AppComponent,
    DoctorAppointmentComponent,
    DoctorScheduleComponent,
    PatientAppointmentComponent,
    PatientSidebarComponent,
    PatientScheduleComponent,
    DoctorSidebarComponent
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
=======
    SidebarModule,
    DropDownListModule,
    HttpClientModule,
    DialogModule,
    TimePickerModule,
    ButtonModule,
    DatePickerModule,
    ScheduleModule, 
    RecurrenceEditorModule
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
