import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // import HTML service
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  imgURL: any;
  username: any;
  constructor(private http: HttpClient, private router: Router, private sanitizer: DomSanitizer, public routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.routes.snapshot.paramMap.get('username').split('_')[0];
  }
  uploadImg(files) {

    let temp = '';
    temp = window.URL.createObjectURL(files[0]);
    this.imgURL = this.sanitizer.bypassSecurityTrustUrl(temp);
    // temp = this.imgURL.changingThisBreaksApplicationSecurity;
    // this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
    }
    goLogin(){
      const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
      const api = 'http://localhost:3000/doctors/' + this.username;
      this.http.put(api, {
      Avatar: this.imgURL.changingThisBreaksApplicationSecurity
    }, httpOptions).subscribe((response) => {
      console.log(response);
      alert('upload Successfully!');
    });
      this.router.navigate(['/login']);
    }
}
