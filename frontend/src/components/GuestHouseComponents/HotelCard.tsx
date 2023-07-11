import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import Capsule from "../HomeComponents/Welcome/Capsule";
import { Rating, Button, Tooltip } from "flowbite-react";
import { GuestHouseModel } from "models/GuestHouseModel";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { HotelContext } from "context/HotelContextProvider";
import {
  MdLocalParking,
  MdWifi,
  MdBed,
  MdFlatware,
  MdTv,
  MdOutlineCreditScore,
  MdBabyChangingStation,
  MdFamilyRestroom,
  MdWorkspacePremium,
  MdOutlineOutdoorGrill,
  MdSpa,
} from "react-icons/md";

const HotelCard: React.FC<{ hotel: GuestHouseModel }> = ({ hotel }) => {
  const navigate = useNavigate();
  const hotelCtx = useContext(HotelContext);
  const address = `${hotel.impressum.postalCode} ${hotel.impressum.city}, ${hotel.impressum.street}`;

  return (
    <div className="w-full h-full rounded-xl bg-palette-2  shadow-lg flex flex-col items-center mobile:flex-row p-4 gap-4">
      <div className="w-full shadow-md">
        <img
          src="/static/media/room.869d8aefa93ad239dae6.jpg"
          alt=""
          className="rounded-xl w-full h-full "
        />
      </div>

      <div className="flex flex-col-reverse w-full h-full gap-4">
        <div className="flex flex-col w-full justify-between ">
          <div className="flex flex-col">
            <h2 className="text-dynamicDesc font-semibold flex items-center gap-2">
              {hotel?.hotelName}
              <Tooltip
                content={
                  <span className="text-palette-3 text-dynamicMedium font-semibold font- w-full max-w-[200px] break-words">
                    {hotel.description}
                  </span>
                }
                placement="right"
                className="bg-palette-4/70 backdrop-blur-[2px] max-w-[200px]"
                arrow={false}
              >
                <BsFillInfoCircleFill className="fill-palette-4/80" size={20} />
              </Tooltip>
            </h2>
            <p className="text-dynamicMedium">{address}</p>
            <p className="flex gap-2 text-dynamicList">
              <span className="flex items-center gap-1 text-palette-4 font-bold">
                <MdBed /> {hotel?.roomAmount} szoba
              </span>
              <span className="flex items-center gap-1 text-palette-4 font-bold">
                <MdFamilyRestroom /> {hotel?.maxPersonAmount} fő
              </span>
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-1 pb-2">
              <h3 className="font-semibold text-dynamicList">Szolgáltatások</h3>
              <ul className="flex flex-wrap w-full z-0 text-dynamicSmall gap-2 text-palette-3 font-semibold">
                <Capsule
                  Icon={MdLocalParking}
                  text="Ingyenes parkolás"
                  iconSize={16}
                />
                <Capsule
                  Icon={MdFlatware}
                  text="Étterrem"
                  className="mobile:order-8 tablet:order-none"
                  iconSize={16}
                />
                <Capsule Icon={MdWifi} text="Ingyenes wifi" iconSize={16} />
                <Capsule Icon={BiArea} text="60m2" iconSize={16} />
                <Capsule
                  Icon={MdOutlineCreditScore}
                  text="Bankkártya & SZÉP kártya"
                  iconSize={16}
                />
                <Capsule Icon={MdTv} text="Televízió" iconSize={16} />
                <Capsule
                  Icon={TbAirConditioning}
                  text="Légkondícionáló"
                  iconSize={16}
                />
                <Capsule
                  Icon={MdBabyChangingStation}
                  text="Bababarát hely"
                  iconSize={16}
                />
                <Capsule
                  Icon={MdOutlineOutdoorGrill}
                  text="Grillező hely"
                  iconSize={16}
                />
                <Capsule Icon={MdSpa} text="Gyógyfűrdő 500m" iconSize={16} />
              </ul>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-dynamicList">Extrák</h3>
              <ul className="flex flex-wrap w-full z-0 text-dynamicSmall gap-2 text-palette-3 font-semibold">
                <Capsule
                  Icon={MdWorkspacePremium}
                  text="Finn Sauna"
                  iconSize={16}
                />
                <Capsule
                  Icon={MdWorkspacePremium}
                  text="Wellness"
                  iconSize={16}
                />
                <Capsule
                  Icon={MdWorkspacePremium}
                  text="Dézsa fűrdő"
                  iconSize={16}
                />
                <Capsule
                  Icon={MdWorkspacePremium}
                  text="Fél panzio"
                  iconSize={16}
                />
              </ul>
            </div>
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col justify-center h-full bg-palette-3/60  shadow-md rounded-xl p-2 relative">
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
            <div className="flex justify-center items-center gap-2 ">
              {hotel.discountPrice && (
                <>
                  <div className="flex flex-col">
                    <span className="line-through text-dynamicList">
                      {hotel?.price} Ft/éj/ház
                    </span>
                    <p className="font-bold text-dynamicDesc">
                      {hotel?.discountPrice} Ft/éj/ház
                    </p>
                  </div>
                  <div className="w-max text-dynamicMedium flex absolute top-4 right-4 items-center justify-center bg-palette-5 opacity-80 shadow-lg rounded-lg p-2 text-white font-bold">
                    {(hotel.price - hotel.discountPrice) / (hotel.price * 0.01)}
                    %
                  </div>
                </>
              )}
              {!hotel.discountPrice && (
                <div className="flex flex-col">
                  <p className="font-bold text-dynamicDesc">
                    {hotel?.price} Ft/éj/ház
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                hotelCtx.setHotelUUID(hotel.hotelUUID);
                navigate("/naptar", { relative: "path" });
              }}
              className="w-full flex gap-2 items-center justify-center bg-palette-4 hover:opacity-80 text-palette-2 font-bold p-2 rounded-md shadow-md transition-all ease-in-out duration-300"
            >
              Lefoglalom
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
  return (
    <span className="hidden w-[5px] h-[95%] bg-palette-4/50 rounded-md"></span>
  );
};
