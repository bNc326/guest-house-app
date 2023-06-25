import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsCalendar2X,
  BsCalendar2Check,
  BsEnvelopeAt,
  BsHouseDoor,
  BsImages,
  BsPersonVcard,
  BsStar,
} from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Badge, Tooltip } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";
import { TippContext } from "../context/TippContext";
import { Fade as Hamburger } from "hamburger-react";
import Dropdown from "./NavigationComponent/Dropdown";

const Navigation: React.FC<{
  isShowDropdown: boolean;
  setIsShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTippOff: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isShowDropdown, setIsShowDropdown, setIsTippOff }) => {
  const ctx = useContext(TippContext);
  const routePath = [
    {
      id: 1,
      path: "/",
      linkName: "Admin",
      end: true,
    },
    {
      id: 2,
      path: "foglalasi-naptar",
      linkName: "Foglalások",
    },
    {
      id: 3,
      path: "lezart-naptar",
      linkName: "Lezárt napok",
    },
    {
      id: 4,
      path: "vendeghaz",
      linkName: "Vendégház/ak",
    },
    {
      id: 4,
      path: "galeria",
      linkName: "Galéria",
    },
    // {
    //   id: 5,
    //   path: "kapcsolat",
    //   linkName: "Kapcsolat",
    // },
    // { id: 6, path: "email", linkName: "Email" },
    // { id: 7, path: "ertekeles", linkName: "Értékelés" },
  ];

  const demoTipp = [
    {
      id: 0,
      badges: [],
    },
    {
      id: 1,
      badges: ["Foglalás CRUD", "Elfogadás/Elutasítás"],
    },
    {
      id: 2,
      badges: ['"lezárt nap" CRUD'],
    },
    {
      id: 2,
      badges: ["vendégház CRU"],
    },
    {
      id: 2,
      badges: ["DND", "Kép feltöltés", "Kép Törlés"],
    },
  ];

  const linkIcons = [
    <FaHome size={"1.5rem"} />,
    <BsCalendar2Check size={"1.5rem"} />,
    <BsCalendar2X size={"1.5rem"} />,
    <BsHouseDoor size={"1.5rem"} />,
    <BsImages size={"1.5rem"} />,
    // <BsPersonVcard size={"1.5rem"} />,
    // <BsEnvelopeAt size={"1.5rem"} />,
    // <BsStar size={"1.5rem"} />,
  ];
  return (
    <nav className="bg-white h-full min-h-screen flex flex-col tablet:px-4">
      <Dropdown
        isShowDropdown={isShowDropdown}
        routePath={routePath}
        linkIcons={linkIcons}
        setIsShowDropdown={setIsShowDropdown}
        setIsTippOff={setIsTippOff}
      />

      <ul className="gap-4 flex-col hidden tablet:flex">
        {routePath.map((route, index) => (
          <NavLink
            key={index}
            to={route.path}
            end={route.end}
            className={({ isActive }) =>
              isActive
                ? "opacity-70"
                : "hover:opacity-70 transition-all duration-300 ease-in-out"
            }
          >
            <Tooltip
              content={route.linkName}
              placement="right"
              className="z-50"
            >
              <li className="flex items-center gap-2 cursor-pointer">
                {linkIcons[index]}

                {ctx.isDemo && !ctx.isOff && (
                  <>
                    <div>{index > 0 && <HiArrowLeft />}</div>
                    <div className="flex flex-col gap-1">
                      {demoTipp[index]?.badges.map((badge) => (
                        <Badge>{badge}</Badge>
                      ))}
                    </div>
                  </>
                )}
              </li>
            </Tooltip>
          </NavLink>
        ))}
        {ctx.isDemo && !ctx.isOff && (
          <ul>
            <li>Fogalmak:</li>
            <li className="ml-2">
              <span className="font-semibold">CRUD:</span> Create, Read, Update,
              Delete
            </li>
            <li className="ml-2">
              <span className="font-semibold">DND:</span> Drag & Drop
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
