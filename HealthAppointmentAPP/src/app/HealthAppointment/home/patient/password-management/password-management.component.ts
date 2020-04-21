import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-management',
  templateUrl: './password-management.component.html',
  styleUrls: ['./password-management.component.scss']
})
export class PasswordManagementComponent implements OnInit {
  public first: string;
  public second = '';
  public newPassword = '';
  public username: string;
  public people: any;
  constructor(public routes:ActivatedRoute,public http:HttpClient,public router:Router) { }

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.http.get('http://localhost:3000/patients/'+ this.username).subscribe((response: any) => {
        this.people = response;
      });
    const firstInput = document.getElementById('first');
    firstInput.onchange = () => {
        if (this.first !== this.people.Password) {
          alert(' You entered the wrong original password');
          this.first = '';
          return;
          }
    };
    const newInput = document.getElementById('new');
    newInput.onchange = () => {
        if (this.second !== this.newPassword) {
          alert('Two passwords are inconsistent');
          this.second = this.newPassword = '';
          return;
        }
    };
  }
  confirm() {
    if (this.second === '' || this.newPassword === '') {
      alert('Empty content, please enter new password!');
    } else {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const api = 'http://localhost:3000/patients/' + this.username;
    this.http.put(api, {
      'Password': this.newPassword
    }, httpOptions).subscribe((response)=>{
      alert('Updated Successfully!');
      this.router.navigate(['/login']);
    });
  }
}
  back(){
    const modal = document.getElementById('modal');
    modal.hidden = true;
  }
}
