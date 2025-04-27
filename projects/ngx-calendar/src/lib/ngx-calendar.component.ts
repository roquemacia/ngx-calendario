import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChild, input, signal, TemplateRef } from '@angular/core';
import { CalendarDate } from './models/calendarDate.model';
import { CalendarEvent } from './models/calendarEvent.model';
import { CalendarTuple } from './models/calendarEventTuple.model';

@Component({
  selector: 'ngx-calendar',
  imports: [DatePipe, NgTemplateOutlet],
  templateUrl: "./ngx-calendar.component.html",
  styleUrls: ["./ngx-calendar.component.scss"]
})
export class NgxCalendar {

  // #region Templates
  buttonsContent = contentChild<TemplateRef<unknown>>("buttonsContent");
  dayContent = contentChild<TemplateRef<unknown>>("dayContent");
  eventsContent = contentChild<TemplateRef<unknown>>("eventsContent");
  eventContent = contentChild<TemplateRef<unknown>>("eventContent");

  protected dayHeaders = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  private daysInMonth = signal<CalendarDate[]>([]);

  protected daysWithEvents = computed<CalendarDate[]>(() => {
    const daysInMonth = this.daysInMonth();
    const formateedEvents = this.formatEvents();
    if (Object.keys(formateedEvents).length == 0) return daysInMonth;
    return daysInMonth.map((v, i) => {
      if (!v.date) return v;
      return {
        ...v,
        events: formateedEvents[this.formatDate(v.date)]
      } as CalendarDate;
    });
  });

  protected days = computed<(CalendarDate | undefined)[]>(() => {
    const dummyDate = new Date();
    //Get first date
    dummyDate.setUTCFullYear(this.selectedYear(), this.selectedMonth(), 1);
    dummyDate.setUTCHours(0, 0, 0);
    const leftOffset = dummyDate.getDay() - 1;
    const lastMonth = this.createArray(leftOffset).map(() => undefined);
    dummyDate.setUTCMonth(dummyDate.getMonth() +1);
    dummyDate.setUTCDate(dummyDate.getDate() -1);
    const rightOffset = dummyDate.getDay() - 1;
    const nextMonth = this.createArray(Math.abs(rightOffset - 6)).map(() => undefined);
    return [
      ...lastMonth,
      ...this.createArray(dummyDate.getDate()).map((v, i) => {
        const date = new Date();
        date.setUTCFullYear(this.selectedYear(), this.selectedMonth(), i+1);
        return {
          date: date,
        };
      }),
      ...nextMonth
    ];
  });

  protected selectedYear = signal(2000);
  protected selectedMonth = signal(0);

  protected lastDayPrevMonth = 0;
  protected firstDayNextMonth = 0;

  public events = input<CalendarEvent[]>();

  private formatEvents = computed<CalendarTuple>(() => {
    const eventArray = this.events() ?? [];
    // Filter the array to only show and process the events to show
    const filteredEvents = eventArray.filter((e) => e.date.getMonth() == this.selectedMonth());
    const diasMap: CalendarTuple = {};
    // Transform the array into a tuple object with key day
    filteredEvents.forEach((event) => {
      const presentEvents = diasMap[this.formatDate(event.date)] ?? [];
      presentEvents.push(event);
      diasMap[this.formatDate(event.date)] = presentEvents;
    });
    return diasMap;
  });

  private formatDate(date: Date) {
    if (!date) throw new Error("Invalid Date");
    return `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
  }

  private createArray(length: number) {
    return Array.from(Array(length), (_, i) => i)
  }

  public nextMonth() {
    this.selectedMonth.update((m) =>
      (m == 11) ? 0 : ++m
    );
  }

  public previousMonth() {
    this.selectedMonth.update((m) =>
      (m == 0) ? 11 : --m
    );
  }
}
