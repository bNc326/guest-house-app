import { createContext, useState, useEffect } from "react";
import { GuestHouseModel } from "../models/GuestHouseModel";
type Hotels = {
  hotelId: string | null;
  setHotelId: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  hotels?: Array<{ _id: string; hotelName: string }>;
};

export const HotelContext = createContext<Hotels>({
  hotelId: null,
  setHotelId: () => {},
  loading: false,
});

export const HotelContextProvider: React.FC<{ children?: JSX.Element }> = ({
  children,
}) => {
  const [hotelId, setHotelId] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Array<{ _id: string; hotelName: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      const url = process.env.REACT_APP_BACKEND_API as string;
      const response = await fetch(`${url}/hotels?filter=hotelName`);

      if (!response.ok) {
        console.log("error");
        setLoading(false);
      } else {
        const data: GuestHouseModel[] = await response.json();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("hotel");
        data.map((hotel) => {
          const hotelData = { _id: hotel._id ? hotel._id : '', hotelName: hotel.hotelName };
          setHotels((prev) => [...prev, hotelData]);
        });
        if (id) {
          setHotelId(id);
        } else {
          setHotelId(data[0]._id ? data[0]._id : null);
        }
        setLoading(false);
      }
    };

    const cleanup = setTimeout(() => {
      fetchHotel();
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);
  return (
    <HotelContext.Provider value={{ hotelId, setHotelId, loading, hotels }}>
      {children}
    </HotelContext.Provider>
  );
};
