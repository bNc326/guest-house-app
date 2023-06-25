import React, { DragEvent, useRef } from "react";
import { TbDragDrop } from "react-icons/tb";

interface Props {
  dropHandler: (e: DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (e: DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (e: DragEvent<HTMLDivElement>) => void;
  uploadChangeHandler: (e: React.ChangeEvent) => void;
  isDrag: boolean;
}

const DropZone: React.FC<Props> = (props) => {
  const {
    dropHandler,
    dragOverHandler,
    dragLeaveHandler,
    uploadChangeHandler,
    isDrag,
  } = props;

  const uploadRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onClick={() => {
        uploadRef.current?.click();
      }}
      className={`w-full h-full py-8 tablet:h-[400px] cursor-pointer flex flex-col items-center gap-4 justify-center rounded-3xl overflow-hidden border-4 border-dashed border-black/25 transition-all ease-in-out duration-300 ${
        isDrag && "bg-black/25"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center ${
          isDrag && "pointer-events-none"
        }`}
      >
        <TbDragDrop size={"2rem"} color={"rgb(0 0 0 / 0.25)"} />
        <h3 className="text-dynamicTitle3 font-bold text-black/50">Fogd & Vidd</h3>
        <span className="text-dynamicMedium text-black/50">(JPG, PNG, WEBP)</span>
      </div>
      <span
        className={`w-[200px] h-1 rounded bg-black/20 ${
          isDrag && "pointer-events-none"
        }`}
      ></span>
      <div
        className={`flex flex-col items-center justify-center ${
          isDrag && "pointer-events-none"
        }`}
      >
        <input
          ref={uploadRef}
          onChange={uploadChangeHandler}
          type="file"
          multiple
          hidden
        />
        <button
          onClick={() => uploadRef.current?.click()}
          className="text-dynamicMedium bg-black/50 hover:bg-black/30 text-white font-bold px-2 py-1 rounded-xl transition-all ease-in-out duration-300"
        >
          Fájl Feltöltés
        </button>
      </div>
    </div>
  );
};
export default DropZone;
