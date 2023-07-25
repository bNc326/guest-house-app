export interface BookingDateObject extends Record<string, any> {
  _id: string;
  startDate: string;
  endDate: string;
  nightAmount: number;
  personsAmount: number;
  EUR: number;
  HUF: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  postalCode: number;
  city: string;
  street: string;
  status: "Accepted" | "Pending" | "Ejected";
}

export type BookingDate = [BookingDateObject];
