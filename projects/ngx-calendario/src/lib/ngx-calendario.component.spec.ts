import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCalendario } from './ngx-calendario.component';


describe('NgxCalendario', () => {
  let component: NgxCalendario;
  let fixture: ComponentFixture<NgxCalendario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCalendario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCalendario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
