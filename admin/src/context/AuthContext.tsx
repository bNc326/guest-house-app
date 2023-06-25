import { createContext, useEffect, useReducer } from "react";
import {
  AUTH_INITIAL_STATE,
  AUTH_ACTION,
  AUTH_ACTION_TYPE,
  details,
} from "../models/Auth/AuthModel";

const INITIAL_STATE: AUTH_INITIAL_STATE = {
  user: (JSON.parse(localStorage.getItem("user") as any) as details) || null,
  authDispatch: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state: AUTH_INITIAL_STATE, action: AUTH_ACTION) => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.SUCCESS:
      if (!action.payload) return state;
      return { ...state, user: action.payload};
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

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(authState.user));
  }, [authState.user]);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        authDispatch: authDispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
