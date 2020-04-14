import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
// import { Router } from '@angular/router';
// import { DataService } from '../../../../data.service';
import { DoctorService } from '../../../services/doctor.service'
import { PatientService } from '../../../services/patient.service'
// import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-angular-popups';

import { doctorsData } from 'src/app/HealthAppointment/healthappoint.model';
import { patientData } from 'src/app/HealthAppointment/healthappoint.model';

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
  public specializationData: string[] = ["General Medicine", "Neurology"];

  public patient: patientData;
  public username: string;


  constructor(public doctorService: DoctorService, public patientService: PatientService, public routes: ActivatedRoute) {
    // this.doctorsData = this.filteredDoctors = this.dataService.getDoctorsData();
    // this.activeDoctorData = this.doctorsData[0];
    // this.specializationData = this.dataService.specialistData;

  }



  ngOnInit(): void {
    this.doctorService.list().subscribe(doctors => {
      this.doctors = doctors;
      this.filteredDoctors = this.doctors;
    });

    this.username = this.routes.snapshot.paramMap.get('username');
    // this.id = +this.route.snapshot.params.id;
    // console.log(this.routes.snapshot.paramMap.get('username'));
    // console.log(this.id);
    this.patientService.get(this.username).subscribe(patient => {
      this.patient = patient;
      console.log(this.patient);
    });


  }

  onSpecializationChange(args?: any) {

    // let filteredData: { [key: string]: Object }[];
    if (args && args.value) {
      this.selectedSpecialization = args ? args.itemData.value : this.selectedSpecialization;
      console.log(this.selectedSpecialization)
      this.selectedDoctors = this.doctors.filter(
        (item: any) => item.Specialization === this.selectedSpecialization);
    } else {
      this.selectedSpecialization = null;
      this.selectedDoctors = this.doctors;
    }
    this.filteredDoctors = this.selectedDoctors;
  }

  onSpecialistClick(args: any) {
    //   this.tooltipObj.close();
    //   const specialistId: string = args.currentTarget.querySelector('.specialist-item')['id'].split('_')[1];
    //   const filteredData: Object[] = this.doctorsData.filter(
    //     (item: any) => item.Id === parseInt(specialistId as string, 10));
    //   this.dataService.setActiveDoctorData(<{ [key: string]: Object }>filteredData[0]);
    //   this.router.navigateByUrl('/doctor-details/' + specialistId);
  }

  getEducation(text: Object) {
    return (<string>text).toUpperCase();
  }



}
