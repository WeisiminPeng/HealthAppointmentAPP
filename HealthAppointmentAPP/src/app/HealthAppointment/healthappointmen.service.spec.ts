import { TestBed } from '@angular/core/testing';

import { HealthappointmenService } from './healthappointmen.service';

describe('HealthappointmenService', () => {
  let service: HealthappointmenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthappointmenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
