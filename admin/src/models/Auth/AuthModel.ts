export enum AUTH_ACTION_TYPE {
  SUCCESS = "LOGIN_SUCCESS",
  FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
}

export type details = {
  _id: string;
  username?: string;
  email?: string;
};

export interface AUTH_INITIAL_STATE {
  user: details | null;
  authDispatch: React.Dispatch<AUTH_ACTION>;
}

export interface AUTH_ACTION {
  type: AUTH_ACTION_TYPE;
  payload?: details;
}
