import { createContext, useEffect, useReducer, useState } from "react";
import {
  AUTH_INITIAL_STATE,
  AUTH_ACTION,
  AUTH_ACTION_TYPE,
  details,
} from "../models/Auth/AuthModel";
import { ClockLoader } from "react-spinners";
import { PiWarningFill } from "react-icons/pi";
const INITIAL_STATE: AUTH_INITIAL_STATE = {
  user: (JSON.parse(localStorage.getItem("user") as any) as details) || null,
  authDispatch: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state: AUTH_INITIAL_STATE, action: AUTH_ACTION) => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.SUCCESS:
      if (!action.payload) return state;
      return { ...state, user: action.payload };
    case AUTH_ACTION_TYPE.FAILURE:
      return { ...state, user: null };
    case AUTH_ACTION_TYPE.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<{
  children: JSX.Element[] | JSX.Element;
}> = (props) => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const initialMessage = {
    title: "Az oldal töltődik!",
    desc: "Ha a szerver terhelt ez eltarthat 1 percig is!",
  };
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(authState.user));
  }, [authState.user]);

  useEffect(() => {
    const cleanup = setTimeout(async () => {
      setMessage(initialMessage);
      const url = process.env.REACT_APP_BACKEND_API as string;
      const res = await fetch(url + "/isLoaded");

      if (!res.ok) {
        setMessage((prev) => {
          const update = { ...prev };
          update.title = "Az oldalt nem sikerült betölteni!";
          update.desc = "Kérem frissítsen rá az oldalra!";
          return update;
        });
        return setIsLoaded(false);
      } else {
        const isPageLoaded = await res.json();
        console.log("loaded", isPageLoaded);

        if (isPageLoaded) {
          setIsLoaded(true);
        }
      }
    }, 100);

    return () => clearTimeout(cleanup);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        authDispatch: authDispatch,
      }}
    >
      {!isLoaded && (
        <div className="w-full h-screen flex flex-col gap-1 items-center justify-center text-center">
          {message !== initialMessage ? (
            <PiWarningFill size={40} />
          ) : (
            <ClockLoader loading size={50} className="rounded-full" />
          )}

          <p className="text-dynamicTitle">{message.title}</p>
          <span className="text-dynamicDesc">({message.desc})</span>
        </div>
      )}
      {isLoaded && props.children}
    </AuthContext.Provider>
  );
};
