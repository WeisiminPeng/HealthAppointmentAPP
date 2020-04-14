import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

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

  @ViewChild('sidebar') 
  public sidebar: SidebarComponent;
  public isOpen: boolean = true;
  public closeOnDocumentClick: boolean = true;
  public type: string = 'Push';

  constructor(public patientService: PatientService, public routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.patientAppointment = '/patientAppointment/'+this.username;
    this.patientSchdule = '/patientSchdule/'+this.username;
    // console.log(this.doctorAppointment)
  }

  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
}

showSidebar():void{
 this.sidebar.show();
}

  onItemClick(args: any) {
  
    const elements: HTMLElement[] = args.currentTarget.parentElement.querySelectorAll('.active-item');
    elements.forEach(element => {
      if (element.classList.contains('active-item')) { element.classList.remove('active-item'); }
    });
    args.currentTarget.classList.add('active-item');
  }

}
