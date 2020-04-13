import { TestBed } from '@angular/core/testing';

import { DoctorService } from './doctor.service';

describe('HealthappointmenService', () => {
  let service: DoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
