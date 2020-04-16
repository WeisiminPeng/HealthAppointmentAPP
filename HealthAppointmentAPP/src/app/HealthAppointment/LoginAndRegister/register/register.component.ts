import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // import HTML service
import {Router} from '@angular/router';
// import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public List: any[] = [];
  public kindOfUser = '';
  public Name: string;
  public Username: string;
  public Password: string;
  public sex: string;
  public DateOfBirth: any;
  public phone = 'xxx-xxx-xxxx';
  public email = 'xxxx@xxxx.xxx';
  public address = '';
  public WorkDayList: any[] = [];
  public availableDayList: any[] = [];
  public Specialization: string;
  public Experience: string;


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
  const emailInput = document.getElementById('email') as HTMLInputElement;
  emailInput.onclick = () => {
    console.log(this.email);
    this.email = '';
  };
  emailInput.onchange = () => {

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailInput.value.match(mailformat)) {
      emailInput.value = '';
      alert('You have entered an invalid email address!');
    } else {
      console.log('right email');
      console.log(emailInput.value);
    }
  };
  const nameInput = document.getElementById('name');
  nameInput.onclick = () => {
    if (this.kindOfUser === '') {
      alert('Please choose you are patient or doctor');
   }
  };
  const phone = document.getElementById('phone') as HTMLInputElement;
  phone.onclick = () => {
    this.phone = '';
  };
  phone.onchange = () => {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if ((!phone.value.match(phoneno))) {
        phone.value = '';
        alert('You have entered an invalid phone number!');
    } else {
      console.log('right number!');
    }
  };

  }
register() {
  const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  if (this.kindOfUser === 'patient') {
      this.http.get('http://localhost:3000/patients').subscribe((response: any ) => {
        console.log(response);
        this.List = response;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.List.length; i++) {
          if (this.List[i].username === this.Username) {
            alert('Username has existed');
            return;
        }
      }
        const api = 'http://localhost:3000/patients';
        this.http.post(api, {
          username: this.Username,
          Name: this.Name,
          Gender: this.sex,
          DOB: this.DateOfBirth,
          Mobile: this.phone,
          Email: this.email,
          Address: this.address,
          Password: this.Password
    // tslint:disable-next-line: no-shadowed-variable
    }, httpOptions).subscribe((response) => {
      console.log(response);
      alert('Register successfully!');
      this.router.navigate(['/login']);
    });
      });
    } else if (this.kindOfUser === 'doctor') {
      const select1 = document.getElementById('select1') as HTMLSelectElement;
      const index1 = select1.selectedIndex;
      const value1 = select1.options[index1].text;
      this.Specialization = value1;
      const select2 = document.getElementById('select2') as HTMLSelectElement;
      const index2 = select2.selectedIndex;
      const value2 = select2.options[index2].text;
      this.Experience = value2;
      this.http.get('http://localhost:3000/doctors').subscribe((response: any) => {
        console.log(response);
        this.List = response;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.List.length; i++ ) {
          if (this.List[i].username === this.Username) {
            alert('Username has existed');
            return;
        }
      }
        const api = 'http://localhost:3000/doctors';
        this.http.post(api, {
              username: this.Username,
              Name: this.Name,
              Gender: this.sex,
              DOB: this.DateOfBirth,
              Mobile: this.phone,
              Email: this.email,
              Address: this.address,
              Password: this.Password,
              WorkDays: this.WorkDayList,
              AvailableDays: this.availableDayList,
              Specialization: this.Specialization,
              Experience: this.Experience
          // tslint:disable-next-line:no-shadowed-variable
              }, httpOptions).subscribe((response) => {
              console.log(response);
              alert('Register successfully!');
              this.router.navigate(['/login']);
              });

      });
      }
  }
back() {
    this.router.navigate(['']);
    // this.router.navigate(['/register']);
  }

AddOption() {
  const optionDiv = document.getElementById('newDiv');
  if (optionDiv === null) {
  const newDiv = document.createElement('div');
  const newTr = document.createElement('tr');
  const newTr2 = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.innerHTML = 'Specialization:';
  const td2 = document.createElement('td');
  td2.innerHTML = 'Experience:';
  const select1 = document.createElement('select');
  select1.id = 'select1';
  const option1 = document.createElement('option');
  option1.innerHTML = 'General Medicine';
  const option2 = document.createElement('option');
  option2.innerHTML = 'Neurology';
  const option3 = document.createElement('option');
  option3.innerHTML = 'Dermatology';
  const option4 = document.createElement('option');
  option4.innerHTML = 'Orthopedics';
  const option5 = document.createElement('option');
  option5.innerHTML = 'Diabetology';
  const option6 = document.createElement('option');
  option6.innerHTML = 'Cardiology';
  select1.appendChild(option1);
  select1.appendChild(option2);
  select1.appendChild(option3);
  select1.appendChild(option4);
  select1.appendChild(option5);
  select1.appendChild(option6);
  newTr.appendChild(td1);
  newTr.appendChild(select1);
  const option7 = document.createElement('option');
  option7.innerHTML = '1-3 years';
  const option8 = document.createElement('option');
  option8.innerHTML = '4-6 years';
  const option9 = document.createElement('option');
  option9.innerHTML = '7-9 years';
  const option10 = document.createElement('option');
  option10.innerHTML = '9-11 years';
  const option11 = document.createElement('option');
  option11.innerHTML = '11+ years';

  const select2 = document.createElement('select');
  select2.id = 'select2';
  select2.appendChild(option7);
  select2.appendChild(option8);
  select2.appendChild(option9);
  select2.appendChild(option10);
  select2.appendChild(option11);
  newTr2.appendChild(td2);
  newTr2.appendChild(select2);
  newDiv.appendChild(newTr);
  newDiv.appendChild(newTr2);
  newDiv.style.cssText = 'text-align: center;';
  newDiv.id = 'newDiv';
  const body = document.getElementById('registerBody');
  body.insertBefore(newDiv, body.childNodes[body.childNodes.length - 1]);
  } else {
    return;
  }
}
DeleteOption() {
  const body = document.getElementById('registerBody');
  const newdiv = document.getElementById('newDiv');
  if (newdiv != null) {
    body.removeChild(newdiv);
 }
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
