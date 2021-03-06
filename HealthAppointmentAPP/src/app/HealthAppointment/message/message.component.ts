import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import html2canvas from 'html2canvas';

// import service
import { MessageService } from '../services/message.service';
import { AppointmentService } from '../services/appointment.service';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';

// import model
import { Message } from './model/message.model';
import { Share } from './model/share.model';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import router
import { Router } from '@angular/router';

// import component
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
  public isOpen = true;
  public closeOnDocumentClick = true;
  public type = 'Push';

  public username: string;
  public sidebarOneJump: string;
  public sidebarTwoJump: string;
  public Info: string;
  public sidebarOne: string;
  public sidebarTwo: string;
  public Message: string;
  public SignOut = '';
  public personTell: string;
  // sidebar variables done!

  @Output() newMessageEmitted = new EventEmitter<Message>();
  appointmentlist: any[] = [];
  usernamelist: any[] = [];
  namelist: any[] = [];

  messageAll: any[] = [];

  usernameTo: string; // message is to the user with usernameTo
  usernameFrom = ''; // message is from the user with usernameFrom
  role = ''; // the role of this user
  role2 = '';
  chatList: any[] = []; // the list only contain the chat content of the user with idFrom
  chatListSmall: any[] = []; // the list contain the chat content between the users with idFrom and idTo

  // chatListSmallName: any[] = [];
  msg: any = {// new message
    usernameMsg: '',
    nameMsg: '',
    content: ''
  };

  // used for reload
  private timer;

  isShowEmoji: boolean = false;
  isShowSearchBar: boolean = false;
  searchKeywords = "";
  searchChatListSmall: any[] = [];
  isShared: boolean = false;
  chatHistory: any[] = [];
  historylist: any[] = [];
  isChosen: boolean = false;
  isShowShareBar: boolean = false;
  namelist2: any[] = [];
  shareNamelist: any[] = [];


  // declare services
  constructor(public messageService: MessageService, public appointmentService: AppointmentService, public doctorService: DoctorService, public patientService: PatientService, public http: HttpClient, public router: Router, public routes: ActivatedRoute) {
  }

  ngOnInit(): void {
    // sidebar jump control
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.personTell = this.routes.snapshot.paramMap.get('username').split('_')[1];
    if (this.personTell == 'patient') {
      this.sidebarOne = 'My Appointment';
      this.sidebarTwo = 'Make Appointment';
      this.sidebarTwoJump = '/patientAppointment/' + this.username;
      this.sidebarOneJump = '/patientSchdule/' + this.username;
      this.Info = '/patientInfo/' + this.username;
      this.Message = '/messages/' + this.username + '_patient';
    } else {
      this.sidebarOne = 'My Schdule';
      this.sidebarTwo = 'Work Time';
      this.sidebarTwoJump = '/doctorAppointment/' + this.username;
      this.sidebarOneJump = '/doctorSchdule/' + this.username;
      this.Info = '/doctorInfo/' + this.username;
      this.Message = '/messages/' + this.username + '_doctor';
    }
    // sidebar jump control done!

    // get all the messages form messages collection
    this.messageService.list().subscribe((data) => {
      this.messageAll = data;
      // console.log("messageAll");
      // console.log(this.messageAll);
    });

    // get usernameFrom
    this.routes.params.subscribe((data) => {
      // console.log(data.username);
      this.usernameFrom = data.username.split('_')[0];
      this.role = data.username.split('_')[1];
      if (this.role == 'patient') {
        this.role2 = 'doctor';
      } else {
        this.role2 = 'patient';
      }
      this.msg.usernameMsg = this.usernameFrom;
      // console.log("msg");
      // console.log(this.msg);
      // console.log(this.usernameFrom);
      // console.log(this.role);
    });

    if (this.role == 'patient') {
      // console.log("patient");
      this.patientService.list().subscribe((data) => {
        // console.log(data);
        const patientlist = data;
        for (let i = 0; i < patientlist.length; i++) {
          if (patientlist[i].username == this.usernameFrom) {
            this.msg.nameMsg = patientlist[i].Name;
            // console.log(this.msg);
          }
        }
      });
    } else {
      // console.log("doctor");
      this.doctorService.list().subscribe((data) => {
        // console.log(data);
        const doctorlist = data;
        for (let i = 0; i < doctorlist.length; i++) {
          if (doctorlist[i].username == this.usernameFrom) {
            this.msg.nameMsg = doctorlist[i].Name;
            // console.log(this.msg);
          }
        }
      });
    }

    this.appointmentService.get(this.usernameFrom).subscribe((data) => {
      // get the appointment list of this user
      this.appointmentlist = data;

      // get the namelist data
      if (this.role == 'patient') {
        // console.log("doctor namelist");
        for (let i = 0; i < this.appointmentlist.length; i++) {
          if (this.appointmentlist[i].PatientUsername == this.usernameFrom) {
            if (this.usernamelist.indexOf(this.appointmentlist[i].DoctorUsername) == -1) {
              this.usernamelist.push(this.appointmentlist[i].DoctorUsername);
              this.namelist.push({ name: this.appointmentlist[i].DoctorName, username: this.appointmentlist[i].DoctorUsername });
            }
          }
        }
      } else if (this.role == 'doctor') {
        // console.log("doctor namelist");
        // console.log("appointmentlist");
        // console.log(this.appointmentlist);
        for (let i = 0; i < this.appointmentlist.length; i++) {
          if (this.appointmentlist[i].DoctorUsername == this.usernameFrom) {
            const patientUsername: string = this.appointmentlist[i].PatientUsername;
            // console.log(this.namelist.indexOf(patientUsername));
            if (this.usernamelist.indexOf(patientUsername) == -1) {
              this.usernamelist.push(this.appointmentlist[i].PatientUsername);
              this.namelist.push({ name: this.appointmentlist[i].PatientName, username: this.appointmentlist[i].PatientUsername });
            }
          }
        }
      }
      // console.log("usernamelist+namelist");
      // console.log(this.usernamelist);
      // console.log(this.namelist);
    });

    // timer, reload the webpage
    this.timer = setInterval(() => {
      // console.log("reload!");
      this.chatList = [];
      this.chatListSmall = [];
      this.messageService.list().subscribe((data) => {
        this.messageAll = data;
        for (let i = 0; i < this.messageAll.length; i++) {
          if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
            this.chatList.push(this.messageAll[i]);
          }
        }
        for (let i = 0; i < this.chatList.length; i++) {
          if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
            this.chatListSmall = this.chatList[i].chatlist;
          }
        }
      });
    }, 50000);

    //hide search bar and emoji div
    document.addEventListener('mouseup', (e) => {
      let classname = (<HTMLTextAreaElement>e.target).className;
      if ((classname.indexOf("shareli"))&&(classname.indexOf("chosenShare"))&&(classname.indexOf("share-name")) &&(classname.indexOf("share-button")) && (classname.indexOf("chatStatus")) && (classname.indexOf("share-div")) && (classname.indexOf("showShareNamelist"))&& (classname.indexOf("shareNamelist"))&& (classname.indexOf("share")) && classname != "search-button" && classname != "search-enter" && classname != "search-div" && (classname.indexOf("search-input")) && classname != "emoji-button" && classname != "emoji-div" && classname != "emojione") {
        this.isShowEmoji = false;
        this.isShowSearchBar = false;
        this.isShared = false;
        this.isShowShareBar = false;
        // console.log(classname);
      }
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


  // get message list of the selected people in the name list
  getMessageList(usernameTo) {
    this.usernameTo = usernameTo;
    const id = 'nameli-' + this.usernameTo;
    const parent = document.getElementById('namelist-wrapper');
    for (let i = 0; i < parent.childElementCount; i++) {
      // tslint:disable-next-line:triple-equals
      // console.log("id"+id);
      //   console.log("cid"+parent.children[i].id);
      if (parent.children[i].id === id) {

        parent.children[i].className = 'selected';
      } else {
        parent.children[i].className = 'name-span';
      }
    }
    // document.getElementById(id).style = 'background-color:lightblue;\n' +
    //   '              color: white;\n' +
    //   '              text-align: right;';
    // console.log(this.usernameTo);
    this.chatList = [];
    this.chatListSmall = [];
    // this.chatListSmallName = [];
    if (this.messageAll.length == 0) {
      // console.log("messageAll=0");
    } else {
      for (let i = 0; i < this.messageAll.length; i++) {
        if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
          this.chatList.push(this.messageAll[i]);
        }
      }
      // console.log("chatlist");
      // console.log(this.chatList);
      for (let i = 0; i < this.chatList.length; i++) {
        // console.log("chatlist");
        // console.log(this.chatList[i]);
        // console.log("this.chatList[i].username1" + this.chatList[i].username1);
        if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
          this.chatListSmall = this.chatList[i].chatlist;
        }
      }
      // console.log("chatlistsmall");
      // console.log(this.chatListSmall);
    }

  }


  //add an emoji
  addEmoji(e) {
    // alert("add emoji");
    let selectedEmoji = e.toElement.alt;
    this.msg.content = this.msg.content + " " + selectedEmoji + " "
    // console.log(this.msg.content);
    this.isShowEmoji = false;

    // console.log("add" + this.isShowEmoji);

  }

  showEmoji() {
    // alert("show emoji");
    this.isShowEmoji = true;
    this.isShowSearchBar = false;
    this.isShared = false;
    this.isShowShareBar = false;
    // console.log("show" + this.isShowEmoji);
  }


  // //add a image
  // addImage(e) {
  //   let file = e.target.files[0];
  //   if (!file.type.match('image/*')) {
  //     alert('please upload a image！');
  //     e.target.value = "";
  //     return;
  //   }

  //   this.msg.contentType="image";
  //   // this.http.post("http://localhost:3000/")
  //   // let reader = new FileReader();
  //   // reader.readAsDataURL(file);
  //   // reader.onload = function(e){
  //   //    console.log(e.target.result);//(<HTMLImageElement>document.getElementById('mImg')).src =
  //   // }
  //   // console.log(reader.onload);
  // }

  //search content
  showSearchBar() {
    if (typeof (this.usernameTo) == "undefined") {
      alert("Please select a person to search!");
      return;
    }
    this.isShowSearchBar = true;
    this.isShowEmoji = false;
    this.isShared = false;
    this.isShowShareBar = false;
  }

  searchContent() {
    this.searchChatListSmall = [];
    if (this.searchKeywords == "") {
      alert("The search content should not be empty!");
      return;
    }
    // console.log(this.chatListSmall);
    for (let i = 0; i < this.chatListSmall.length; i++) {
      if (this.chatListSmall[i].content.includes(this.searchKeywords)) {
        // console.log(this.chatListSmall[i].content);
        this.searchChatListSmall.push(this.chatListSmall[i]);
      }
    }
    // console.log(this.searchChatListSmall);
    // console.log(this.searchKeywords);
  }


  //share chat history
  selectHistory() {
    if (typeof (this.usernameTo) == "undefined") {
      alert("Please select a person to send your message!");
      return;
    }
    this.isShared = true;
    this.chatList = [];
    this.chatListSmall = [];
    this.chatHistory = [];
    this.messageService.list().subscribe((data) => {
      this.messageAll = data;
      for (let i = 0; i < this.messageAll.length; i++) {
        if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
          this.chatList.push(this.messageAll[i]);
        }
      }
      for (let i = 0; i < this.chatList.length; i++) {
        if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
          this.chatListSmall = this.chatList[i].chatlist;
        }
      }
      // console.log(this.messageAll);
      // console.log(this.chatListSmall);
      for (let i = 0; i < this.chatListSmall.length; i++) {
        this.chatHistory.push(this.chatListSmall[i]);
        this.chatHistory[i].status = false;
      }
      // console.log(this.chatHistory);
      // console.log(this.chatListSmall);
    });
  }

  shareHistory() {
    this.historylist = []
    this.msg.content = "";
    for (let i = 0; i < this.chatHistory.length; i++) {
      if (this.chatHistory[i].status == true) {
        this.historylist.push(this.chatListSmall[i]);
      }
    }
    if (this.historylist.length == 0) {
      alert('Please choose at least one message to share');
      return;
    } else {
      for (let i = 0; i < this.historylist.length; i++) {
        this.msg.content += "<p>"+this.historylist[i].nameMsg+": "
        +this.historylist[i].content
        +"</p>";
      }
    }
    this.isShowShareBar = true;
  }

  share() {
    (document.getElementById('msgContent') as HTMLInputElement).value = '';
    let oldUsernameTo=this.usernameTo;
    this.namelist2=[]
    for (let i = 0; i < this.namelist.length; i++) {
      if (this.namelist[i].chosenShare == true) {
        this.namelist2.push(this.namelist[i]);
      }
    }
    if (this.namelist2.length == 0) {
      alert("Please select a person to share!");
      return;
    }
    for (let i = 0; i < this.namelist2.length; i++) {
      this.usernameTo=this.namelist2[i].username;
      console.log(this.usernameTo);
      if (this.chatListSmall.length == 0) {
        let messagelist = new Message(this.usernameFrom, this.usernameTo, [this.msg]);
        
        this.messageService.addMessage(messagelist).subscribe((data) => {
          this.newMessageEmitted.emit(data);
          this.messageService.list().subscribe((data) => {
            this.messageAll = data;
            this.chatList = [];
            for (let i = 0; i < this.messageAll.length; i++) {
              if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
                this.chatList.push(this.messageAll[i]);
              }
            }
            for (let i = 0; i < this.chatList.length; i++) {
              if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
                this.chatListSmall = this.chatList[i].chatlist;
              }
            }
          });
        });
        this.messageService.list().subscribe((data) => {
          this.messageAll = data;
          this.chatList = [];
          for (let i = 0; i < this.messageAll.length; i++) {
            if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
              this.chatList.push(this.messageAll[i]);
            }
          }
          for (let i = 0; i < this.chatList.length; i++) {
            if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
              this.chatListSmall = this.chatList[i].chatlist;
            }
          }
        });
      } else {
        let index;
        for (let i = 0; i < this.messageAll.length; i++) {
          if ((this.messageAll[i].username1 == this.usernameFrom && this.messageAll[i].username2 == this.usernameTo) || (this.messageAll[i].username1 == this.usernameTo && this.messageAll[i].username2 == this.usernameFrom)) {
            this.messageAll[i].chatlist.push(this.msg);
            index = i;
          }
        }
        console.log()
        console.log(this.messageAll);
        console.log("this.messageAll[index]");
        console.log(this.messageAll[index]);
        console.log("tthis.messageAll[index]._id");
        console.log(this.messageAll[index]._id);
        const updatedMessage$: Observable<Message> = this.messageService.updateMessage(this.messageAll[index], this.messageAll[index]._id);
        updatedMessage$.subscribe(updatedmessage => {
          this.newMessageEmitted.emit(updatedmessage);
          // get new message list
          this.messageService.list().subscribe((data) => {
            this.messageAll = data;
            // console.log("messageAll1");
            // console.log(this.messageAll);
            this.chatList = [];
            this.chatListSmall = [];
            for (let i = 0; i < this.messageAll.length; i++) {
              if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
                this.chatList.push(this.messageAll[i]);
              }
            }
            // console.log("chatlist");
            // console.log(this.chatList);
            for (let i = 0; i < this.chatList.length; i++) {
              // console.log("chatlist[i]");
              // console.log(this.chatList[i]);
              if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
                this.chatListSmall = this.chatList[i].chatlist;
              }
            }
            // console.log("chatListSmall");
            // console.log(this.chatListSmall);
            // console.log("***********************");
          });
        });
      }
    }
    this.usernameTo=oldUsernameTo;
    this.isShowShareBar = false;
  }

  //export chat history
  exportHistory() {
    // alert("history");
    let flag = confirm("Warning! Your emoji will not be saved in to the chat history csv file!") == false;
    if (flag) {
      return;
    }
    if (typeof (this.usernameTo) == "undefined") {
      let flag = confirm("Warning! All of Your chat history will be exported!") == false;
      if (flag) {
        return;
      }
      let csv = [];
      this.messageService.list().subscribe((data) => {
        this.messageAll = data;
        for (let i = 0; i < this.messageAll.length; i++) {
          if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
            this.chatList.push(this.messageAll[i]);
          }
        }
        //header
        csv.push("Username,");
        csv.push("Name,");
        csv.push("content");
        csv.push("\n");
        for (let i = 0; i < this.chatList.length; i++) {
          // console.log(this.chatList[i]);
          for (let j = 0; j < this.chatList[i].chatlist.length; j++) {
            // console.log(this.chatList[i].chatlist[j]);
            let chat = this.chatList[i].chatlist[j];
            csv.push(chat.usernameMsg + ",");
            csv.push(chat.nameMsg + ",");
            csv.push(chat.content + "\n");
          }
          csv.push("\n");
        }
        // console.log(csv);
        const BOM = '\uFEFF';
        // create a csv file
        var blob = new Blob([BOM + csv], { type: 'text/csv' })
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', URL.createObjectURL(blob));
        downloadLink.download = `chat_history.csv`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        // console.log("chatList");
        // console.log(this.chatList);
        // console.log("***********************");
      });
    } else {
      let csv = [];
      this.messageService.list().subscribe((data) => {
        this.messageAll = data;
        for (let i = 0; i < this.messageAll.length; i++) {
          if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
            this.chatList.push(this.messageAll[i]);
          }
        }
        for (let i = 0; i < this.chatList.length; i++) {
          if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
            this.chatListSmall = this.chatList[i].chatlist;
          }
        }

        //header
        csv.push("Username,");
        csv.push("Name,");
        csv.push("content");
        csv.push("\n");
        for (let i = 0; i < this.chatListSmall.length; i++) {
          let chat = this.chatListSmall[i];
          csv.push(chat.usernameMsg + ",");
          csv.push(chat.nameMsg + ",");
          csv.push(chat.content + "\n");
        }
        // console.log(csv);
        const BOM = '\uFEFF';
        // create a csv file
        var blob = new Blob([BOM + csv], { type: 'text/csv' })
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', URL.createObjectURL(blob));
        downloadLink.download = `chat_history.csv`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    }
  }

  // screenShot(e) {
  //   let canvas = <HTMLCanvasElement>document.getElementById("showScreenshot");
  //   console.log(canvas);
  //   let ctx = canvas.getContext('2d');

  //   let x1, y1, x2, y2;
  //   addEventListener("mousemove", e => {

  //   });
  //   addEventListener("mousedown", e => {
  //     x1 = e.pageX;
  //     y1 = e.pageY;
  //   });
  //   addEventListener('mouseup', e => {
  //     x2 = e.pageX;
  //     y2 = e.pageY;
  //     console.log("x1,y1,x2,y2:" + x1 + "," + y1 + "," + x2 + "," + y2);
  //     let width = x2 - x1;
  //     let height = y2 - y1;

  //     document.getElementById("showMessage").onload=function(){
  //       console.log("draw");
  //       ctx.clearRect(0, 0, width, height);
  //       ctx.drawImage((<HTMLCanvasElement>document.body), x1, y1, width, height, 0, 0, width, height);
  //     }

  //   });

  // html2canvas(document.body).then(function (canvas) {
  // document.body.appendChild(canvas);
  // let that = this;
  // console.log(this.http);
  //   let image = canvas.toDataURL("image/png");
  //   console.log(image);
  //   that.http.post("desktop/screenshot", image).subscribe(
  //     data => {
  //     console.log("POST Request is successful ", data);
  //     },
  //     error => {
  //     console.log("Error", error);
  //     }
  //     );
  // });
  // }


  // async screenShot(e) {
  //     let screenshot = await this.makeScreenshot(); // png dataUrl
  //     let box = await this.getBox(e);
  //     this.send(screenshot,box); // sed post request  with bug image, region and description
  //     alert('To see POST requset with image go to: chrome console > network tab');
  // }

  // async makeScreenshot(){
  //   return new Promise((resolve, reject) => {
  //     html2canvas(document.body).then(canvas => {
  //       document.body.appendChild(canvas)
  //     });
  //   });
  // }

  // async getBox(e) {
  //   return new Promise((resolve, reject) => {
  //     let start = 0;
  //     let sx, sy, ex, ey = -1;
  //     let active_box = document.createElement("div");
  //     // console.log(e);

  //     //create box
  //     let drawBox = () => {
  //       active_box.style.left = (ex > 0 ? sx : sx + ex) + 'px';
  //       active_box.style.top = (ey > 0 ? sy : sy + ey) + 'px';
  //       active_box.style.width = Math.abs(ex) + 'px';
  //       active_box.style.height = Math.abs(ey) + 'px';
  //     };

  //     addEventListener("click", e => {
  //       if (start == 0) {
  //         sx = e.pageX;
  //         sy = e.pageY;
  //         ex = 0;
  //         ey = 0;
  //         drawBox();
  //       }
  //       console.log(active_box);
  //     });

  //     addEventListener("mousemove", e=>{
  //       //console.log(e)
  //       if(start==1) {
  //           ex=e.pageX-sx;
  //           ey=e.pageY-sy
  //           drawBox();
  //       }
  //       console.log("e: "+ex + " " + ey);
  //     });

  //     addEventListener("click", e=>{
  //       start=0;
  //       // let a=100/75 //zoom out img 75%
  //       resolve({
  //          x:Math.floor(ex > 0 ? sx : sx+ex ),
  //          y:Math.floor(ey > 0 ? sy : sy+ey ),
  //          width:Math.floor(Math.abs(ex)),
  //          height:Math.floor(Math.abs(ex)),
  //         //  desc: q('.bug-desc').value
  //       });
  //     });
  //   });
  // }


  //add a message
  addMessage() {
    // this.msg.contentType="string";
    if (typeof (this.usernameTo) == "undefined") {
      alert("Please select a person to send your message!");
      return;
    }
    if (this.msg.content == '') {
      alert('The content of the message should not be empty!');
      return;
    }
    if (this.messageAll.length == 0) {
      // console.log("this.messageAll.length == 0");
      const messagelist = new Message(this.usernameFrom, this.usernameTo, [this.msg]);
      this.messageService.addMessage(messagelist).subscribe((data) => {
        this.newMessageEmitted.emit(data);
        this.messageService.list().subscribe((data) => {
          this.messageAll = data;
          // console.log("messageAll1");
          // console.log(this.messageAll);
          for (let i = 0; i < this.messageAll.length; i++) {
            if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
              this.chatList.push(this.messageAll[i]);
            }
          }
          // console.log("chatlist");
          // console.log(this.chatList);
          for (let i = 0; i < this.chatList.length; i++) {
            // console.log("chatlist");
            // console.log(this.chatList[i]);
            if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
              this.chatListSmall = this.chatList[i].chatlist;
            }
          }
          // console.log("chatListSmall");
          // console.log(this.chatListSmall);
          // console.log("***********************");
        });
      });

      (document.getElementById('msgContent') as HTMLInputElement).value = '';
    } else {
      if (this.chatListSmall.length == 0) {
        // console.log("this.chatListSmall.length == 0");

        const messagelist = new Message(this.usernameFrom, this.usernameTo, [this.msg]);
        this.messageService.addMessage(messagelist).subscribe((data) => {
          this.newMessageEmitted.emit(data);
          this.messageService.list().subscribe((data) => {
            this.messageAll = data;
            // console.log("messageAll1");
            // console.log(this.messageAll);
            this.chatList = [];
            for (let i = 0; i < this.messageAll.length; i++) {
              if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
                this.chatList.push(this.messageAll[i]);
              }
            }
            // console.log("chatlist");
            // console.log(this.chatList);
            for (let i = 0; i < this.chatList.length; i++) {
              // console.log("chatlist");
              // console.log(this.chatList[i]);
              if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
                this.chatListSmall = this.chatList[i].chatlist;
              }
            }
            // console.log("chatListSmall");
            // console.log(this.chatListSmall);
            // console.log("***********************");
          });
        });
        this.messageService.list().subscribe((data) => {
          this.messageAll = data;
          // console.log("messageAll1");
          // console.log(this.messageAll);
          this.chatList = [];
          for (let i = 0; i < this.messageAll.length; i++) {
            if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
              this.chatList.push(this.messageAll[i]);
            }
          }
          // console.log("chatlist");
          // console.log(this.chatList);
          for (let i = 0; i < this.chatList.length; i++) {
            // console.log("chatlist");
            // console.log(this.chatList[i]);
            if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
              this.chatListSmall = this.chatList[i].chatlist;
            }
          }
          // console.log("chatListSmall");
          // console.log(this.chatListSmall);
          // console.log("***********************");
        });
      } else {
        // console.log("this.chatListSmall.length != 0");
        let index;
        for (let i = 0; i < this.messageAll.length; i++) {
          if ((this.messageAll[i].username1 == this.usernameFrom && this.messageAll[i].username2 == this.usernameTo) || (this.messageAll[i].username1 == this.usernameTo && this.messageAll[i].username2 == this.usernameFrom)) {
            this.messageAll[i].chatlist.push(this.msg);
            index = i;
          }
        }
        // console.log("this.messageAll[index]");
        // console.log(this.messageAll[index]);
        // console.log("tthis.messageAll[index]._id");
        // console.log(this.messageAll[index]._id);
        const updatedMessage$: Observable<Message> = this.messageService.updateMessage(this.messageAll[index], this.messageAll[index]._id);
        updatedMessage$.subscribe(updatedmessage => {
          this.newMessageEmitted.emit(updatedmessage);
          // get new message list
          this.messageService.list().subscribe((data) => {
            this.messageAll = data;
            // console.log("messageAll1");
            // console.log(this.messageAll);
            this.chatList = [];
            this.chatListSmall = [];
            for (let i = 0; i < this.messageAll.length; i++) {
              if (this.messageAll[i].username1 == this.usernameFrom || this.messageAll[i].username2 == this.usernameFrom) {
                this.chatList.push(this.messageAll[i]);
              }
            }
            // console.log("chatlist");
            // console.log(this.chatList);
            for (let i = 0; i < this.chatList.length; i++) {
              // console.log("chatlist[i]");
              // console.log(this.chatList[i]);
              if (this.chatList[i].username1 == this.usernameTo || this.chatList[i].username2 == this.usernameTo) {
                this.chatListSmall = this.chatList[i].chatlist;
              }
            }
            // console.log("chatListSmall");
            // console.log(this.chatListSmall);
            // console.log("***********************");
          });
        });
      }
      (document.getElementById('msgContent') as HTMLInputElement).value = '';
    }

  }

  ngOnDestroy() {
    // deestroy the timer
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}
