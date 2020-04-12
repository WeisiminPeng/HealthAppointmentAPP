import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientScheduleComponent } from './patient-schedule.component';

describe('PatientScheduleComponent', () => {
  let component: PatientScheduleComponent;
  let fixture: ComponentFixture<PatientScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
