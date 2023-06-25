import React from "react";
import { UPLOAD_INITIAL_STATE } from "../../models/Upload/UploadModel";
import { IoMdClose } from "react-icons/io";

interface Props {
  upload: UPLOAD_INITIAL_STATE;
  deletePreviewHandler: (e: React.MouseEvent) => void;
}

const PreviewUpload: React.FC<Props> = ({ upload, deletePreviewHandler }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {upload.fileList &&
        Array.from(upload.fileList).map((file, index) => {
          return (
            <div
              key={index}
              onClick={deletePreviewHandler}
              className="max-w-[calc(33%-1.2rem)] mobile:max-w-[calc(25%-1.2rem)] laptop:max-w-[calc(20%-1.2rem)] desktop:max-w-[calc(15%-1.2rem)] relative shadow-shadow rounded-xl"
            >
              <span
                data-index={index}
                className="absolute z-20 cursor-pointer flex items-center justify-center top-[calc(-1.25rem/2)] right-[calc(-1.25rem/2)] w-5 h-5 rounded-md bg-blue-600 shadow-shadow"
              >
                <IoMdClose color="white" className="pointer-events-none" />
              </span>
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="w-full h-full rounded-xl"
              />
            </div>
          );
        })}
    </div>
  );
};

export default PreviewUpload;
