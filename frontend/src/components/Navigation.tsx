import { useState } from "react";
import { NavLink } from "react-router-dom";
import DropDownMenu from "./UI/DropDownMenu";
import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import { BsCalendar2Range } from "react-icons/bs";

const Navigation = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const routePath: object[] = [
    {
      id: 1,
      path: "/",
      linkName: "Kezdőlap",
      end: true,
    },
    {
      id: 2,
      path: "/galeria",
      linkName: "Galéria",
    },
    {
      id: 3,
      path: "/rolunk",
      linkName: "Rólunk",
    },
    {
      id: 4,
      path: "/kapcsolat",
      linkName: "Kapcsolat",
    },
  ];
  return (
    <>
      <header className="fixed w-full -top-1 z-50 bg-palette-3  shadow-md flex flex-col items-center">
        <nav className=" tall:justify-between gap-8 tall:w-full relative flex z-50  w-full max-w-[1200px] py-2 px-4 items-center justify-between">
          <div className="w-1/5  text-2xl tall:text-dynamic1rem font-bold text-palette-5 hidden nav:flex">
            <h1>Logo</h1>
          </div>
          <div className="w-3/5 hidden nav:flex nav:justify-end">
            <ul className="flex gap-8 text-xl tall:text-dynamic1rem justify-end pr-8 text-palette-5">
              {routePath.map((route: any) => (
                <NavLink
                  key={route.id}
                  end={route.end}
                  to={route.path}
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-palette-4"
                      : "hover:text-palette-5/50 transition-all ease-in-out duration-300"
                  }
                >
                  {route.linkName}
                </NavLink>
              ))}
            </ul>
          </div>
          <div className="w-full mobile:w-1/4 ">
            <Button
              btnText={"Foglalás most"}
              onClick={() => navigate("naptar")}
              className={"w-full text-xl"}
              icon={BsCalendar2Range}
            />
          </div>
          <div className="tablet:flex justify-end nav:hidden ">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              rounded
              size={32}
              distance={"sm"}
              color={"#724A30"}
            />
          </div>
        </nav>
        <div className="w-full flex justify-center nav:hidden">
          <DropDownMenu
            route={routePath}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </header>
    </>
  );
};

export default Navigation;
