import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AUTH_ACTION_TYPE } from "../models/Auth/AuthModel";
import useAlert from "../hooks/useAlert";
import AlertComponent from "../components/UI/Alert";
import { ALERT_ACTION_TYPE, ALERT_TYPE } from "../models/Alert/AlertModels";
import { BarLoader } from "react-spinners";
import { Outlet } from "../models/OutletModel";
import { useSignOut, useAuthHeader } from "react-auth-kit";
import { useCookies } from "react-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const { authDispatch } = useContext(AuthContext);
  const [logoutProgress, setLogoutProgress] = useState(false);
  const [timeoutCounter, setTimeoutCounter] = useState(5);
  const { alert, alertDispatch } = useAlert();
  const signOut = useSignOut();
  const [cookies] = useCookies();

  useEffect(() => {
    const logout = async () => {
      const refreshToken = cookies["_auth_refresh"];
      setLogoutProgress(true);
      const url = process.env.REACT_APP_BACKEND_API as string;
      const res = await fetch(url + "/auth/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });
      if (!res.ok) {
        setLogoutProgress(false);
      } else {
        signOut();
        alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.SUCCESS,
            message: "A felhasználó sikeresen kijelentkezett!",
          },
        });
        setLogoutProgress(false);
        setInterval(() => {
          setTimeoutCounter((prev) => prev - 1);
        }, 1000);
        setTimeout(() => {
          alertDispatch({ type: ALERT_ACTION_TYPE.HIDE });
          navigate("/login");
        }, 5000);
      }
    };

    const cleanup = setTimeout(() => {
      logout();
    }, 100);

    return () => clearTimeout(cleanup);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col text-center text-dynamicTitle gap-2 items-center justify-center">
      {alert?.message ? alert.message : "Kijelentkezés"}
      <BarLoader
        loading={logoutProgress}
        width={"25%"}
        className="rounded-full"
      />
      <p className="text-dynamicDesc">
        {timeoutCounter} másodperc múlva visszirányítunk!
      </p>
      <AlertComponent
        isShow={alert.isShow}
        type={alert.alertType}
        message={alert.message}
        deleteAlertDispatch={alertDispatch}
      />
    </div>
  );
};

export default Logout;
