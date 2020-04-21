import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommentStmt } from '@angular/compiler';
import { DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.scss']
})
export class DoctorSidebarComponent implements OnInit {

  imgURL: any = '';
  public message: string;
  public username: string;
  public doctorAppointment: string;
  public doctorSchdule: string;
  public personalInfo: string;
  public SignOut: string = '';
  public Message: string;
  public people: any;
  public avatar: any;
  // private doctorSchdule1 = '/doctorSchdule';

  @ViewChild('sidebar')
  public sidebar: SidebarComponent;
  public isOpen: boolean = true;
  public closeOnDocumentClick: boolean = true;
  public type: string = 'Push';

  // constructor(public http:HttpClient,public router:Router) { }
  constructor(public doctorService: DoctorService, public routes: ActivatedRoute, public http: HttpClient,
              private sanitizer: DomSanitizer) { }

  // onFileSelected(event){
  //   this.selectedFile = <File>event.target.files[0];
  //   console.log(this.selectedFile);
  // }
  // onUpload() {
  //   const fd = new FormData();
  //   fd.append('image',this.selectedFile,this.selectedFile.name);
  //   this.http.put
  // }
  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
    this.doctorAppointment = '/doctorAppointment/' + this.username;
    this.doctorSchdule = '/doctorSchdule/' + this.username;
    this.personalInfo = '/doctorInfo/' + this.username;
    this.Message = '/messages/'+this.username+'_doctor';
    console.log(this.doctorAppointment);

    this.http.get('http://localhost:3000/doctors/' + this.username).subscribe((response:any)=>{
      this.people = response;
      console.log(this.people.Avatar);

      this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.people.Avatar);

    // }
    });
  }

  public onCreated(args: any) {
    this.sidebar.isOpen = false;
    this.sidebar.element.style.visibility = '';
  }

  showSidebar(): void {
    this.sidebar.show();
  }
  uploadImg(files) {

    let temp = '';
    temp = window.URL.createObjectURL(files[0]);
    this.imgURL = this.sanitizer.bypassSecurityTrustUrl(temp);
    // temp = this.imgURL.changingThisBreaksApplicationSecurity;
    // this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    let api='http://localhost:3000/doctors/' + this.username;
    this.http.put(api, {
      Avatar: this.imgURL.changingThisBreaksApplicationSecurity
    }, httpOptions).subscribe((response) => {
      console.log(response);
      alert('upload Successfully!');
    });
    }



}
