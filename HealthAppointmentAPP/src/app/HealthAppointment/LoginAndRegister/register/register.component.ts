import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';  //import HTML service
import {Router} from '@angular/router';
// import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public List: any[] = [];
  public kindOfUser: string;
  public Name: string;
  public Username: string;
  public Password: string;
  public sex: string;
  public DateOfBirth: any;
  public phone: number;
  public email: string;
  public address: string;
  public WorkDayList: any[] = [];
  public availableDayList: any[] = [];

  // public WorkDay: any = {
  //     Day: String,
  //     index: Number,
  //     Enable: true,
  //     WorkStartHour: Date,
  //     WorkEndHour: Date,
  //     BreakStartHour: Date,
  //     BreakEndHour: Date,
  //     State: String
  // };

constructor( public http: HttpClient, private router: Router) {}

ngOnInit(): void {
  this.WorkDayList.push(
    new WorkDay('Sunday', 0, true,
    new Date(2018, 1, 3, 8, 0),
    new Date(2018, 1, 3, 17, 0),
    new Date(2018, 1, 3, 12, 0),
    new Date(2018, 1, 3, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Monday', 1, true,
    new Date(2018, 1, 4, 8, 0),
    new Date(2018, 1, 4, 17, 0),
    new Date(2018, 1, 4, 12, 0),
    new Date(2018, 1, 4, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Tuesday', 2, true,
    new Date(2018, 1, 5, 8, 0),
    new Date(2018, 1, 5, 17, 0),
    new Date(2018, 1, 5, 12, 0),
    new Date(2018, 1, 5, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Wednesday', 3, true,
    new Date(2018, 1, 6, 8, 0),
    new Date(2018, 1, 6, 17, 0),
    new Date(2018, 1, 6, 12, 0),
    new Date(2018, 1, 6, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Thursday', 4, true,
    new Date(2018, 1, 7, 8, 0),
    new Date(2018, 1, 7, 17, 0),
    new Date(2018, 1, 7, 12, 0),
    new Date(2018, 1, 7, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Friday', 5, true,
    new Date(2018, 1, 8, 8, 0),
    new Date(2018, 1, 8, 17, 0),
    new Date(2018, 1, 8, 12, 0),
    new Date(2018, 1, 8, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Saturday', 6, true,
    new Date(2018, 1, 9, 8, 0),
    new Date(2018, 1, 9, 17, 0),
    new Date(2018, 1, 9, 12, 0),
    new Date(2018, 1, 9, 13, 0), 'AddBreak'));
  for (let i = 0; i < 7; i++) {
    this.availableDayList.push(i);
  }
  console.log(this.availableDayList);
  console.log(this.WorkDayList);

  }
register(){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    if (this.kindOfUser === 'patient') {
      this.http.get('http://localhost:3000/patients').subscribe((response: any ) => {
        console.log(response);
        this.List = response;
        for(let i = 0; i < this.List.length;i++) {
          if(this.List[i].username === this.Username) {
            alert('Username has existed');
            return;
        }
      }
        let api = 'http://localhost:3000/patients';
        this.http.post(api, {
          'username': this.Username,
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
          if(this.List[i].username=== this.Username){
            alert('Username has existed');
            return;
        }
      }
        let api = 'http://localhost:3000/doctors';
        this.http.post(api,{
              'username': this.Username,
              'Name': this.Name,
              'Gender': this.sex,
              'DOB': this.DateOfBirth,
              'Mobile': this.phone,
              'Email': this.email,
              'Address':this.address,
              'Password':this.Password,
              'WorkDays':this.WorkDayList,
              "AvailableDays":this.availableDayList
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
class WorkDay {
  private day: string;
  private index: number;
  private Enable: boolean;
  private WorkStartHour: Date;
  private WorkEndHour: Date;
  private BreakStartHour: Date;
  private BreakEndHour: Date;
  private State: string;
  constructor( day: string, index: number, Enable: boolean, WorkStartHour: Date,
               WorkEndHour: Date , BreakStartHour: Date, BreakEndHour: Date, State: string) {
      this.day = day;
      this.index = index;
      this.Enable = true;
      this.WorkStartHour = WorkStartHour;
      this.WorkEndHour = WorkEndHour;
      this.BreakStartHour = BreakStartHour;
      this.BreakEndHour = BreakEndHour;
      this.State = State;
    }
}
