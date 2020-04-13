import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service'

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.scss']
})
export class DoctorSidebarComponent implements OnInit {

  public id:string;
  public doctorAppointment:string;
  public doctorSchdule:string;
  // private doctorSchdule1 = '/doctorSchdule';

  constructor(public doctorService: DoctorService, public routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routes.snapshot.paramMap.get('id');
    this.doctorAppointment = '/doctorAppointment/'+this.id;
    this.doctorSchdule = '/doctorSchdule/'+this.id;
    console.log(this.doctorAppointment)
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
