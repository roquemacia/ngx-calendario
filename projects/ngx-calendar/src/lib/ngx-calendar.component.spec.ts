import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCalendarComponent } from './ngx-calendar.component';

describe('NgxCalendarComponent', () => {
  let component: NgxCalendarComponent;
  let fixture: ComponentFixture<NgxCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
