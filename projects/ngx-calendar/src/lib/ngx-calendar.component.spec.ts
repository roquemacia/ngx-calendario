import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCalendar } from 'ngx-calendar';


describe('NgxCalendar', () => {
  let component: NgxCalendar;
  let fixture: ComponentFixture<NgxCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
