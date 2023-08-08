import { InputValidator } from "./Input";

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
  services: Array<any>;
  feature: Array<any>;
  createdAt?: string;
  updatedAt?: string;
}


