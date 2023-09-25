import React from "react";
import { BookingContextModel } from "models/BookingContext";
import { Separator } from "pages/Calendar";
const BookingPreview: React.FC<{
  bookingCtx: BookingContextModel;
  children: JSX.Element;
  
}> = ({ bookingCtx, children}) => {
  return (
    <div className="w-11/12 relative max-w-[1920px] flex flex-col items-center bg-[#442c15] p-4 gap-2 rounded-3xl">
      <h2 className="flex items-center justify-center gap-4 w-full text-dynamicTitle3 text-[#E2C8AE]">
        <span className="font-bold ">Foglalás</span>
      </h2>
      <div className="flex flex-col justify-center items-center gap-4  w-full">
        <Separator title={"Foglalás részletei"} />
        <div className="w-full flex flex-col gap-4 bg-palette-3 rounded-3xl p-4">
          <ul className="flex flex-col text-dynamicList text-palette-4 w-full">
            <li className="w-full flex items-center justify-between border-b-[.5px] border-palette-4/50 p-2">
              <div>Érkezés</div>
              <div className="font-bold">{bookingCtx.date.firstDate}</div>
            </li>
            <li className="w-full flex items-center justify-between border-b-[.5px] border-palette-4/50 p-2">
              <div>Távozás</div>
              <div className="font-bold">{bookingCtx.date.endDate}</div>
            </li>
            <li className="w-full flex items-center justify-between border-b-[.5px] border-palette-4/50 p-2">
              <div>Éjszakák száma</div>
              <div className="font-bold">{bookingCtx.nightAmount}</div>
            </li>
          </ul>
          <div className="w-full flex flex-col mobile:flex-row items-center justify-between rounded-xl p-2 bg-palette-5 text-palette-3 text-dynamicList">
            <h3 className="font-bold">Összesen</h3>
            <div className="font-semibold">
              {bookingCtx.price.HUF} Ft /{" "} 
              <span>{bookingCtx.price.EUR} &#8364;</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BookingPreview;
