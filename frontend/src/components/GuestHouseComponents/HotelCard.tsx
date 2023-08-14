import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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
import CountUp from "react-countup";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { IconTypes } from "models/Icons";

const HotelCard: React.FC<{
  hotel: GuestHouseModel;
  index: number;
  icons: IconTypes;
}> = ({ hotel, index, icons }) => {
  const navigate = useNavigate();
  const hotelCtx = useContext(HotelContext);
  const address = `${hotel.postalCode} ${hotel.city}, ${hotel.street}`;
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useLayoutEffect(() => {
    let count: number = 0;
    const calcRatingAvg = () => {
      if (hotel.ratings.length !== 0) {
        const calcAvg = (): number => {
          return sum / numberCount;
        };
        const numberCount: number = hotel.ratings.length;
        let sum: number = 0;

        hotel.ratings.map((rating) => {
          sum += rating.rating;
        });

        setRatingCount(calcAvg());
        count = calcAvg();
      }
    };

    const renderStars = () => {
      setStars([]);
      for (let i = 1; i <= 5; i++) {
        if (i <= count) {
          setStars((prev) => [...prev, <Rating.Star filled />]);
        } else {
          setStars((prev) => [
            ...prev,
            <Rating.Star key={i} className="fill-gray-700" />,
          ]);
        }
      }
    };

    const cleanup = setTimeout(() => {
      calcRatingAvg();
      renderStars();
    }, 100);
    return () => clearTimeout(cleanup);
  }, []);

  console.log("stars", stars);
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
            <AnimationOnScroll
              animateOnce
              animatePreScroll={false}
              animateIn={"animate__fadeInUp"}
              className={`text-dynamicMedium ${
                index === 0 ? "animate__animated animate__fadeInUp" : ""
              }`}
            >
              {address}
            </AnimationOnScroll>
            <AnimationOnScroll
              animateOnce
              animatePreScroll={false}
              animateIn={"animate__fadeInUp"}
              className={`flex gap-2 text-dynamicList ${
                index === 0 ? "animate__animated animate__fadeInUp" : ""
              }`}
            >
              <span className="flex items-center gap-1 text-palette-4 font-bold">
                <MdBed /> {hotel?.roomAmount} szoba
              </span>
              <span className="flex items-center gap-1 text-palette-4 font-bold">
                <MdFamilyRestroom /> {hotel?.maxPersonAmount} fő
              </span>
            </AnimationOnScroll>
          </div>
          <div className="flex flex-col">
            {hotel.services.length ? (
              <div className="flex flex-col gap-1 pb-2">
                <h3 className="font-semibold text-dynamicList">
                  Szolgáltatások
                </h3>
                <ul className="flex flex-wrap w-full z-0 text-dynamicSmall gap-2 text-palette-3 font-semibold">
                  {hotel.services
                    .filter((item) => !item.hidden && item)
                    .map((service) => (
                      <Capsule
                        Icon={icons[service.icon]}
                        text={service.value}
                        iconSize={16}
                        animationIndex={index}
                      />
                    ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <Separator />
        <div className="w-full flex flex-col justify-center h-full bg-palette-3/60  shadow-md rounded-xl p-2 relative">
          <Rating className="flex flex-col ">
            <div className="flex  w-full justify-center">
              {stars?.map((star) => star)}
            </div>
            <div className="flex flex-col items-center w-full">
              <p className="font-bold text-dynamicTitle3">
                <CountUp end={ratingCount} decimals={2} duration={3} />
                <span className="text-dynamicMedium">/5</span>
              </p>
              <AnimationOnScroll
                animateOnce
                animatePreScroll={false}
                animateIn={"animate__fadeInUp"}
                className={`whitespace-nowrap text-dynamicMedium hover:underline ${
                  index === 0 ? "animate__animated animate__fadeInUp" : ""
                }`}
              >
                <NavLink to={`ertekeles?hotel=${hotel._id}`}>
                  {hotel.ratings.length} Értékelés
                </NavLink>
              </AnimationOnScroll>
            </div>
          </Rating>
          <div className="text-center h-full flex flex-col justify-end gap-1">
            <div className="flex justify-center items-center gap-2 ">
              {hotel.discountPrice ? (
                <>
                  <AnimationOnScroll
                    animateOnce
                    animatePreScroll={false}
                    animateIn={"animate__fadeInUp"}
                    className={`flex flex-col ${
                      index === 0 ? "animate__animated animate__fadeInUp" : ""
                    }`}
                  >
                    <span className="line-through text-dynamicList">
                      {hotel?.price} Ft/éj/ház
                    </span>
                    <p className="font-bold text-dynamicDesc">
                      {hotel?.discountPrice} Ft/éj/ház
                    </p>
                  </AnimationOnScroll>
                  <AnimationOnScroll
                    animateOnce
                    animatePreScroll={false}
                    animateIn={"animate__fadeInUp"}
                    className={`w-max text-dynamicMedium flex absolute top-4 right-4 items-center justify-center bg-palette-5 opacity-80 shadow-lg rounded-lg p-2 text-white font-bold ${
                      index === 0 ? "animate__animated animate__fadeInUp" : ""
                    }`}
                  >
                    -
                    {(
                      (hotel.price - hotel.discountPrice) /
                      (hotel.price * 0.01)
                    ).toFixed()}
                    %
                  </AnimationOnScroll>
                </>
              ) : (
                ""
              )}
              {!hotel.discountPrice ? (
                <AnimationOnScroll
                  animateOnce
                  animatePreScroll={false}
                  animateIn={"animate__fadeInUp"}
                  className={`flex flex-col ${
                    index === 0 ? "animate__animated animate__fadeInUp" : ""
                  }`}
                >
                  <p className="font-bold text-dynamicDesc">
                    {hotel?.price} Ft/éj/ház
                  </p>
                </AnimationOnScroll>
              ) : (
                ""
              )}
            </div>
            <button
              onClick={() => {
                hotelCtx.setHotelId(hotel._id);
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
