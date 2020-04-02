import { TestBed } from '@angular/core/testing';

import { HealthappointmentServiceService } from './healthappointment-service.service';

describe('HealthappointmentServiceService', () => {
  let service: HealthappointmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthappointmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
