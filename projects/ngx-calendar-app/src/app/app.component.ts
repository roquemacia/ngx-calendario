import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxCalendar } from 'ngx-calendar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxCalendar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-calendar-app';
}
