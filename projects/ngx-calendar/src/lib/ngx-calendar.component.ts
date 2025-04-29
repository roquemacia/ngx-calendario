import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChild, input, model, TemplateRef } from '@angular/core';
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
  // #endregion

  // #region inputs
  public selectedYear = model(2000);
  public selectedMonth = model(0);

  public events = input<CalendarEvent[]>();
  // #endregion

  // #region vars
  protected lastDayPrevMonth = 0;
  protected firstDayNextMonth = 0;

  protected dayHeaders = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  private daysInMonth = 0;
  // #endregion

  // #region computedVars
  private formatEvents = computed<CalendarTuple>(() => {
    const eventArray = this.events() ?? [];
    // Filter the array to only show and process the events to show
    const filteredEvents = eventArray.filter((e) => e.date.getMonth() == this.selectedMonth());
    const daysMap: CalendarTuple = {};
    // Transform the array into a tuple object with key day
    filteredEvents.forEach((event) => {
      const presentEvents = daysMap[this.formatDate(event.date)] ?? [];
      presentEvents.push(event);
      daysMap[this.formatDate(event.date)] = presentEvents;
    });
    return daysMap;
  });

  private daysWithEvents = computed<CalendarDate[]>(() => {
    const date = new Date();
    date.setUTCFullYear(this.selectedYear(), this.selectedMonth(), 1);
    date.setMonth(date.getMonth() +1);
    date.setDate(date.getDate() -1);
    this.daysInMonth = date.getDate();

    return this.createArray(this.daysInMonth).map((v, i) => {
      const date = new Date(this.selectedYear(), this.selectedMonth(), v +1);
      return {
        date,
        column: date.getDay(),
        daysInMonth: this.daysInMonth,
        events: this.formatEvents()[this.formatDate(date)] ?? undefined,
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
      ...this.daysWithEvents(),
      ...nextMonth
    ];
  });
  // #region helpersMethods

  private formatDate(date: Date) {
    if (!date) throw new Error("Invalid Date");
    return `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
  }

  private createArray(length: number) {
    return Array.from(Array(length), (_, i) => i)
  }
  // #endregion

  // #region Public API functions
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
  // #endregion
}
