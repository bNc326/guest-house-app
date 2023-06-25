import Card from "components/UI/Card";
import Container from "components/UI/Container";
import Service from "components/UI/svg/Service";
import room from "assets/images/room.jpg";

import {
  FaParking,
  FaWifi,
  FaBed,
  FaStar,
  FaUtensils,
  FaTv,
  FaCreditCard,
} from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import Capsule from "./Capsule";
const Welcome = () => {
  const cards = [
    {
      id: 1,
      title: "Turks & Caicos Islands",
      range: 10,
      color: "bg-palette-2",
    },
    {
      id: 2,
      title: "Congo - Brazzaville",
      range: 20,
      color: "bg-palette",
      order: true,
    },
    {
      id: 3,
      title: "Paraguay",
      range: 40,
      color: "bg-palette-2",
    },
  ];
  return (
    <>
      <Container color="#E6CCB2" relative>
        <div className="flex flex-col w-full gap-8">
          <div className="flex flex-col mobile:flex-wrap mobile:flex-row mobile:justify-center tablet:flex-nowrap items-between w-full gap-6">
            {cards.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                range={card.range}
                color={card.color}
                order={card.order}
              />
            ))}
          </div>
          <div className="flex gap-8 w-full rounded-3xl px-0">
            <div className=" flex w-full flex-col gap-4">
              <div className="h-full rounded-3xl flex justify-end mobile:justify-between px-0 gap-4 ">
                <div className="hidden h-full mobile:block">
                  <Service />
                </div>
                <div className="flex w-full items-center gap-4">
                  <div className=" flex flex-col customTablet:flex-row gap-4">
                    <div className=" rounded-3xl w-full flex items-start">
                      <ul className="flex flex-wrap w-full z-0 text-dynamicList gap-2 text-palette-3 font-semibold">
                        <Capsule Icon={FaParking} text="Ingyenes parkolás" />
                        <Capsule
                          Icon={FaUtensils}
                          text="Étterrem"
                          className="mobile:order-8 tablet:order-none"
                        />
                        <Capsule Icon={FaWifi} text="Ingyenes wifi" />
                        <Capsule Icon={BiArea} text="60m2" />
                        <Capsule
                          Icon={FaStar}
                          text="Sauna"
                        />
                        <Capsule
                          Icon={FaBed}
                          text="2 szoba / 5-6 fő"
                          className="tablet:order-8"
                        />
                        <Capsule
                          Icon={FaCreditCard}
                          text="Bankkártya & SZÉP kártya"
                        />
                        <Capsule Icon={FaTv} text="Síkképernyős TV" />
                        <Capsule
                          Icon={TbAirConditioning}
                          text="Légkondícionáló"
                        />
                      </ul>
                    </div>
                    <img
                      src={room}
                      alt="szoba"
                      className="w-full rounded-xl shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Welcome;
