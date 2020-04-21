import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-password-management2',
  templateUrl: './password-management2.component.html',
  styleUrls: ['./password-management2.component.scss']
})
export class PasswordManagement2Component implements OnInit {

  public first: string;
  public second = '';
  public newPassword = '';
  public username: string;
  public List: any[] = [];
  public people: any;
  constructor(public routes: ActivatedRoute, public http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.http.get('http://localhost:3000/doctors/' + this.username).subscribe((response: any) => {
      this.people = response;
    });
    const originalPassword = document.getElementById('oriPassword');
    originalPassword.onchange = () => {
      if (this.first !== this.people.Password) {
        alert(' You entered the wrong original password');
        this.first = '';
      }
     };
    const conPassword = document.getElementById('confirm');
    conPassword.onchange = () => {
      if (this.second !== this.newPassword) {
        alert('Two passwords are inconsistent');
        this.second = this.newPassword = '';
        return;
      }
    };
  }
    confirm() {
      if (this.second === '' || this.newPassword === ''){
        alert ('empty content,please enter new password!');
      } else {
        console.log(this.second);
        console.log(this.newPassword);
        const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let api = 'http://localhost:3000/doctors/' + this.people.username;
        this.http.put(api, {
        'Password': this.newPassword
      }, httpOptions).subscribe((response) => {
        console.log(response);
        alert('Updated Successfully!');
        this.router.navigate(['/login']);
      })
    }
    }
    back(){
      const modal = document.getElementById('cgpassword');
      modal.hidden = true;
    }
}
