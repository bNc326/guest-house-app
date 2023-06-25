import React from "react";
import { UPLOAD_INITIAL_STATE } from "../../models/Upload/UploadModel";
import { CgSoftwareUpload } from "react-icons/cg";

interface Props {
  upload: UPLOAD_INITIAL_STATE;
  isProgress: number;
  uploadHandler: (e: React.FormEvent) => Promise<void>;
}

const UploadForm: React.FC<Props> = ({ upload, isProgress, uploadHandler }) => {
  return (
    <>
      {upload.isShow && (
        <form className="flex flex-col w-full gap-4" onSubmit={uploadHandler}>
          <div className="w-full flex items-center rounded-full bg-gray-200 overflow-hidden">
            <div
              style={{ width: isProgress.toString().concat("%") }}
              className={` transition-all ease-in-out duration-300 font-bold ${isProgress === 0 ? 'opacity-0' : ''} ${
                isProgress === 100 ? "bg-green-400/80" : "bg-blue-600/80"
              } text-white flex items-center justify-center`}
            >
              {isProgress === 0 ? "asd" : isProgress.toString().concat("%")}
            </div>
          </div>
          <button
            disabled={isProgress > 0 && true}
            type="submit"
            className="p-2 w-full bg-blue-600 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-blue-600/80 font-bold flex items-center justify-center gap-1 text-white rounded-xl transition-all ease-in-out duration-300"
          >
            <CgSoftwareUpload size={"1.5rem"} />
            Feltöltés
          </button>
        </form>
      )}
    </>
  );
};

export default UploadForm;
