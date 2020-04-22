import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // import HTML service
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

// import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DatePipe]
})

export class RegisterComponent implements OnInit {
  imgURL: any = '';
  public List: any[] = [];
  public kindOfUser = '';
  public Name = '';
  public Username = '';
  public Password = '';
  public sex = '';
  public DateOfBirth: Date;
  public phone = '';
  public email = '';
  public address = '';
  public WorkDayList: any[] = [];
  public availableDayList: any[] = [];
  public Specialization: string;
  public Experience: string;


constructor( public http: HttpClient, private router: Router, private datepipe: DatePipe) {}

ngOnInit(): void {
  this.WorkDayList.push(
    new WorkDay('Sunday', 0, true,
    new Date(2018, 1, 4, 8, 0),
    new Date(2018, 1, 4, 17, 0),
    new Date(2018, 1, 4, 12, 0),
    new Date(2018, 1, 4, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Monday', 1, true,
    new Date(2018, 1, 5, 8, 0),
    new Date(2018, 1, 5, 17, 0),
    new Date(2018, 1, 5, 12, 0),
    new Date(2018, 1, 5, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Tuesday', 2, true,
    new Date(2018, 1, 6, 8, 0),
    new Date(2018, 1, 6, 17, 0),
    new Date(2018, 1, 6, 12, 0),
    new Date(2018, 1, 6, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Wednesday', 3, true,
    new Date(2018, 1, 7, 8, 0),
    new Date(2018, 1, 7, 17, 0),
    new Date(2018, 1, 7, 12, 0),
    new Date(2018, 1, 7, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Thursday', 4, true,
    new Date(2018, 1, 8, 8, 0),
    new Date(2018, 1, 8, 17, 0),
    new Date(2018, 1, 8, 12, 0),
    new Date(2018, 1, 8, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Friday', 5, true,
    new Date(2018, 1, 9, 8, 0),
    new Date(2018, 1, 9, 17, 0),
    new Date(2018, 1, 9, 12, 0),
    new Date(2018, 1, 9, 13, 0), 'AddBreak'));

  this.WorkDayList.push(
    new WorkDay('Saturday', 6, true,
    new Date(2018, 1, 10, 8, 0),
    new Date(2018, 1, 10, 17, 0),
    new Date(2018, 1, 10, 12, 0),
    new Date(2018, 1, 10, 13, 0), 'AddBreak'));
  for (let i = 0; i < 7; i++) {
    this.availableDayList.push(i);
  }

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

    }
  };
  // const nameInput = document.getElementById('name');
  // nameInput.onclick = () => {
  //   if (this.kindOfUser === '') {
  //     alert('Please choose you are patient or doctor');
  //  }
  // };
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
  const genderSelect = document.getElementById('genderSelect') as HTMLSelectElement;
  const index3 = genderSelect.selectedIndex;
  const value3 = genderSelect.options[index3].text;
  this.sex = value3;
  if (this.kindOfUser === '') {
      alert('Please choose you are patient or doctor');
      return;
   } else if (this.Name === '') {
    alert('Please input your name!');
    return;
   } else if (this.sex === '-- select --') {
    alert('Please choose your gender!');
    return;
   } else if (this.email === '') {
    alert('Please input your email!');
    return;
   } else if (this.Username === '') {
    alert('Please input your Username!');
    return;
   } else if (this.Password === '') {
    alert('Please input your Password!');
    return;
   }

  console.log(this.sex);
  const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  if (this.kindOfUser === 'patient') {
      this.http.get('http://localhost:3000/patients').subscribe((response: any ) => {
        // console.log(response);
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
          DOB: this.datepipe.transform(this.DateOfBirth, 'yyyy-MM-dd'),
          Mobile: this.phone,
          Email: this.email,
          Address: this.address,
          Password: this.Password
    // tslint:disable-next-line: no-shadowed-variable
    }, httpOptions).subscribe((response) => {
      // console.log(response);
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
        // console.log(response);
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
              // console.log(response);
              alert('Register successfully!');
              this.router.navigate(['/login']);
              // this.router.navigate(['/' + this.Username +'/upload']);
              });
      });
      }
  }

back() {
    this.router.navigate(['']);
    // this.router.navigate(['/register']);
  }

AddOption() {
  // document.getElementById('regisBtn').innerHTML = 'Set Profile Pic';
  const optionTr = document.getElementById('newTr');
  if (optionTr !== null) {
    return;
  } else {
    // const newDiv = document.createElement('div');
    // initialize Specialization
    const newTr = document.createElement('tr');
    const td1 = document.createElement('td');
    // <option value="none" selected disabled hidden>-- select --</option>
    const placeholder = document.createElement('option');
    placeholder.value = 'none';
    placeholder.selected = true;
    placeholder.disabled = true;
    placeholder.hidden = true;
    placeholder.innerHTML = '-- select --';
    td1.innerHTML = 'Speciality:';
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
    const placeholder1 = document.createElement('option');
    placeholder1.value = 'none';
    placeholder1.selected = true;
    placeholder1.disabled = true;
    placeholder1.hidden = true;
    placeholder1.innerHTML = '-- select --';
    select1.appendChild(placeholder1);
    select1.appendChild(option1);
    select1.appendChild(option2);
    select1.appendChild(option3);
    select1.appendChild(option4);
    select1.appendChild(option5);
    select1.appendChild(option6);
    newTr.appendChild(td1);
    newTr.appendChild(select1);
    // initialize Experience
    const newTr2 = document.createElement('tr');
    const td2 = document.createElement('td');
    td2.innerHTML = 'Experience:';
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
    select2.appendChild(placeholder);
    select2.appendChild(option7);
    select2.appendChild(option8);
    select2.appendChild(option9);
    select2.appendChild(option10);
    select2.appendChild(option11);
    newTr2.appendChild(td2);
    newTr2.appendChild(select2);
    select2.style.cssText = 'border: 1px solid #ccc;\n' +
      '  appearance:none;\n' +
      '  -moz-appearance:none;\n' +
      '  -webkit-appearance:none;\n' +
      '  width: 178px;\n' +
      '  height: 25px;\n' +
      '  padding-left: 5px;';
    select1.style.cssText = 'border: 1px solid #ccc;\n' +
      '  appearance:none;\n' +
      '  -moz-appearance:none;\n' +
      '  -webkit-appearance:none;\n' +
      '  width: 178px;\n' +
      '  height: 25px;\n' +
      '  padding-left: 5px;';
    td1.style.cssText = 'font-size: 15px';
    td2.style.cssText = 'font-size: 15px';
    newTr.id = 'newTr';
    newTr2.id = 'newTr2';
    // newDiv.id = 'newDiv';
    const body = document.getElementById('registerBody');
    body.insertBefore(newTr, body.childNodes[body.childNodes.length - 1]);
    body.insertBefore(newTr2, body.childNodes[body.childNodes.length - 1]);
  }
}
DeleteOption() {
  document.getElementById('regisBtn').innerHTML = 'Register';
  const body = document.getElementById('registerBody');
  const newTr = document.getElementById('newTr');
  const newTr2 = document.getElementById('newTr2');
  if (newTr != null) {
    body.removeChild(newTr);
    body.removeChild(newTr2);
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
