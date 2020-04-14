import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.scss']
})
export class DoctorInfoComponent implements OnInit {
  public List:any[] = [];
  public people:any;
  public username:string;
  constructor(public routes:ActivatedRoute,public http:HttpClient,public router:Router) { }

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
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
  }
  update(){
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
      alert("Updated Successfully!")
    })
  }
  changePassword(){
    this.router.navigate(['/changePassword2/'+ this.people.username]);
  }
}
