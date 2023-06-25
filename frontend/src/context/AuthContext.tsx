import { error } from "console";
import { createContext, useEffect, useReducer } from "react";
import { Type } from "typescript";

type USER = {
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

interface STATE {
  user: null | object;
  isLoading: null | boolean;
  error: null | object | string;
  authDispatch: React.Dispatch<ReducerAction>;
}

interface ReducerAction {
  type: "LOGIN_START" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "LOGOUT";
  payload: object | null;
}
const INITIAL_STATE: any = {
  user: JSON.parse(localStorage.getItem("user") as any) || null,
  isLoading: null,
  error: null,
  authDispatch: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isLoading: false,
        error: null,
      };
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
        isLoading: authState.isLoading,
        error: authState.error,
        authDispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
