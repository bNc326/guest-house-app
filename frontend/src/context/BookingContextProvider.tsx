import {
  createContext,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import { BookingContextModel } from "models/BookingContext";
import { intervalToDuration, formatDuration } from "date-fns";
import { HotelContext } from "./HotelContextProvider";
import { GuestHouseModel } from "models/GuestHouseModel";
export const BookingContext = createContext<BookingContextModel>({
  isShowForm: false,
  initialPrice: 0,
  date: {
    firstDate: "",
    endDate: "",
  },
  price: {
    HUF: 0,
    EUR: 0,
  },
  nightAmount: 0,
  persons: {
    children: 0,
    adults: 0,
  },
  personsCounterHandler: () => {},
  calcNightAmountHandler: () => {},
  calcPriceHandler: () => {},
  hideFormHandler: () => {},
});

const BookingProvider: React.FC<{ children: JSX.Element }> = (props) => {
  const [renderBookingData, setRenderBookingData] = useState({
    isShowForm: false,
    initialPrice: 0,
    date: {
      firstDate: "",
      endDate: "",
    },
    price: {
      HUF: 0,
      EUR: 0,
    },
    nightAmount: 0,
    persons: {
      children: 0,
      adults: 0,
    },
  });
  const hotelCtx = useContext(HotelContext);
  const fetchExchangeRate = async (amount: number) => {
    const key = process.env.REACT_APP_EXCHANGE_API_KEY as string;
    const url = `https://v6.exchangerate-api.com/v6/${key}/pair/HUF/EUR/${amount}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log("error");
    } else {
      const data = await response.json();
      return data;
    }
  };

  useLayoutEffect(() => {
    const getInitialPrice = () => {
      hotelCtx.hotels.map((hotel) => {
        if (hotel._id === hotelCtx.hotelId) {
          if (hotel.discountPrice) {
            setRenderBookingData((prev) => {
              return { ...prev, initialPrice: hotel.discountPrice as number };
            });
          } else {
            setRenderBookingData((prev) => {
              return { ...prev, initialPrice: hotel.price as number };
            });
          }
        }
      });
    };

    const cleanup = setTimeout(() => {
      getInitialPrice();
    }, 100);
    return () => clearTimeout(cleanup);
  }, [hotelCtx.hotelId]);

  const bookingContext: BookingContextModel = {
    isShowForm: renderBookingData.isShowForm,
    initialPrice: renderBookingData.initialPrice,
    date: {
      firstDate: renderBookingData.date.firstDate,
      endDate: renderBookingData.date.endDate,
    },
    price: {
      HUF: renderBookingData.price.HUF,
      EUR: renderBookingData.price.EUR,
    },
    nightAmount: renderBookingData.nightAmount,
    persons: {
      children: renderBookingData.persons.children,
      adults: renderBookingData.persons.children,
    },
    calcNightAmountHandler: function (date: string, date2: string) {
      setRenderBookingData((prevState) => {
        prevState.date.firstDate = date;
        prevState.date.endDate = date2;
        return prevState;
      });
      const startDate = new Date(date).getTime();
      const endDate = new Date(date2).getTime();
      const calcNight = endDate - startDate;
      const result = Math.trunc(calcNight / (1000 * 3600 * 24));
      setRenderBookingData((prevState) => {
        return { ...prevState, nightAmount: result };
      });
      this.calcPriceHandler(result);
    },
    calcPriceHandler: async function (amount: number) {
      const calcPriceInHUF = Math.trunc(amount * this.initialPrice);
      setRenderBookingData((prevState) => {
        return {
          ...prevState,
          price: { ...prevState.price, HUF: calcPriceInHUF },
        };
      });
      const data = await fetchExchangeRate(calcPriceInHUF);
      if (data) {
        setRenderBookingData((prevState) => {
          return {
            ...prevState,
            price: {
              ...prevState.price,
              EUR: Math.ceil(data["conversion_result"]),
            },
          };
        });
        setRenderBookingData((prevState) => {
          return { ...prevState, isShowForm: true };
        });
      }
    },
    personsCounterHandler: function (adults: number, children: number) {
      setRenderBookingData((prevState) => {
        return {
          ...prevState,
          persons: { ...prevState.persons, children: children },
        };
      });
      setRenderBookingData((prevState) => {
        return {
          ...prevState,
          persons: { ...prevState.persons, adults: adults },
        };
      });
    },
    hideFormHandler: function () {
      setRenderBookingData((prevState) => {
        return { ...prevState, isShowForm: false };
      });
    },
  };
  return (
    <BookingContext.Provider value={bookingContext}>
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
