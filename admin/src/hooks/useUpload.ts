import { useReducer, useEffect } from "react";
import {
  UPLOAD_TYPE,
  UPLOAD_ACTION_TYPE,
  UPLOAD_INITIAL_STATE,
} from "../models/Upload/UploadModel";

const INITIAL_STATE: UPLOAD_INITIAL_STATE = {
  isShow: false,
  isLoading: false,
  fileList: null,
};

const uploadReducer = (
  state: UPLOAD_INITIAL_STATE,
  action: UPLOAD_ACTION_TYPE
) => {
  switch (action.type) {
    case UPLOAD_TYPE.DROP:
      if (!action.payload) return state;
      return {
        isShow: true,
        isLoading: false,
        fileList: action.payload.fileList,
      };
    case UPLOAD_TYPE.UPLOAD:
      return {
        isShow: state.isShow,
        isLoading: true,
        fileList: state.fileList,
      };
    case UPLOAD_TYPE.UPDATE:
      if (!action.payload) return state;
      return {
        isShow: state.isShow,
        isLoading: state.isLoading,
        fileList: action.payload?.fileList,
      };
    case UPLOAD_TYPE.RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const useUpload = () => {
  const [upload, uploadDispatch] = useReducer(uploadReducer, INITIAL_STATE);

  return { upload, uploadDispatch };
};

export default useUpload;
