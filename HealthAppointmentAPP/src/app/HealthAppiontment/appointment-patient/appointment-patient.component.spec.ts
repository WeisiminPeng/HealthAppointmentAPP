import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPatientComponent } from './appointment-patient.component';

describe('AppointmentPatientComponent', () => {
  let component: AppointmentPatientComponent;
  let fixture: ComponentFixture<AppointmentPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
