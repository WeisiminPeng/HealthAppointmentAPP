import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentPatientComponent } from './HealthAppiontment/appointment-patient/appointment-patient.component';
import { AppointmentDoctortComponent } from './HealthAppiontment/appointment-doctort/appointment-doctort.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentPatientComponent,
    AppointmentDoctortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
