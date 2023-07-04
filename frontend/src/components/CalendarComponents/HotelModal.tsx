import React, { useContext } from "react";
import { GuestHouseModel } from "models/GuestHouseModel";
import { HotelContext } from "context/HotelContextProvider";
const HotelModal: React.FC<{ hotels: GuestHouseModel[] }> = ({ hotels }) => {
  const hotelCtx = useContext(HotelContext);
  console.log("context", hotelCtx);
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black/50 z-[1500] backdrop-blur-sm">
      <div className="bg-palette-3 rounded-lg w-11/12 max-w-[630px]  p-4 py-8 shadow-xl flex flex-col justify-center items-center gap-2">
        <div className="text-center">
          <h2 className="text-dynamicTitle uppercase font-bold text-palette-4">
            Foglalás
          </h2>
          <h3 className="text-dynamicList">
            Válaszd ki melyik vendégháznál szeretnél foglalni!
          </h3>
        </div>
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            onClick={() => hotelCtx.setHotelUUID(hotel.hotelUUID)}
            className="text-center bg-palette-4 w-full rounded-lg p-1 text-white font-semibold cursor-pointer hover:bg-palette-4/80 transition-all ease-in-out duration-300"
          >
            <span>{hotel.hotelName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelModal;