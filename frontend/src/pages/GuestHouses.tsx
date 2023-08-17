import React, { useState, useContext, useLayoutEffect } from "react";
import HotelCard from "components/GuestHouseComponents/HotelCard";
import { HotelContext } from "context/HotelContextProvider";
import { ClipLoader } from "react-spinners";
import * as MaterialDesignIcon from "react-icons/md";
import { VscBlank } from "react-icons/vsc";
import { IconTypes } from "models/Icons";

const GuestHouses = () => {
  const hotelCtx = useContext(HotelContext);
  const [icons, setIcons] = useState<IconTypes>({});

  useLayoutEffect(() => {
    const cleanup = setTimeout(async () => {
      const updateIcons: IconTypes = {};
      updateIcons[VscBlank.name] = VscBlank;
      for (let [index, icon] of Object.entries(MaterialDesignIcon)) {
        updateIcons[index] = icon;
      }
      setIcons(updateIcons);
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);

  return (
    <section className="guest-house-bg w-full min-h-[100%] flex justify-center p-4 pt-20">
      <div className="w-[1366px] flex gap-4">
        <article
          id={"scroll_guesthouse"}
          className="w-full h-max flex items-center flex-col gap-4"
        >
          {hotelCtx.hotels &&
            hotelCtx.hotels.map((hotel, index) => (
              <HotelCard
                key={hotel._id}
                index={index}
                hotel={hotel}
                icons={icons}
              />
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
