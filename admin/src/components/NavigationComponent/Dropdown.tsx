import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { TippContext } from "../../context/TippContext";
import Switch from "react-switch";

type route = {
  id: number;
  path: string;
  linkName: string;
  end?: boolean;
};
const Dropdown: React.FC<{
  routePath: route[];
  linkIcons: Array<JSX.Element>;
  isShowDropdown: boolean;
  setIsShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTippOff: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  routePath,
  linkIcons,
  setIsShowDropdown,
  isShowDropdown,
  setIsTippOff,
}) => {
  const ctx = useContext(TippContext);
  return (
    <>
      {isShowDropdown && (
        <div className="absolute z-20 top-0 left-0 w-full h-screen backdrop-blur-sm bg-gray-300/80 flex flex-col items-center justify-center gap-2">
          <ul className="flex flex-col gap-2 text-dynamicTitle3">
            {routePath.map((route, index) => (
              <NavLink
                key={index}
                to={route.path}
                end={route.end}
                onClick={() => setIsShowDropdown(false)}
                className={({ isActive }) =>
                  isActive
                    ? "opacity-70"
                    : "hover:opacity-70 transition-all duration-300 ease-in-out"
                }
              >
                <li className="flex items-center gap-2 cursor-pointer">
                  {linkIcons[index]}
                  <span>{route.linkName}</span>
                </li>
              </NavLink>
            ))}
          </ul>
          {ctx.isDemo && (
            <div className="bg-gray-300 p-2 items-center flex justify-center gap-2 rounded-lg shadow-md">
              <p className="">Segítségek kikapcsolása</p>
              <Switch
                width={32}
                height={16}
                onChange={() => setIsTippOff((prev) => !prev)}
                checked={ctx.isOff}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
