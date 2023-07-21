import BookedDate from "./BookedDate";
import { DisabledDaysModel as DisabledDay } from "./DisabledDaysModel";
import { Ratings as Rating } from "./Ratings";

export interface GuestHouseModel {
  _id: string;
  hotelName: string;
  country: String;
  postalCode: number;
  city: string;
  street: string;
  NTAK: string;
  price: number;
  discountPrice?: number;
  roomAmount: number;
  maxPersonAmount: number;
  description: string;
  service: string[];
  feature: string[];
  bookedDates: BookedDate[],
  disabledDays: DisabledDay[],
  ratings: Rating[]
}