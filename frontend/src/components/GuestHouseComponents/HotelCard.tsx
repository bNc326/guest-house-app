import React from "react";
import {
  FaParking,
  FaWifi,
  FaBed,
  FaStar,
  FaUtensils,
  FaTv,
  FaCreditCard,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import Capsule from "../HomeComponents/Welcome/Capsule";
import { Rating, Button } from "flowbite-react";

const HotelCard = () => {
  return (
    <div className="w-full h-full rounded-xl bg-palette-2  shadow-lg flex">
      <div className="w-full max-w-[450px]">
        <img
          src="/static/media/room.869d8aefa93ad239dae6.jpg"
          alt=""
          className="rounded-l-xl"
        />
      </div>
      <div className="flex w-full gap-4 p-4 ">
        <div className="flex flex-col w-2/3 justify-between ">
          <div className="flex flex-col">
            <h2 className="text-dynamicDesc font-semibold">Derek's Hotel</h2>
            <p className="flex gap-2 text-dynamicList">
              <span className="flex items-center gap-1 text-palette-4 font-bold">
                <FaBed /> 2 szoba
              </span>
              <span className="flex items-center gap-1 text-palette-4 font-bold">
                <FaUsers /> 5 fő
              </span>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-1 pb-2">
              <h3 className="font-semibold text-dynamicList">Szolgáltatások</h3>
              <ul className="flex flex-wrap w-full z-0 text-dynamicSmall gap-2 text-palette-3 font-semibold">
                <Capsule
                  Icon={FaParking}
                  text="Ingyenes parkolás"
                  iconSize={16}
                />
                <Capsule
                  Icon={FaUtensils}
                  text="Étterrem"
                  className="mobile:order-8 tablet:order-none"
                  iconSize={16}
                />
                <Capsule Icon={FaWifi} text="Ingyenes wifi" iconSize={16} />
                <Capsule Icon={BiArea} text="60m2" iconSize={16} />
                <Capsule
                  Icon={FaCreditCard}
                  text="Bankkártya & SZÉP kártya"
                  iconSize={16}
                />
                <Capsule Icon={FaTv} text="Síkképernyős TV" iconSize={16} />
                <Capsule
                  Icon={TbAirConditioning}
                  text="Légkondícionáló"
                  iconSize={16}
                />
              </ul>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-dynamicList">Extrák</h3>
              <ul className="flex flex-wrap w-full z-0 text-dynamicSmall gap-2 text-palette-3 font-semibold">
                <Capsule Icon={FaStar} text="Finn Sauna" iconSize={16} />
                <Capsule Icon={FaStar} text="Wellness" iconSize={16} />
                <Capsule Icon={FaStar} text="Dézsa fűrdő" iconSize={16} />
                <Capsule Icon={FaStar} text="Dézsa fűrdő" iconSize={16} />
                <Capsule Icon={FaStar} text="Fél panzio" iconSize={16} />
              </ul>
            </div>
          </div>
        </div>
        <Separator />
        <div className="w-1/3 flex flex-col justify-center h-full ">
          <Rating className="flex flex-col ">
            <div className="flex  w-full justify-center">
              <Rating.Star filled />
              <Rating.Star filled />
              <Rating.Star filled />
              <Rating.Star filled />
              <Rating.Star className="fill-gray-700" />
            </div>
            <div className="flex flex-col items-center w-full">
              <p className="font-bold text-dynamicTitle3">4.95</p>
              <a
                className="font-medium underline hover:no-underline"
                href="asd"
              >
                <p className="whitespace-nowrap text-dynamicMedium">
                  13 Értékelés
                </p>
              </a>
            </div>
          </Rating>
          <div className="text-center h-full flex flex-col justify-end gap-1">
            <div className="flex justify-center items-center gap-2">
              <div className="flex flex-col">
                <span className="line-through text-dynamicList">
                  42.990 Ft/éj/ház
                </span>
                <p className="font-bold text-dynamicDesc">39.990 Ft/éj/ház</p>
              </div>
              <div className="w-max flex items-center justify-center bg-palette-5 opacity-80 shadow-lg rounded-lg p-2 text-white font-bold">
                -7%
              </div>
            </div>
            <button className="w-full flex gap-2 items-center justify-center bg-palette-4 hover:opacity-80 text-palette-2 font-bold p-2 rounded-md shadow-md transition-all ease-in-out duration-300">
              Megnézem
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

export const Separator = () => {
  return <span className="w-[5px] h-[95%] bg-palette-4/50 rounded-md"></span>;
};
