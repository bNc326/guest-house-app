import React from "react";

const HelperBox = () => {
  return (
    <div className="w-11/12 max-w-[1920px]  bg-[#644632] p-4 rounded-3xl flex items-center justify-center">
      <ul className="flex gap-4 flex-wrap text-dynamicList w-full">
        <li className="flex gap-4 items-center text-palette-2 font-medium  w-max">
          <div className="w-dynamicHelperBox h-dynamicHelperBox bg-calendar border-[.5px] border-[#A2795A] flex items-center justify-center font-bold text-palette-2 text-dynamicList">
            13
          </div>
          Foglalható
        </li>
        <li className="flex gap-4 order-6 items-center text-palette-2 font-medium w-max ">
          <div className="w-dynamicHelperBox h-dynamicHelperBox bg-palette-4 helperTexture border-[.5px] border-[#A2795A] flex items-center justify-center font-bold text-palette-2 text-dynamicList opacity-50">
            13
          </div>
          Elfogadásra vár
        </li>
        <li className="flex gap-4 order-9 items-center text-palette-2 font-medium w-max ">
          <div className="flex flex-wrap gap-2">
            <div className="w-dynamicHelperBox h-dynamicHelperBox flex items-center border-[.5px] border-[#A2795A] justify-center font-bold text-palette-2 exampleSelect text-dynamicList">
              <p className="z-10">13</p>
            </div>
            <div className="w-dynamicHelperBox h-dynamicHelperBox flex items-center border-[.5px] border-[#A2795A] justify-center font-bold text-palette-2 bg-palette-5 text-dynamicList">
              <p className="z-10">14</p>
            </div>
            <div className="w-dynamicHelperBox h-dynamicHelperBox flex items-center border-[.5px] border-[#A2795A] justify-center font-bold text-palette-2 exampleSelectEnd text-dynamicList">
              <p className="z-10">15</p>
            </div>
          </div>
          Érkezés/távozás
        </li>
        <li className="flex gap-4 order-7 items-center text-palette-2 font-medium w-max ">
          <div className="w-dynamicHelperBox h-dynamicHelperBox flex items-center border-[.5px] border-[#A2795A] justify-center font-bold text-palette-2  exampleBooked text-dynamicList">
            <p className="z-10">13</p>
          </div>
          Délután,<span className="font-normal">nem foglalható</span>
        </li>
        <li className="flex gap-4 order-8 items-center text-palette-2 font-medium w-max ">
          <div className="w-dynamicHelperBox h-dynamicHelperBox flex items-center border-[.5px] border-[#A2795A] justify-center font-bold text-palette-2 exampleBookedEnd text-dynamicList">
            <p className="z-10">13</p>
          </div>
          Délelőtt, <span className="font-normal">nem foglalható</span>
        </li>
        <li className="flex gap-4 order-5  items-center text-palette-2 font-medium w-max ">
          <div className="w-dynamicHelperBox h-dynamicHelperBox bg-[#583b2a] opacity-50 border-[.5px] border-[#A2795A] flex items-center justify-center font-bold text-palette-2 text-dynamicList">
            13
          </div>
          nem foglalható
        </li>
        <li className="flex gap-4 items-center text-palette-2 font-medium w-max ">
          <div className="w-dynamicHelperBox h-dynamicHelperBox bg-[#583b2a] opacity-50 underline border-[.5px] border-[#A2795A] flex items-center justify-center font-bold text-palette-2 text-dynamicList">
            <p className="underline">13</p>
          </div>
          Mai nap
        </li>
      </ul>
    </div>
  );
};

export default HelperBox;
