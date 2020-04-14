import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorInfoComponent } from './doctor-info.component';

describe('DoctorInfoComponent', () => {
  let component: DoctorInfoComponent;
  let fixture: ComponentFixture<DoctorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
