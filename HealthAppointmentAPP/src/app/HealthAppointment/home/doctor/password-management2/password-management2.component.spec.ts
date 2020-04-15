import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordManagement2Component } from './password-management2.component';

describe('PasswordManagement2Component', () => {
  let component: PasswordManagement2Component;
  let fixture: ComponentFixture<PasswordManagement2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordManagement2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordManagement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
