import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service'
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent} from "@syncfusion/ej2-angular-buttons";

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.scss']
})
export class DoctorSidebarComponent implements OnInit {

  public username:string;
  public doctorAppointment:string;
  public doctorSchdule:string;
  // private doctorSchdule1 = '/doctorSchdule';

  @ViewChild('sidebar') 
  public sidebar: SidebarComponent;
  public isOpen: boolean = true;
  public closeOnDocumentClick: boolean = true;
  public type: string = 'Push';

  constructor(public doctorService: DoctorService, public routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username');
    this.doctorAppointment = '/doctorAppointment/'+this.username;
    this.doctorSchdule = '/doctorSchdule/'+this.username;
    console.log(this.doctorAppointment)
  }

  public onCreated(args: any) {
       this.sidebar.element.style.visibility = '';
  }

  showSidebar():void{
    this.sidebar.show();
  }

  // onItemClick(args: any) {
  //   // if (Browser.isDevice) {
  //   //   this.sideBar.hide();
  //   // }
  //   const elements: HTMLElement[] = args.currentTarget.parentElement.querySelectorAll('.active-item');
  //   elements.forEach(element => {
  //     if (element.classList.contains('active-item')) { element.classList.remove('active-item'); }
  //   });
  //   args.currentTarget.classList.add('active-item');
  // }

}
