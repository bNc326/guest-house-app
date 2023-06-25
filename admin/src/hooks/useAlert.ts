import { useReducer } from "react";
import {
  ALERT_ACTION,
  ALERT_ACTION_TYPE,
  ALERT_INITIAL_STATE,
  ALERT_TYPE,
} from "../models/Alert/AlertModels";

const INITIAL_ALERT_STATE: ALERT_INITIAL_STATE = {
  isShow: false,
  alertType: ALERT_TYPE.NULL,
  message: "",
};

const alertReducer = (
  state: ALERT_INITIAL_STATE,
  action: ALERT_ACTION
) => {
  switch (action.type) {
    case ALERT_ACTION_TYPE.SHOW:
      if (!action.payload) return state;
      return {
        isShow: true,
        alertType: action.payload.alertType,
        message: action.payload.message,
      };

    case ALERT_ACTION_TYPE.HIDE:
      return {
        isShow: false,
        alertType: ALERT_TYPE.NULL,
        message: "",
      };

    default:
      return state;
  }
};

const useAlert = () => {
  const [alert, alertDispatch] = useReducer(
    alertReducer,
    INITIAL_ALERT_STATE
  );

  return { alert, alertDispatch };
};

export default useAlert;
