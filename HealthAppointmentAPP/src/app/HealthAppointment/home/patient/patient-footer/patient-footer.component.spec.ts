import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFooterComponent } from './patient-footer.component';

describe('PatientFooterComponent', () => {
  let component: PatientFooterComponent;
  let fixture: ComponentFixture<PatientFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
