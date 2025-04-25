import { DatePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { CalendarDate } from './models/calendarDate.model';

@Component({
  selector: 'ngx-calendar',
  imports: [DatePipe],
  templateUrl: "./ngx-calendar.component.html",
  styleUrls: ["./ngx-calendar.component.scss"]
})
export class NgxCalendar {
  dayHeaders = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days = signal<CalendarDate[]>([]);

  selectedYear = signal(2000);
  selectedMonth = signal(0);

  lastDayPrevMonth = 0;
  firstDayNextMonth = 0;

  selectedMonthEffect = effect(() => {
    const dummyDate = new Date();
    //Get first date
    dummyDate.setUTCFullYear(this.selectedYear(), this.selectedMonth(), 1);
    dummyDate.setUTCHours(0, 0, 0);
    const leftOffset = dummyDate.getDay() - 1;
    const lastMonth = this.createArray(leftOffset);
    dummyDate.setUTCMonth(dummyDate.getMonth() +1);
    dummyDate.setUTCDate(dummyDate.getDate() -1);
    const rightOffset = dummyDate.getDay() - 1;
    const nextMonth = this.createArray(Math.abs(rightOffset - 6));
    this.days.set([
      ...lastMonth,
      ...this.createArray(dummyDate.getDate()).map((v, i) => {
        const date = new Date();
        date.setUTCFullYear(this.selectedYear(), this.selectedMonth(), i+1);
        return {
          date: date,
        };
      }),
      ...nextMonth
    ] as CalendarDate[]);
  });

  formatDate(date: Date) {
    if (!date) throw new Error("Invalid Date");
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
  }

  createArray(length: number) {
    return Array.from(Array(length), (_, i) => i)
  }

  next() {
    this.selectedMonth.update((m) =>
      (m == 11) ? 0 : ++m
    );
  }

  previous() {
    this.selectedMonth.update((m) =>
      (m == 0) ? 11 : --m
    );
  }
}
