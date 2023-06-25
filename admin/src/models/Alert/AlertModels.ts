export enum ALERT_ACTION_TYPE {
  SHOW = "TYPE_SHOW",
  HIDE = "TYPE_HIDE",
}

export enum ALERT_TYPE {
  NULL = "null",
  SUCCESS = "success",
  FAILURE = "failure",
  INFO = "info",
}


export type ALERT_INITIAL_STATE = {
  isShow: boolean;
  alertType: ALERT_TYPE;
  message: string;
};

export type ALERT_ACTION = {
  type: ALERT_ACTION_TYPE;
  payload?: {
    alertType: ALERT_TYPE;
    message: string;
  };
};
