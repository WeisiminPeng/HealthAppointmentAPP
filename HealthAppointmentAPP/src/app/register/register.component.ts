import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';  //import HTML service
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public List:any[] = [];
  public kindOfUser: string;
  public Name: string;
  public Username: string;
  public Password: string;
  public sex: string;
  public DateOfBirth: any;
  public phone: number;
  public email: string;
  public address: string;



  constructor( public http: HttpClient,private router: Router) {}

  ngOnInit(): void {
  }
  register(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    if (this.kindOfUser === 'patient') {
      this.http.get('http://localhost:3000/patients').subscribe((response:any)=>{
        console.log(response);
        this.List = response;
        for(let i = 0; i < this.List.length;i++){
          if(this.List[i].Username=== this.Username){
            alert('Username has existed');
            return;
        }
      }
        let api = 'http://localhost:3000/patients';
        this.http.post(api,{
          'Username': this.Username,
          'Name': this.Name,
          'Gender': this.sex,
          'DOB': this.DateOfBirth,
          'Mobile': this.phone,
          'Email': this.email,
          'Address': this.address,
          'Password': this.Password
    // tslint:disable-next-line: no-shadowed-variable
    }, httpOptions).subscribe((response) => {
      console.log(response);
      alert('Register successfully!');
      this.router.navigate(['/login']);
    });
      });
    } else if (this.kindOfUser === 'doctor') {
      this.http.get('http://localhost:3000/doctors').subscribe((response:any)=>{
        console.log(response);
        this.List = response;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.List.length; i++ ) {
          if(this.List[i].Username=== this.Username){
            alert('Username has existed');
            return;
        }
      }
        let api = 'http://localhost:3000/doctors';
        this.http.post(api,{
              'Username': this.Username,
              'Name': this.Name,
              'Gender': this.sex,
              'DOB': this.DateOfBirth,
              'Mobile': this.phone,
              'Email': this.email,
              'Address':this.address,
              'Password':this.Password
              },httpOptions).subscribe((response)=>{
              console.log(response);
              alert('Register successfully!');
              this.router.navigate(['/login']);
              })

      });
      }
  }
  back(){
    this.router.navigate(['']);
    // this.router.navigate(['/register']);
  }
}
