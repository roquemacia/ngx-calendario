import { Component, signal } from '@angular/core';
import { CalendarEvent, NgxCalendar } from 'ngx-calendar';

@Component({
  selector: 'app-root',
  imports: [NgxCalendar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-calendar-app';
  events = signal<CalendarEvent[]>([
    {
      date: new Date(new Date().setFullYear(2025, 4, 2)),
      title: "Hacer el calendario",
    }
  ]);
}
