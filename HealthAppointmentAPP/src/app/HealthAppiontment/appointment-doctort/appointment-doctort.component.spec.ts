import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDoctortComponent } from './appointment-doctort.component';

describe('AppointmentDoctortComponent', () => {
  let component: AppointmentDoctortComponent;
  let fixture: ComponentFixture<AppointmentDoctortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDoctortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDoctortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
