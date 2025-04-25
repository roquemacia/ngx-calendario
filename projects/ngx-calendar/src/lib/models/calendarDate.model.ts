import { CalendarEvent } from "./calendarEvent.model";

export interface CalendarDate {
  date: Date;
  events?: CalendarEvent[];
}
