import { TestBed } from '@angular/core/testing';
import { NgxCalendarioService } from './ngx-calendario.service';

describe('NgxCalendarioService', () => {
  let service: NgxCalendarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCalendarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
