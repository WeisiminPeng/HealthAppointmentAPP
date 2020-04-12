import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html',
  styleUrls: ['./patient-sidebar.component.scss']
})
export class PatientSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(args: any) {
    // if (Browser.isDevice) {
    //   this.sideBar.hide();
    // }
    const elements: HTMLElement[] = args.currentTarget.parentElement.querySelectorAll('.active-item');
    elements.forEach(element => {
      if (element.classList.contains('active-item')) { element.classList.remove('active-item'); }
    });
    args.currentTarget.classList.add('active-item');
  }

}
