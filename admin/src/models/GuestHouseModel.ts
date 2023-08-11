import { v4 as uuid } from "uuid";
export interface GuestHouseModel {
  _id?: string;
  hotelName: string;
  country: string;
  postalCode: number;
  city: string;
  street: string;
  NTAK: string;
  price: number;
  discountPrice: number;
  roomAmount: number;
  maxPersonAmount: number;
  description: string;
  services: Service[];
  createdAt?: string;
  updatedAt?: string;
}

export class Service {
  id: string;
  value: string;
  icon: string;
  hidden?: boolean;

  constructor(value: string, icon: string) {
    this.id = uuid();
    this.value = value;
    this.icon = icon;
    this.hidden = false;
  }
}
