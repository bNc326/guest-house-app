import React from "react";
import Container from "components/UI/Container";
import HotelCard from "components/GuestHouseComponents/HotelCard";
import { useRouteLoaderData } from "react-router-dom";
import { GuestHouseModel } from "models/GuestHouseModel";

const GuestHouses = () => {
  const data = useRouteLoaderData("guestHouses") as GuestHouseModel[];
  return (
    <section className="guest-house-bg w-full h-full flex justify-center py-10">
      <div className="w-[1366px] flex gap-4">
        {/* <aside className="bg-palette-3 rounded-lg shadow-shadow w-1/3">
          <ul>
            <li></li>
            <li>fJkZFJ</li>
            <li>xxhngkItZxhTgzipdaA</li>
            <li>TSDFUrEetfhPWeldmihv</li>
            <li>ysYjHcyYt</li>
            <li>IkbAQPHjsNQMAasqdd</li>
            <li>bYFSrmKEnmXnfP</li>
            <li>UdZuEzvLeeHUmfnSbm</li>
            <li>WQrEj</li>
            <li>fXZtMAc</li>
          </ul>
        </aside> */}
        <article className=" rounded-lg w-full p-4 flex flex-col gap-4">
          {data &&
            data.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}

        </article>
      </div>
    </section>
  );
};

export default GuestHouses;

export const loader = async () => {
  const api = process.env.REACT_APP_BACKEND_API as string;
  const response = await fetch(`${api}/hotels`);

  if (!response.ok) {
    console.log("error");
  } else {
    return response;
  }
};
