import { format } from "date-fns";
import { v4 as uuid } from "uuid";

interface DateModel {
  id: string;
  arrayIndex?: number;
  value?: number | string;
  prevMonth?: boolean;
  nextMonth?: boolean;
  date?: string;
  today?: boolean;
  startSelected?: boolean;
  endSelected?: boolean;
  selected?: boolean;
  disabled?: boolean;
  startBooked?: boolean;
  endBooked?: boolean;
  booked?: boolean;
  disabledDays?: boolean;
  pendingBooking?: boolean;
  startPendingBooking?: boolean;
  endPendingBooking?: boolean;
  bookedAndPendingBooked?: boolean;
}

export default DateModel;



export class Day {
  id: string;
  arrayIndex?: number;
  value?: number | string;
  prevMonth?: boolean;
  nextMonth?: boolean;
  date?: string;
  today?: boolean;
  startSelected?: boolean;
  endSelected?: boolean;
  selected?: boolean;
  disabled?: boolean;
  startBooked?: boolean;
  endBooked?: boolean;
  booked?: boolean;
  disabledDays?: boolean;
  pendingBooking?: boolean;
  startPendingBooking?: boolean;
  endPendingBooking?: boolean;
  bookedAndPendingBooked?: boolean;

  constructor(
    day: number,
    month: number,
    date: Date,
    prevMonth?: boolean,
    nexMonth?: boolean
  ) {
    this.id = uuid();
    this.arrayIndex = month;
    this.value = day;
    this.prevMonth = prevMonth || false;
    this.nextMonth = nexMonth || false;
    this.date = this.formatDate(date);
    this.today = this.getToday(date);
    this.disabled = this.getDisabled(date);
    this.booked = this.getBooked(date);
  }

  private getToday(date: Date) {
    return format(new Date(), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
  }

  private getDisabled(date: Date) {
    return new Date() > date;
  }

  formatDate(date: Date) {
    return format(date, "yyyy-MM-dd");
  }

  private getBooked(date: Date) {
    return false;
  }
}
export class PrevDays {

}
