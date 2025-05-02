import { Component, signal } from '@angular/core';
import { CalendarEvent, NgxCalendario } from 'ngx-calendario';

@Component({
  selector: 'app-root',
  imports: [NgxCalendario],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-calendario-app';
  events = signal<CalendarEvent[]>([
    {
      date: new Date(new Date().setFullYear(2025, 4, 2)),
      title: "Hacer el calendario",
    }
  ]);
}
