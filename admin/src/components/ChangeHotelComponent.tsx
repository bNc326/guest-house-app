import React, { useContext, useEffect, useState } from "react";
import { HotelContext } from "../context/HotelContextProvider";
import { useSearchParams } from "react-router-dom";
import { GuestHouseModel } from "../models/GuestHouseModel";
import { Select } from "flowbite-react";

const ChangeHotelComponent = () => {
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
      <Select
        sizing={"sm"}
        onChange={changeHotelHandler}
        className="w-full mobile:w-[unset] ring-0 border-0 outline-none rounded-lg bg-gray-300 text-gray-900 font-semibold focus:ring-0 active:ring-0 text-dynamicSmall"
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
      </Select>
    </div>
  );
};

export default ChangeHotelComponent;
