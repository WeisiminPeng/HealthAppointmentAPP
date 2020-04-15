import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import { MainComponent } from './HealthAppointment/LoginAndRegister/main/main.component';
import { LoginComponent } from './HealthAppointment/LoginAndRegister/login/login.component';
import { RegisterComponent } from './HealthAppointment/LoginAndRegister/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorAppointmentComponent } from './HealthAppointment/home/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorScheduleComponent } from './HealthAppointment/home/doctor/doctor-schedule/doctor-schedule.component';
import { PatientAppointmentComponent } from './HealthAppointment/home/patient/patient-appointment/patient-appointment.component';
import { PatientSidebarComponent } from './HealthAppointment/home/patient/patient-sidebar/patient-sidebar.component';
import { PatientScheduleComponent } from './HealthAppointment/home/patient/patient-schedule/patient-schedule.component';
import { RouterModule } from '@angular/router';
import { DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { DoctorSidebarComponent } from './HealthAppointment/home/doctor/doctor-sidebar/doctor-sidebar.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DatePickerModule, TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { CheckBoxModule, ButtonModule, SwitchModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DoctorDetailComponent } from './HealthAppointment/home/patient/doctor-detail/doctor-detail.component';
import { PatientInfoComponent } from './HealthAppointment/home/patient/patient-info/patient-info.component';
import { DoctorInfoComponent } from './HealthAppointment/home/doctor/doctor-info/doctor-info.component';
import { PasswordManagementComponent } from './HealthAppointment/home/patient/password-management/password-management.component';
import { PasswordManagement2Component  } from './HealthAppointment/home/doctor/password-management2/password-management2.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    DoctorAppointmentComponent,
    DoctorScheduleComponent,
    PatientAppointmentComponent,
    PatientSidebarComponent,
    PatientScheduleComponent,
    DoctorSidebarComponent,
    DoctorDetailComponent,
    PatientInfoComponent,
    DoctorInfoComponent,
    PasswordManagementComponent,
    PasswordManagement2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SidebarModule,
    DropDownListModule,
    HttpClientModule,
    DialogModule,
    TimePickerModule,
    ButtonModule,
    DatePickerModule,
    ScheduleModule,
    RecurrenceEditorModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
