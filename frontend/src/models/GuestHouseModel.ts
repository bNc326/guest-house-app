export type Impressum = {
  NTAK_regNumber: string;
  city: string;
  country: string;
  postalCode: number;
  street: string;
};

export interface GuestHouseModel {
  _id: string;
  hotelUUID: string;
  hotelName: string;
  description: string;
  maxPersonAmount: number;
  roomAmount: number;
  discountPrice: number | null;
  price: number;
  impressum: Impressum;
  service: string[];
  feature: string[];
}
