export enum IS_SURE_ENUM {
  ACCEPT = "ACCEPT_START",
  EJECT = "EJECT_START",
  DELETE = "DELETE_START",
  RESET = "RESET_START",
}

export interface IS_SURE_INITIAL_STATE {
  actionType: string | null;
  isSure: boolean;
}

export interface IS_SURE_ACTION {
  type: IS_SURE_ENUM;
  payload?: {
    isSure: boolean;
  };
}
