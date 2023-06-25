import React, { useReducer } from "react";
import {
  MODAL_TYPE,
  MODAL_ACTION,
  MODAL_ACTION_TYPE,
  INITIAL_MODAL_STATE as INITIAL_STATE,
} from "../models/Modal/ModalModal";

const INITIAL_MODAL_STATE: INITIAL_STATE = {
  isShow: false,
  id: null,
  modalType: MODAL_TYPE.NULL,
};

const modalReducer = (state: INITIAL_STATE, action: MODAL_ACTION) => {
  switch (action.type) {
    case MODAL_ACTION_TYPE.SHOW:
      if (!action.payload) return state;
      return {
        isShow: true,
        id: action.payload.id,
        modalType: action.payload.modalType,
      };
    case MODAL_ACTION_TYPE.HIDE:
      return {
        isShow: false,
        id: null,
        modalType: MODAL_TYPE.NULL,
      };
    default:
      return state;
  }
};
const useModals = () => {
  const [modal, modalDispatch] = useReducer(modalReducer, INITIAL_MODAL_STATE);

  return { modal, modalDispatch };
};

export default useModals;
