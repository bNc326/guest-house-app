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
    <section className="guest-house-bg w-full min-h-[100%] flex justify-center p-4 pt-20">
      <div className="w-[1366px] flex gap-4">
        <article
          id={"scroll_guesthouse"}
          className="w-full h-full flex items-center flex-col gap-4"
        >
          {hotelCtx.hotels &&
            hotelCtx.hotels.map((hotel, index) => (
              <HotelCard key={hotel._id} index={index} hotel={hotel} />
            ))}
          {hotelCtx.hotels.length === 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <ClipLoader loading size={40} color="#7F5539" />
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default GuestHouses;
