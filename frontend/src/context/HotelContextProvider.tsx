import { createContext, useState, useEffect } from "react";
import { GuestHouseModel } from "models/GuestHouseModel";
type Hotels = {
  hotels: GuestHouseModel[]
  hotelId: string | null;
  setHotelId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const HotelContext = createContext<Hotels>({
  hotels: [],
  hotelId: null,
  setHotelId: () => {},
});

export const HotelContextProvider: React.FC<{ children?: JSX.Element }> = ({
  children,
}) => {
  const [hotelId, setHotelId] = useState<string | null>(null);
  const [hotels, setHotels] = useState<GuestHouseModel[]>([]);

  useEffect(() => {
    const fetchHotel = async () => {
      const url = process.env.REACT_APP_BACKEND_API as string;
      const response = await fetch(`${url}/hotels`);

      if (!response.ok) {
        console.log("error");
      } else {
        const data: GuestHouseModel[] = await response.json();
        setHotels(data);
      }
    };

    const cleanup = setTimeout(() => {
      fetchHotel();
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);
  return (
    <HotelContext.Provider value={{ hotels, hotelId, setHotelId }}>
      {children}
    </HotelContext.Provider>
  );
};
