import { TestBed } from '@angular/core/testing';

import { HeatCalenderService } from './heat-calender.service';

describe('HeatCalenderService', () => {
  let service: HeatCalenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeatCalenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
