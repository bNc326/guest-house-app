import React from "react";
import {
  IS_SURE_ENUM,
  IS_SURE_INITIAL_STATE,
  IS_SURE_ACTION,
} from "../../models/IsSure/IsSure";
import { BookingDateObject } from "../../models/Booking/BookingDate";
import { Params } from "react-router-dom";
import { format } from "date-fns";
import { HiUser, HiPhone, HiMail } from "react-icons/hi";
const EditBookingPreview: React.FC<{
  data: BookingDateObject;
  isSureDispatch: React.Dispatch<IS_SURE_ACTION>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, isSureDispatch, setShowModal }) => {
  return (
    <article className="p-4 border-gray-300 border flex flex-col space-y-8 rounded-lg w-full laptop:w-4/5 desktop:w-1/2">
      <div className="w-full flex flex-col tablet:flex-row gap-4">
        <div className=" w-full flex flex-col gap-2 justify-between">
          <span>
            <h2 className="text-dynamicTitle3 font-bold uppercase">Foglalás</h2>
            <h3 className="text-dynamicMedium opacity-50 font-medium">
              foglalás azonosító: {data._id}
            </h3>
          </span>
          <h4 className="text-dynamicDesc">
            Státusz:{" "}
            {data.status === "Accepted" && (
              <span className="font-bold uppercase text-green-600">
                Elfogadva
              </span>
            )}
            {data.status === "Pending" && (
              <span className="font-bold uppercase text-yellow-600">
                Függőben
              </span>
            )}
            {data.status === "Ejected" && (
              <span className="font-bold uppercase text-red-600">
                Elutasítva
              </span>
            )}
          </h4>
        </div>
        <div className=" w-full flex flex-col items-end gap-2">
          <div>
            <div>
              <h3 className="font-bold text-dynamicDesc">Foglaló</h3>
              <ul className="text-dynamicList flex flex-col ">
                <li className="flex items-center gap-1">
                  <HiUser />
                  {data.name}
                </li>
                <li className="flex items-center gap-1">
                  <HiMail />
                  {data.email}
                </li>
                <li className="flex items-center gap-1">
                  <HiPhone />
                  {data.phone}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-dynamicDesc">Cím</h3>
              <ul className="text-dynamicList flex flex-col">
                <li>{data.country}</li>
                <li>
                  {data.postalCode},{" "}
                  {data.city}
                </li>
                <li>{data.street}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-dynamicDesc">Foglalás részletei</h3>
        <ul className="text-dynamicList py-2">
          <li className="flex justify-between py-1 border-b-[0.5px] border-black/20">
            Érkezés
            <span className="font-bold">
              {format(new Date(data.startDate), "yyyy-MM-dd")}
            </span>
          </li>
          <li className="flex justify-between py-1 border-b-[0.5px] border-black/20">
            Távozás
            <span className="font-bold">
              {format(new Date(data.endDate), "yyyy-MM-dd")}
            </span>
          </li>
          <li className="flex justify-between py-1 border-b-[0.5px] border-black/20">
            Éjszakák száma
            <span className="font-bold">{data.nightAmount}</span>
          </li>
          <li className="flex justify-between py-1 border-b-[0.5px] border-black/20">
            Személyek száma
            <span className="font-bold">{data.personsAmount}</span>
          </li>
          <li className="flex justify-between py-1 border-b-[0.5px] border-black/20">
            Összeg
            <span className="font-bold">
              {data.HUF} Ft / {data.EUR} &#8364;
            </span>
          </li>
        </ul>
      </div>
      <div className="flex justify-between">
        <span className="flex gap-2 text-dynamicMedium">
          {data.status !== "Accepted" && (
            <button
              onClick={() => {
                isSureDispatch({ type: IS_SURE_ENUM.ACCEPT });
                setShowModal(true);
              }}
              className="border-green-600 border-2 rounded-xl p-2 text-green-600 font-bold"
            >
              Elfogadás
            </button>
          )}
          {data.status !== "Ejected" && (
            <button
              onClick={() => {
                isSureDispatch({ type: IS_SURE_ENUM.EJECT });
                setShowModal(true);
              }}
              className=" border-red-600 border-2 rounded-xl p-2 text-red-600 font-bold"
            >
              Elutasítás
            </button>
          )}
        </span>
      </div>
    </article>
  );
};

export default EditBookingPreview;
