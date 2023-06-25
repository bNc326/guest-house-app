export interface price {
  EUR: number;
  HUF: number;
}

export interface costumer {
  name: string;
  email: string;
  phone: string;
  address: {
    country: string;
    postalCode: number;
    city: string;
    street: string;
  };
}

export interface BookingDateObject extends Record<string, any> {
  _id: string;
  startDate: Date | string;
  endDate: Date | string;
  nightAmount: number;
  personsAmount: number;
  price: price;
  costumer: costumer;
  status: "Accepted" | "Pending" | "Ejected";
  createdAt: Date;
}

export type BookingDate = [BookingDateObject];
