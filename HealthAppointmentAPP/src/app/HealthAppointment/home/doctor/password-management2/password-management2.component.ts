import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-password-management2',
  templateUrl: './password-management2.component.html',
  styleUrls: ['./password-management2.component.scss']
})
export class PasswordManagement2Component implements OnInit {

  public first: string;
  public second: string;
  public newPassword: string;
  public username: string;
  public List:any[] = [];
  public people:any;
  constructor(public routes:ActivatedRoute,public http:HttpClient,public router:Router) { }

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
  }
  check() : boolean{
    this.http.get('http://localhost:3000/doctors').subscribe((response:any)=>{
      console.log(response);
      this.List = response;
      for(let i = 0 ; i < this.List.length;i++){
        if(this.List[i].username === this.username){
          this.people = this.List[i];
          return;
        }
      }
    });
    if(this.first === this.people.Password && this.second === this.people.Password){
        alert('Two password input is consistent');
        return true;
      }else{
        alert('Two passwords are inconsistent, please check and re-enter');
        return false;
      }
    }
    confirm(){
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
      // let id=this.people._id;
      // '/patients/:username'
      let api='http://localhost:3000/doctors/'+this.people.username;
      this.http.put(api,{

        "Password":this.newPassword
      }, httpOptions).subscribe((response)=>{
        console.log(response);
        alert("Updated Successfully!");
        this.router.navigate(['/login']);
      })
    }
}
