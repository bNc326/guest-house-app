export enum ASIDE_ACTION_TYPE {
  SHOW = "TYPE_SHOW",
  HIDE = "TYPE_HIDE",
}

export interface INITIAL_ASIDE_STATE {
  isShow: boolean;
  id: string | null;
}

export interface ASIDE_ACTION {
  type: ASIDE_ACTION_TYPE;
  payload?: {
    id: string | null;
  };
}
