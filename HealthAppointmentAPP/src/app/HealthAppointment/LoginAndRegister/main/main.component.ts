import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }
  goRegister(){
    this.router.navigate(['/register']);
  }
  goLogin(){
    this.router.navigate(['/login']);
  }
}
