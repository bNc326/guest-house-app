export enum LIGHTBOX_TYPE {
  SHOW = "TYPE_SHOW",
  HIDE = "TYPE_HIDE",
}

export interface LIGHTBOX_INITIAL_STATE {
  isShow: boolean;
  index: number;
}

export interface LIGHTBOX_ACTION {
  type: LIGHTBOX_TYPE;
  index?: number;
}
