import { useReducer } from "react";
import {
  IS_SURE_INITIAL_STATE as INITIAL_STATE,
  IS_SURE_ACTION,
  IS_SURE_ENUM,
} from "../models/IsSure/IsSure";
const IS_SURE_INITIAL_STATE: INITIAL_STATE = {
  actionType: null,
  isSure: false,
};

const isSureReducer = (state: INITIAL_STATE, action: IS_SURE_ACTION) => {
  switch (action.type) {
    case IS_SURE_ENUM.ACCEPT: {
      if (action.payload) {
        return {
          actionType: "ACCEPT",
          isSure: action.payload.isSure,
        };
      } else {
        return {
          actionType: "ACCEPT",
          isSure: false,
        };
      }
    }
    case IS_SURE_ENUM.EJECT: {
      if (action.payload) {
        return {
          actionType: "EJECT",
          isSure: action.payload.isSure,
        };
      } else {
        return {
          actionType: "EJECT",
          isSure: false,
        };
      }
    }
    case IS_SURE_ENUM.DELETE:
      if (action.payload) {
        return {
          actionType: "DELETE",
          isSure: action.payload.isSure,
        };
      } else {
        return {
          actionType: "DELETE",
          isSure: false,
        };
      }
    case IS_SURE_ENUM.RESET: {
      return {
        actionType: null,
        isSure: false,
      };
    }
    default:
      return state;
  }
};

const useIsSure = () => {
  const [isSure, isSureDispatch] = useReducer(
    isSureReducer,
    IS_SURE_INITIAL_STATE
  );

  return { isSure, isSureDispatch };
};

export default useIsSure;
