import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from '../../../services/patient.service'

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html',
  styleUrls: ['./patient-sidebar.component.scss']
})
export class PatientSidebarComponent implements OnInit {

  public username:string;
  public patientAppointment:string;
  public patientSchdule:string;

  constructor(public patientService: PatientService, public routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username');
    this.patientAppointment = '/doctorAppointment/'+this.username;
    this.patientSchdule = '/doctorSchdule/'+this.username;
    // console.log(this.doctorAppointment)
  }

  onItemClick(args: any) {
  
    const elements: HTMLElement[] = args.currentTarget.parentElement.querySelectorAll('.active-item');
    elements.forEach(element => {
      if (element.classList.contains('active-item')) { element.classList.remove('active-item'); }
    });
    args.currentTarget.classList.add('active-item');
  }

}
