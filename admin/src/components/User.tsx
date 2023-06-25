import React, { useState, useContext } from "react";
import { details } from "../models/Auth/AuthModel";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { TippContext } from "../context/TippContext";
import { Fade as Hamburger } from "hamburger-react";

const User: React.FC<{
  user: details;
  setIsTippOff: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDropdown: boolean;
  setIsShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const ctx = useContext(TippContext);
  const navigate = useNavigate();
  const [logoutShow, setLogoutShow] = useState(false);

  const logoutHandler = async () => {
    navigate("/logout");
  };

  return (
    <header className="w-full bg-white">
      <div className="flex w-full p-2 gap-2 items-center justify-between relative">
        <div className="z-50 w-full tablet:hidden">
          <Hamburger
            size={24}
            rounded
            onToggle={() => props.setIsShowDropdown((prev) => !prev)}
            toggled={props.isShowDropdown}
          />
        </div>

        {ctx.isDemo && (
          <div className="hidden tablet:flex w-full h-full gap-2">
            <div className="bg-gray-300 p-2 items-center flex justify-center gap-2 rounded-lg">
              <p className="">Segítségek kikapcsolása</p>
              <Switch
                width={32}
                height={16}
                onChange={() => props.setIsTippOff((prev) => !prev)}
                checked={ctx.isOff}
              />
            </div>
          </div>
        )}
        <div
          className="flex w-full items-center justify-end gap-2 cursor-pointer"
          onClick={() => setLogoutShow((prev) => !prev)}
        >
          <span className="text-dynamicMedium font-semibold select-none">
            {props.user.username}
          </span>
          <img
            src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
            className="w-10 h-10"
            alt="profilkép"
          />
        </div>

        {logoutShow && (
          <div
            onClick={logoutHandler}
            className="absolute z-50 bg-gray-100 -bottom-[100%] right-0 shadow-lg py-4 h-full flex items-center justify-center cursor-pointer"
          >
            <span className="select-none p-1">Kijelentkezés</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default User;
