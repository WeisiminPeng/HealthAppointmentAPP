import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public Username = '';
  public phone = '';
  public email = '';
  public second = '';
  public newPassword = '';
  public DateOfBirth: Date;
  public people: any;
  public kindOfUser = '';
  // ,private datepipe: DatePipe
  constructor(private router: Router, private http: HttpClient) { }
  // , private datepipe: DatePipe
  ngOnInit(): void {
    const userName = document.getElementById('user');
    userName.onclick = () => {
      if (this.kindOfUser === '') {
        alert('Please choose you are patient or doctor!');
      }
    };
    userName.onchange = () => {

      this.http.get('http://localhost:3000/' + this.kindOfUser + '/' + this.Username).subscribe((response: any)=>{
        if (response === null) {
          alert('Username doesn"t exist!');
          this.Username = '';
        } else {
          this.people = response;

        }
      });
    };
    // const dob = document.getElementById('dob');
    // dob.onclick = () => {
    //   if (this.Username === '') {
    //     alert('Please enter your username!');
    //   }
    // }
  }
  confirm() {

    // if (this.datepipe.transform(this.DateOfBirth, 'yyyy-MM-dd') !== this.people.DOB ) {
    //     alert('Date of Birth is wrong!');
    //     return;
    // } else
    if(this.phone !== this.people.Mobile) {
        alert('phone is wrong!');
        return;
    } else if(this.email !== this.people.Email){
        alert('email is wrong!');
    } else if (this.second === '' || this.newPassword === '' || this.second !== this.newPassword) {
      alert('New password is empty or two new password you entered are not the same, please reenter!');
      return;
    } else {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const api = 'http://localhost:3000/' + this.kindOfUser + '/' + this.Username;
    this.http.put(api, {
      'Password': this.newPassword
    }, httpOptions).subscribe((response)=>{
      alert('Reset successfully! please remember your new password ');
      this.router.navigate(['/login']);
    });
  }
}
  back(){
    this.router.navigate(['/login']);
  }
}
