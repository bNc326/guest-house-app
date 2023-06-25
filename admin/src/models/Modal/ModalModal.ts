export enum MODAL_ACTION_TYPE {
  SHOW = "TYPE_SHOW",
  HIDE = "TYPE_HIDE",
}

export enum MODAL_TYPE {
  NULL = "null",
  EDIT = "edit",
  NEW = "new",
}

export interface INITIAL_MODAL_STATE {
  isShow: boolean;
  id: string | null;
  modalType: MODAL_TYPE;
}

export interface MODAL_ACTION {
    type: MODAL_ACTION_TYPE,
    payload?: {
        id: string | null,
        modalType: MODAL_TYPE
    }
}
