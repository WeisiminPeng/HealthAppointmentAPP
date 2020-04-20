import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {
  public people: any;
  public name = '';
  public dob = '';
  public phone = '';
  public email = '';
  public address = '';
  public username: string;
  constructor(public routes: ActivatedRoute, public http: HttpClient, public router: Router) { }

  ngOnInit(): void {

      this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
      this.http.get('http://localhost:3000/patients/' + this.username).subscribe((response: any) => {
        this.people = response;
        this.name = this.people.Name;
        this.dob = this.people.DOB;
        this.phone = this.people.Mobile;
        this.address = this.people.Address;
        this.email = this.people.Email;
      });
      // for(let i = 0 ; i < this.List.length;i++){
          // if(this.List[i].username === this.username){

  }
  update() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const api ='http://localhost:3000/patients/'+this.people.username;
    this.http.put(api,{
      "Name": this.people.Name,
      "Mobile": this.people.Mobile,
      "Address":this.people.Address,
      "Email":this.people.Email
    }, httpOptions).subscribe((response)=>{
      console.log(response);
      alert("Updated Successfully!")
    })
  }
  changePassword() {
    const modal = document.getElementById('modal');
    modal.hidden = false;
  }
}
