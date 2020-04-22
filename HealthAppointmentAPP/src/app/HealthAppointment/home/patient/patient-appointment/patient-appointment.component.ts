import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
// import { Router } from '@angular/router';
// import { DataService } from '../../../../data.service';
import { DoctorService } from '../../../services/doctor.service'
import { PatientService } from '../../../services/patient.service'
// import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-angular-popups';

import { doctorsData } from 'src/app/HealthAppointment/healthappoint.model';
import { patientData } from 'src/app/HealthAppointment/healthappoint.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss']
})
export class PatientAppointmentComponent implements OnInit {

  public selectedSpecialization: string;
  public selectedDoctors: Array<doctorsData>;
  // public tooltipObj: Tooltip;

  public doctors: Array<doctorsData>;
  public filteredDoctors: Array<doctorsData>;
  public specializationData: string[] = ["General Medicine", "Neurology",
    "Dermatology", "Orthopedics",
    "Diabetology", "Cardiology"];


  public patient: patientData;
  public username: string;
  public DoctorUsername:string;
  public imgURL: any;


  constructor(public doctorService: DoctorService, public patientService: PatientService, public routes: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {

  }



  ngOnInit(): void {
    this.doctorService.list().subscribe(doctors => {
      this.doctors = doctors;
      this.filteredDoctors = this.doctors;
    });

    this.username = this.routes.snapshot.paramMap.get('username');
    this.patientService.get(this.username).subscribe(patient => {
      this.patient = patient;
    });


  }

  // refresh doctor list
  onSpecializationChange(args?: any) {
    if (args && args.value) {
      this.selectedSpecialization = args ? args.itemData.value : this.selectedSpecialization;
      this.selectedDoctors = this.doctors.filter(
        (item: any) => item.Specialization === this.selectedSpecialization);
    } else {
      this.selectedSpecialization = null;
      this.selectedDoctors = this.doctors;
    }
    this.filteredDoctors = this.selectedDoctors;
  }

  // inspect which doctor is selected
  onSpecialistClick(args: any) {
    this.DoctorUsername = args.currentTarget.querySelector('.specialist-item')['id'].split('_')[1];
    this.router.navigateByUrl('/patientDoctorDetail/' + this.username + '_' + this.DoctorUsername);
  }

  getEducation(text: Object) {
    return (<string>text).toUpperCase();
  }

  // getImg(data: any){
  //   console.log(data.Avatar)
  //   this.imgURL = this.sanitizer.bypassSecurityTrustUrl(data.Avatar);
  //   console.log(this.imgURL)
  //   return this.imgURL;
  // }
  getImg(data: any) {
    if (data.Avatar) {
      return this.sanitizer.bypassSecurityTrustUrl(data.Avatar);
    } else {
      var imgurl: string = '../../../../../assets/photo/' + data.username + '.png';
      return imgurl;
    }
  }


}
