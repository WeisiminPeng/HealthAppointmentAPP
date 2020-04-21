import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public List: any[] = [];
  public people: any;
  public kindOfUser = '';
  public Username: string;
  public password: any;

  constructor(public route:ActivatedRoute,public http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    const usernameInput = document.getElementById('username');
    usernameInput.onclick = () => {
      if(this.kindOfUser === '') {
        alert('Please choose you are patient or doctor');
     }
    };
  }
sign() {
  if (this.kindOfUser === 'patient'){
  this.http.get('http://localhost:3000/patients/' + this.Username).subscribe((response:any)=>{
    if (response === null) {
      alert('Username doesn"t exist! please go register');
    } else{
    this.people = response;
    if (this.people.Password === this.password) {
          this.router.navigate(['/patientAppointment/' + this.Username]);
        } else {
          alert('password is wrong');
          this.password = '';
        }
      }
  });
} else if (this.kindOfUser === 'doctor') {
  this.http.get('http://localhost:3000/doctors/' + this.Username).subscribe((response:any)=>{
    if (response === null) {
      alert('Username doesn"t exist! please go register');
    } else{
    this.people = response;
    if (this.people.Password === this.password) {
          this.router.navigate(['/doctorSchdule/' + this.Username]);
        } else {
          alert('password is wrong');
          this.password = '';
        }
      }
  });
}
}
back(){
  this.router.navigate(['']);
  // this.router.navigate(['/register']);
}
goReset(){
  this.router.navigate(['/resetPassword']);
}
}
