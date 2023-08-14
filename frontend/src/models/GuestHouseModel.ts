import BookedDate from "./BookedDate";
import { DisabledDaysModel as DisabledDay } from "./DisabledDaysModel";
import { Ratings as Rating } from "./Ratings";

export interface GuestHouseModel {
  _id: string;
  hotelName: string;
  country: string;
  postalCode: number;
  city: string;
  street: string;
  NTAK: string;
  price: number;
  discountPrice?: number;
  roomAmount: number;
  maxPersonAmount: number;
  description: string;
  services: Service[];
  bookedDates: BookedDate[];
  disabledDays: DisabledDay[];
  ratings: Rating[];
}

export interface Service {
  id: string;
  value: string;
  icon: string;
  hidden?: boolean;
}
