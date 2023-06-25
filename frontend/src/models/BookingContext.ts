export interface BookingContextModel {
  isShowForm: boolean;
  initialPrice: number;
  date: {
    firstDate: string;
    endDate: string;
  };
  price: {
    HUF: number;
    EUR: number;
  };
  nightAmount: number;
  persons: {
    children: number;
    adults: number;
  };
  calcNightAmountHandler: (date: string, date2: string) => void;
  calcPriceHandler: (amount: number) => void;
  personsCounterHandler: (adults: number, children: number) => void;
  hideFormHandler: () => void;
}
