import { TestBed } from '@angular/core/testing';

import { NgxCalendarService } from './ngx-calendar.service';

describe('NgxCalendarService', () => {
  let service: NgxCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
