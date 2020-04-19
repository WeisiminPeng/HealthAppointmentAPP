import { Component, OnInit, Output, EventEmitter, ViewChild, ɵɵNgOnChangesFeature } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


//import service
import { MessageService } from '../services/message.service';
import { AppointmentService } from '../services/appointment.service';

//import model
import { Message } from './model/message.model';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import router
import { Router } from '@angular/router'

//import component
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {

  // sidebar variables
  @ViewChild('sidebar')
  public sidebar: SidebarComponent;
  public isOpen: boolean = true;
  public closeOnDocumentClick: boolean = true;
  public type: string = 'Push';

  public username: string;
  public sidebarOneJump: string;
  public sidebarTwoJump: string;
  public Info: string;
  public sidebarOne: string;
  public sidebarTwo: string;
  public Message: string;
  public SignOut: string = '';
  public personTell: string;
  // sidebar variables done!

  @Output() newMessageEmitted = new EventEmitter<Message>();
  appointmentlist: any[] = [];
  usernamelist: any[] = [];
  namelist: any[] = [];

  messageAll: any[] = [];

  usernameTo: string;//message is to the user with usernameTo
  usernameFrom: string = "";//message is from the user with usernameFrom
  role: string = "";//the role of this user
  chatList: any[] = [];//the list only contain the chat content of the user with idFrom
  chatListSmall: any[] = [];//the list contain the chat content between the users with idFrom and idTo
  msg: any = {//new message
    usernameMsg: "",
    content: ""
  }

  //declare services
  constructor(public messageService: MessageService, public appointmentService: AppointmentService, public http: HttpClient, public router: Router, public routes: ActivatedRoute) {
  }

  ngOnInit(): void {
    // sidebar jump control
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.personTell = this.routes.snapshot.paramMap.get('username').split('_')[1];
    if (this.personTell == 'patient') {
      this.sidebarOne = "My Appointment";
      this.sidebarTwo = "Make Appointment";
      this.sidebarTwoJump = '/patientAppointment/' + this.username;
      this.sidebarOneJump = '/patientSchdule/' + this.username;
      this.Info = '/patientInfo/' + this.username;
      this.Message = '/messages/' + this.username + '_patient';
    } else {
      this.sidebarOne = "My Schdule";
      this.sidebarTwo = "Work Time";
      this.sidebarTwoJump = '/doctorAppointment/' + this.username;
      this.sidebarOneJump = '/doctorSchdule/' + this.username;
      this.Info = '/doctorInfo/' + this.username;
      this.Message = '/messages/' + this.username + '_doctor';
    }
    // sidebar jump control done!

    //get all the messages form messages collection
    this.messageService.list().subscribe((data) => {
      this.messageAll = data;
      console.log("messageAll");
      console.log(this.messageAll);
    });

    //get usernameFrom
    this.routes.params.subscribe((data) => {
      // console.log(data.username);
      this.usernameFrom = data.username.split('_')[0];
      this.role = data.username.split('_')[1];
      this.msg.usernameMsg = this.usernameFrom;
      // console.log("msg");
      // console.log(this.msg);
      // console.log(this.usernameFrom);
      // console.log(this.role);
    });

    this.appointmentService.get(this.usernameFrom).subscribe((data) => {
      //get the appointment list of this user
      this.appointmentlist = data;

      //get the namelist data
      if (this.role == "patient") {
        console.log("doctor namelist");
        for (let i = 0; i < this.appointmentlist.length; i++) {
          if (this.appointmentlist[i].PatientUsername == this.usernameFrom) {
            if (this.usernamelist.indexOf(this.appointmentlist[i].DoctorUsername) == -1) {
              this.usernamelist.push(this.appointmentlist[i].DoctorUsername);
              this.namelist.push({ name: this.appointmentlist[i].DoctorName, username: this.appointmentlist[i].DoctorUsername });
            }
          }
        }
      } else if (this.role == "doctor") {
        console.log("doctor namelist");
        console.log("appointmentlist");
        console.log(this.appointmentlist);
        for (let i = 0; i < this.appointmentlist.length; i++) {
          if (this.appointmentlist[i].DoctorUsername == this.usernameFrom) {
            let patientUsername: string = this.appointmentlist[i].PatientUsername;
            // console.log(this.namelist.indexOf(patientUsername));
            if (this.usernamelist.indexOf(patientUsername) == -1) {
              this.usernamelist.push(this.appointmentlist[i].PatientUsername);
              this.namelist.push({ name: this.appointmentlist[i].PatientName, username: this.appointmentlist[i].PatientUsername });
            }
          }
        }
      }
      console.log("usernamelist+namelist");
      console.log(this.usernamelist);
      console.log(this.namelist);
    });
  }

  // sidebar function
  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  showSidebar(): void {
    this.sidebar.show();
  }
  // sidebar function done!



  //get message list of the selected people in the name list
  getMessageList(usernameTo) {
    this.usernameTo = usernameTo;
    console.log(this.usernameTo);
    this.chatList = [];
    this.chatListSmall = [];
    if (this.messageAll.length == 0) {
      // console.log("messageAll=0");
    } else {
      for (let i = 0; i < this.messageAll.length; i++) {
        if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
          this.chatList.push(this.messageAll[i]);
        }
      }
      console.log("chatlist");
      console.log(this.chatList);
      for (let i = 0; i < this.chatList.length; i++) {
        console.log("chatlist");
        console.log(this.chatList[i]);
        console.log("this.chatList[i].username1" + this.chatList[i].username1);
        if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
          this.chatListSmall = this.chatList[i].chatlist;
        }
      }
      // console.log("chatlistsmall");
      // console.log(this.chatListSmall);
    }

  }

  //add a message
  addMessage() {
    console.log("this.usernameTo");
    console.log(this.usernameTo);
    if(typeof(this.usernameTo)=="undefined"){
      console.log("this.usernameTo");
      return;
    }
    if (this.messageAll.length == 0) {
      console.log(this.messageAll.length);
      let messagelist = new Message(this.usernameFrom, this.usernameTo, [this.msg]);
      this.messageService.addMessage(messagelist).subscribe((data) => {
        this.newMessageEmitted.emit(data);
      });
      this.messageAll.push(messagelist);
      console.log("messageAll1");
      console.log(this.messageAll);
    } else {
      // this.chatList = [];
      // this.chatListSmall = [];
      // //get chartListSmall
      // for (let i = 0; i < this.messageAll.length; i++) {
      //   if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
      //     this.chatList.push(this.messageAll[i]);
      //   }
      // }
      // for (let i = 0; i < this.chatList.length; i++) {
      //   if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
      //     this.chatListSmall.push(this.chatList[i]);
      //   }
      // }

      if (this.chatListSmall.length == 0) {
        let messagelist = new Message(this.usernameFrom, this.usernameTo, [this.msg]);
        this.messageService.addMessage(messagelist).subscribe((data) => {
          this.newMessageEmitted.emit(data);
        });
        this.messageAll.push(messagelist);
        this.chatList.push(messagelist);
      } else {
        let index;
        for (let i = 0; i < this.messageAll.length; i++) {
          if ((this.messageAll[i].username1 == this.usernameFrom && this.messageAll[i].username2 == this.usernameTo) || (this.messageAll[i].username1 == this.usernameTo && this.messageAll[i].username2 == this.usernameFrom)) {
            this.messageAll[i].chatlist.push(this.msg);
            index = i;
          }
        }
        // console.log("messageAll");
        // console.log(this.messageAll);

        let updatedMessage$: Observable<Message> = this.messageService.updateMessage(this.messageAll[index], this.messageAll[index]._id);
        updatedMessage$.subscribe(updatedmessage => {
          this.newMessageEmitted.emit(updatedmessage);
        });
      }
    }


    //   let messagelist = new Message(this.usernameFrom, this.usernameTo, [this.msg]);
    //   this.messageService.addMessage(messagelist).subscribe((data) => {
    //     this.newMessageEmitted.emit(data);
    //   });
    //   console.log(messagelist);
    // // }else{
    //   this.messageService.list().subscribe((data) => {
    //     this.messagelist = data;
    //     console.log("messagelist1");
    //     console.log(this.messagelist);
    //   });
    //   console.log("messagelist");
    //   console.log(this.messagelist);
    // }



    // for (let i = 0; i < this.messagelist.length; i++) {
    //   if (this.messagelist[i].id2 == this.usernameTo) {
    //     this.messagelist[i].chatlist.push(this.msg);
    //     index = i;
    //   }
    // }
    // // console.log("messagelist");
    // // console.log(this.messagelist);

    // let updatedMessage$: Observable<Message> = this.messageService.updateMessage(this.messagelist[index], this.messagelist[index]._id);
    // updatedMessage$.subscribe(updatedmessage => {
    //   this.newMessageEmitted.emit(updatedmessage);
    // });
  }
}
