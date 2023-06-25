export interface impressum {
  country: string;
  postalCode: number;
  city: string;
  street: string;
  NTAK_regNumber: string;
}

export interface HotelsModelObject extends Record<string, any>  {
  _id?: string;
  hotelName: string;
  impressum: impressum;
  services: string[];
  feature: string[];
  price: number;
  roomAmount: number;
  maxPersonAmount: number;
  description: string;
}

export type HotelsModel = [HotelsModelObject];
