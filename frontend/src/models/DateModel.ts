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
