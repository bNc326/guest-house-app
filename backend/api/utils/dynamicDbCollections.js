import mongoose from "mongoose";
import { BookingSchema } from "../models/Booking.js";
import { DisabledDaysSchema } from "../models/DisabledDays.js";
import { RatingSchema } from "../models/Rating.js";

export const BookingDynamic = (collection) => {
  return mongoose.model(`${collection}-bookings`, BookingSchema);
};
export const DisabledDayDynamic = (collection) => {
  return mongoose.model(`${collection}-disabled-days`, DisabledDaysSchema);
};
export const RatingDynamic = (collection) => {
  return mongoose.model(`${collection}-ratings`, RatingSchema);
};
