import React, { useContext, useEffect, useState } from "react";
import { HotelContext } from "../context/HotelContextProvider";
import { useSearchParams } from "react-router-dom";
import { GuestHouseModel } from "../models/GuestHouseModel";

const ChangeHotelComponent: React.FC<{ path: string }> = ({ path }) => {
  const [hotels, setHotels] = useState<GuestHouseModel[]>([]);
  let [hotelQuery, setHotelQuery] = useSearchParams();
  const hotelCtx = useContext(HotelContext);

  useEffect(() => {
    const fetchHotels = async () => {
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
      fetchHotels();
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);

  const changeHotelHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLSelectElement)) return;

    const value = e.target.value as string;

    hotelCtx.setHotelId(value);
    setHotelQuery((prev) => {
      prev.set("hotel", value);
      return prev;
    });
  };
  return (
    <div className="w-full flex flex-col mobile:flex-row gap-2 items-center ">
      <h2 className="text-dynamicDesc font-semibold">
        Másik vendégházat választok
      </h2>
      <select
        onChange={changeHotelHandler}
        className="w-full mobile:w-[unset] ring-0 border-0 outline-none rounded-lg bg-gray-300 text-gray-900 font-semibold focus:ring-0 active:ring-0 shadow-md"
      >
        {hotels?.map((hotel) => (
          <option
            value={hotel._id}
            key={hotel._id}
            selected={hotel._id === hotelQuery.get("hotel")}
          >
            {hotel.hotelName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChangeHotelComponent;
