import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public List:any[] = [];
  public kindOfUser: string;
  public Username: string;
  public password: any;

  constructor(public route:ActivatedRoute,public http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
sign(){
  if(this.kindOfUser==='patient'){
  this.http.get('http://localhost:3000/patients').subscribe((response:any)=>{
    console.log(response);
    this.List = response;
    for(let i = 0; i < this.List.length;i++){
      if(this.List[i].username=== this.Username){
        if(this.List[i].Password=== this.password){
          this.router.navigate(['/patientAppointment/'+ this.Username]);
        }else{
          alert("password is wrong");
        }
        return;
      }
    }
    alert("Username doesn't exist! please go register");


  });
}else if (this.kindOfUser==='doctor'){
  this.http.get('http://localhost:3000/doctors').subscribe((response:any)=>{
    console.log(response);
    this.List = response;
    for(let i = 0; i < this.List.length;i++){
      if(this.List[i].username=== this.Username){
        if(this.List[i].Password=== this.password){
          this.router.navigate(['/doctorSchdule/'+this.Username]);
        }else{
          alert("password is wrong");
        }
        return;
      }
    }
    alert("Username doesn't exist! please go register");
  });
}
}
back(){
  this.router.navigate(['']);
  // this.router.navigate(['/register']);
}
}
