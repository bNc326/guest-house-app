import React, { useContext } from "react";
import Container from "components/UI/Container";
import HotelCard from "components/GuestHouseComponents/HotelCard";
import { useRouteLoaderData } from "react-router-dom";
import { GuestHouseModel } from "models/GuestHouseModel";
import { HotelContext } from "context/HotelContextProvider";
import { ClipLoader } from "react-spinners";

const GuestHouses = () => {
  const data = useRouteLoaderData("guestHouses") as GuestHouseModel[];
  const hotelCtx = useContext(HotelContext);
  return (
    <section className="guest-house-bg w-full h-full flex justify-center py-10">
      <div className="w-[1366px] h-full flex gap-4">
        <article className=" rounded-lg w-full p-4 flex flex-col items-center justify-center h-full gap-4">
          {hotelCtx.hotels &&
            hotelCtx.hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          {hotelCtx.hotels.length === 0 && (
            <ClipLoader loading size={40} color="#7F5539" />
          )}
        </article>
      </div>
    </section>
  );
};

export default GuestHouses;
