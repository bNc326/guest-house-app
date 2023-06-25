export interface SendBookingModel {
  price: {
    EUR: number;
    HUF: number;
  };
  costumer: {
    address: {
      country: string;
      postalCode: number;
      city: string;
      street: string;
    };
    name: string;
    email: string;
    phone: string;
  };
  startDate: string | Date;
  endDate: string | Date;
  nightAmount: number;
  personsAmount: number;
  status: "Pending";
}
