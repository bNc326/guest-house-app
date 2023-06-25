import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/AuthContext";
import { AUTH_ACTION_TYPE } from "../models/Auth/AuthModel";
import User from "../components/User";
import { TippContext } from "../context/TippContext";
import { Fade as Hamburger } from "hamburger-react";
import AlertComponent from "../components/UI/Alert";
import useAlert from "../hooks/useAlert";
import { Outlet as OutletModel } from "../models/OutletModel";
import ModalComponents from "../components/modal/ModalComponents";

const Root = () => {
  const [demoMounted, setDemoMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isTippOff, setIsTippOff] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { authDispatch, user } = useContext(AuthContext);
  const { alert, alertDispatch } = useAlert();
  const navigate = useNavigate();

  const outletCtx: OutletModel = { alertDispatch, alert };

  useEffect(() => {
    const checkAdmin = async () => {
      const url = process.env.REACT_APP_BACKEND_API as string;
      const res = await fetch(url + "/auth/authenticate");

      const data = await res.json();

      if (data.success === false) {
        authDispatch({ type: AUTH_ACTION_TYPE.FAILURE });
        setIsAdmin(false);
        navigate("/login");
        return;
      }

      if (!user) {
        authDispatch({ type: AUTH_ACTION_TYPE.FAILURE });
        setIsAdmin(false);
        navigate("/login");
        return;
      }
      if (user.username === "demo") {
        const item = JSON.parse(localStorage.getItem("isDemo") as any) as {
          isDemo: boolean;
          isTippOff: boolean;
        };
        if (item) {
          setIsDemo(item.isDemo);
          setIsTippOff(item.isTippOff);
        } else {
          setIsDemo(true);
          setIsTippOff(false);
        }

        setDemoMounted(true);
      } else {
        localStorage.removeItem("isDemo");
      }

      setIsAdmin(true);
    };
    const cleanup = setTimeout(() => {
      checkAdmin();
    }, 100);

    return () => clearTimeout(cleanup);
  }, []);

  useLayoutEffect(() => {
    const setItemToLocalstorage = async () => {
      localStorage.setItem(
        "isDemo",
        JSON.stringify({ isDemo: isDemo, isTippOff: isTippOff })
      );
    };

    const cleanup = setTimeout(() => {
      if (!demoMounted) return;
      setItemToLocalstorage();
    }, 100);

    return () => clearTimeout(cleanup);
  }, [isTippOff, isDemo]);
  return (
    <>
      {isAdmin && (
        <TippContext.Provider value={{ isDemo: isDemo, isOff: isTippOff }}>
          <section className="flex w-full min-h-screen h-full flex-col relative">
            {user && (
              <User
                isShowDropdown={isShowDropdown}
                setIsShowDropdown={setIsShowDropdown}
                setIsTippOff={setIsTippOff}
                user={user && user}
              />
            )}
            <div className="flex w-full overflow-hidden">
              <aside>
                <Navigation
                  isShowDropdown={isShowDropdown}
                  setIsShowDropdown={setIsShowDropdown}
                  setIsTippOff={setIsTippOff}
                />
              </aside>
              <article className="w-full h-full rounded-md">
                <Outlet context={outletCtx} />
              </article>
            </div>
            <AlertComponent
              isShow={alert.isShow}
              message={alert.message}
              type={alert.alertType}
              deleteAlertDispatch={alertDispatch}
            />
            {/* <ModalComponents /> */}
          </section>
        </TippContext.Provider>
      )}
    </>
  );
};

export default Root;
