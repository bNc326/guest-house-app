import BookedDate from "./BookedDate";
import { DisabledDaysModel } from "./DisabledDaysModel";

interface UnavailableDates {
  bookedDates: BookedDate[];
  disabledDays: DisabledDaysModel[];
}

export default UnavailableDates;
