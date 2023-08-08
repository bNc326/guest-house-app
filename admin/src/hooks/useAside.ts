import React, { useReducer } from "react";
import {
  ASIDE_ACTION_TYPE,
  INITIAL_ASIDE_STATE,
  ASIDE_ACTION,
} from "../models/Aside/Aside";

const INITIAL_STATE: INITIAL_ASIDE_STATE = {
  isShow: false,
  id: null,
};

const asideReducer = (state: INITIAL_ASIDE_STATE, action: ASIDE_ACTION) => {
  switch (action.type) {
    case ASIDE_ACTION_TYPE.SHOW:
      if (!action.payload) return state;
      return {
        isShow: true,
        id: action.payload.id,
      };
    case ASIDE_ACTION_TYPE.HIDE:
      return {
        isShow: false,
        id: null,
      };
    default:
      return state;
  }
};
const useAside = () => {
  const [aside, asideDispatch] = useReducer(asideReducer, INITIAL_STATE);

  return { aside, asideDispatch };
};

export default useAside;
