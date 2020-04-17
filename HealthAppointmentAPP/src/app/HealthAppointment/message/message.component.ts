import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//import service
import { MessageService } from '../services/message.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import router
import { Router } from '@angular/router'

//import component
import { Message } from './model/message.model';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})



// **************可爱的小彭来啦**************

// ** import **
// import { DoctorService } from '../../../services/doctor.service'
// import { PatientService } from '../../../services/patient.service'
// import { doctorsData,patientData } from 'src/app/HealthAppointment/healthappoint.model';

// ** constructor **
// constructor(public doctorService: DoctorService, public patientService: PatientService, public routes: ActivatedRoute) {}

// get username
// this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];


// ** list all the doctor **
// this.doctorService.list().subscribe(doctors => {
//   this.doctors = doctors;
// });

// ** get one doctor **
// this.doctorService.get(this.usernameDoctor).subscribe(doctor => {
//   this.currentDoctor = doctor;
// });

// **************可爱的小彭走啦**************

export class MessageComponent implements OnInit {

  @Output() newMessageEmitted = new EventEmitter<Message>();
  namelist: any[] = [
    {
      id: "1d",
      name: "doctor1"
    },
    {
      id: "2d",
      name: "doctor2"
    },
    {
      id: "3d",
      name: "doctor3"
    }
  ];
  messagelist: any[] = [];//all the data in the messages collection
  // messagelist:any[] = [
  //   {
  //     idD: "1d",//id of doctor
  //     idP: "1p",//id of patient
  //     chatlist: [
  //       { id: "1d", content: "content 1." },
  //       { id: "1d", content: "content 2." },
  //       { id: "1d", content: "content 3." },
  //       { id: "1p", content: "content 4." }
  //     ]
  //   },
  //   {
  //     idD: "2d",//id of doctor
  //     idP: "1p",//id of patient
  //     chatlist: [
  //       { id: "2d", content: "content 1." },
  //       { id: "1p", content: "content 2." },
  //       { id: "2d", content: "content 3." },
  //       { id: "1p", content: "content 4." }
  //     ]
  //   },
  //   {
  //     idD: "3d",//id of doctor
  //     idP: "1p",//id of patient
  //     chatlist: [
  //       { id: "3d", content: "content 1." },
  //       { id: "3d", content: "content 2." },
  //       { id: "1p", content: "content 3." },
  //       { id: "3d", content: "content 4." }
  //     ]
  //   }
  // ];

  idTo: string;//message is to the user with idTo
  idFrom: string = "1p";//message is from the user with idFrom
  chatList: any[] = [];//the list only contain the chat content of the user with idFrom
  chatListSmall: any[] = [];//the list contain the chat content between the users with idFrom and idTo
  msg: any = {//new message
    id: this.idFrom,
    content: ""
  }

  //declare services
  constructor(public messageService: MessageService, public http: HttpClient, public router: Router) {
  }

  ngOnInit(): void {
    //get all the messages form messages collection
    this.messageService.list().subscribe((data) => {
      this.messagelist = data;
      console.log("data");
      console.log(this.messagelist);
    })
  }

  //get message list of the selected people in the name list
  getMessageList(id) {
    this.idTo = id;
    // console.log("messagelist");
    // console.log(this.messagelist);
    for (let i = 0; i < this.messagelist.length; i++) {
      if (this.messagelist[i].idD == this.idFrom || this.messagelist[i].idP == this.idFrom) {
        this.chatList.push(this.messagelist[i]);
      }
    }
    // console.log("chatList");
    // console.log(this.chatList);

    for (let i = 0; i < this.messagelist.length; i++) {
      if (this.messagelist[i].idD == this.idTo || this.messagelist[i].idP == this.idTo) {
        this.chatListSmall = this.messagelist[i].chatlist;
      }
    }
    console.log("chatListsamll");
    console.log(this.chatListSmall);
  }

  //add a message
  addMessage() {
    let index;
    for (let i = 0; i < this.messagelist.length; i++) {
      if (this.messagelist[i].idD == this.idTo) {
        this.messagelist[i].chatlist.push(this.msg);
        index = i;
      }
    }
    // console.log("messagelist");
    // console.log(this.messagelist);

    let updatedMessage$: Observable<Message> = this.messageService.updateMessage(this.messagelist[index], this.messagelist[index]._id);
    updatedMessage$.subscribe(updatedmessage => {
      this.newMessageEmitted.emit(updatedmessage);
    });
  }
}
