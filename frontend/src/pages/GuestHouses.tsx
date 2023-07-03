import React from "react";
import Container from "components/UI/Container";
import HotelCard from "components/GuestHouseComponents/HotelCard";

const GuestHouses = () => {
  return (
    <section className="guest-house-bg w-full h-screen flex justify-center py-10">
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
        <article className="bg-palette-3 rounded-lg w-full h-[80vh] overflow-y-scroll shadow-shadow p-4 flex flex-col gap-4">
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
        </article>
      </div>
    </section>
  );
};

export default GuestHouses;
