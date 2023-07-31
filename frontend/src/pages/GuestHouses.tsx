import React, { useContext } from "react";
import 

HotelCard from "components/GuestHouseComponents/HotelCard";
import { HotelContext } from "context/HotelContextProvider";
import { ClipLoader } from "react-spinners";

const GuestHouses = () => {
  const hotelCtx = useContext(HotelContext);
  return (
    <section className="guest-house-bg w-full min-h-[100%] flex justify-center p-4 pt-20">
      <div className="w-[1366px] flex gap-4">
        <article
          id={"scroll_guesthouse"}
          className="w-full h-max flex items-center flex-col gap-4"
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
