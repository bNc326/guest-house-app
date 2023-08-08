import React, { useState, useContext } from "react";
import { details } from "../models/Auth/AuthModel";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { TippContext } from "../context/TippContext";
import { Fade as Hamburger } from "hamburger-react";
import { ClipLoader } from "react-spinners";
import { MdRefresh } from "react-icons/md";
import { RefreshContext, RefreshEnum } from "../context/RefreshContextProvider";

const User: React.FC<{
  user: details;
  setIsTippOff: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDropdown: boolean;
  setIsShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const ctx = useContext(TippContext);
  const navigate = useNavigate();
  const [logoutShow, setLogoutShow] = useState(false);
  const refreshCtx = useContext(RefreshContext);

  const logoutHandler = async () => {
    navigate("/logout");
  };

  return (
    <div className="flex w-full p-2 gap-2 items-center justify-between relative">
      <div className="z-10 w-full tablet:hidden">
        <Hamburger
          size={24}
          rounded
          onToggle={() => props.setIsShowDropdown((prev) => !prev)}
          toggled={props.isShowDropdown}
        />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        {refreshCtx.loading === RefreshEnum.END && (
          <MdRefresh
            onClick={() => refreshCtx.handleRefresh(RefreshEnum.START)}
            size={20}
            className="transform transition-all ease-in-out duration-300 hover:rotate-[360deg] cursor-pointer"
          />
        )}
        {refreshCtx.loading === RefreshEnum.START && <ClipLoader size={20} />}

        <div
          className="flex items-center gap-2 cursor-pointer"
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
      </div>

      {logoutShow && (
        <div
          onClick={logoutHandler}
          className="absolute rounded-md z-50 bg-gray-100 -bottom-[calc(100%+0.5rem)] right-2 shadow-lg py-4 h-full flex items-center justify-center cursor-pointer"
        >
          <span className="select-none p-1">Kijelentkezés</span>
        </div>
      )}
    </div>
  );
};

export default User;
