export enum UPLOAD_TYPE {
  DROP = "TYPE_DROP",
  UPLOAD = "TYPE_UPLOAD",
  UPDATE = "TYPE_UPDATE_FILE",
  RESET = "TYPE_RESET",
}

export interface UPLOAD_INITIAL_STATE {
  isShow: boolean;
  isLoading: boolean;
  fileList: FileList | null;
}

export interface UPLOAD_ACTION_TYPE {
  type: UPLOAD_TYPE;
  payload?: {
    fileList: FileList;
  };
}
