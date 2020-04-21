import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.scss']
})
export class DoctorInfoComponent implements OnInit {
  public name = '';
  public mobile = '';
  public email = '';
  public dob = '';
  public address = '';
  public speciality = '';
  public Experience = '';
  public people: any;
  public username: string;
  imgURL: any;
  constructor(public routes: ActivatedRoute, public http: HttpClient, public router: Router, private sanitizer: DomSanitizer) { }

  // ngOnInit(): void {
  //
  //   this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
  //   this.http.get('http://localhost:3000/patients/' + this.username).subscribe((response: any) => {
  //     this.people = response;
  //     this.name = this.people.Name;
  //     this.dob = this.people.DOB;
  //     this.phone = this.people.Mobile;
  //     this.address = this.people.Address;
  //     this.email = this.people.Email;
  //   });
  //   // for(let i = 0 ; i < this.List.length;i++){
  //   // if(this.List[i].username === this.username){
  //
  // }
  // update() {
  //   const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  //   const api ='http://localhost:3000/patients/'+this.people.username;
  //   this.http.put(api,{
  //     "Name": this.people.Name,
  //     "Mobile": this.people.Mobile,
  //     "Address":this.people.Address,
  //     "Email":this.people.Email
  //   }, httpOptions).subscribe((response)=>{
  //     console.log(response);
  //     alert("Updated Successfully!")
  //   })
  // }
  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.http.get('http://localhost:3000/doctors/' + this.username).subscribe((response:any)=>{
      this.people = response;
      this.name = this.people.Name;
      this.mobile = this.people.Mobile;
      this.email = this.people.Email;
      this.dob = this.people.DOB;
      this.address = this.people.Address;
      this.speciality = this.people.Specialization;
      this.Experience = this.people.Experience;
      console.log(this.people.Address);
      this.http.get('http://localhost:3000/doctors/' + this.username).subscribe((response:any)=>{
        this.people = response;
        console.log(this.people.Avatar);

        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.people.Avatar);
        console.log(this.imgURL)

      // }
      });
    });
  }
  update() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    // let id=this.people._id;
    // '/patients/:username'
    let api='http://localhost:3000/doctors/'+this.people.username;
    this.http.put(api,{
      "Name": this.people.Name,
      "Mobile": this.people.Mobile,
      "Address":this.people.Address,
      "Email":this.people.Email
    }, httpOptions).subscribe((response)=>{
      console.log(response);
      alert('Updated Successfully!')
    });
  }
  changePassword(){
    const modal = document.getElementById('cgpassword');
    modal.hidden = false;
  }
}
