import React from "react";
import { GrFormClose } from "react-icons/gr";
const ModalContainer: React.FC<{
  children: JSX.Element | JSX.Element[];
  closeModalHandler: () => void;
  backdropClose?: boolean;
  header?: boolean;
  headerTitle?: string;
}> = ({ children, closeModalHandler, backdropClose, header, headerTitle }) => {
  return (
    <div
      onClick={(e: React.MouseEvent) => backdropClose && closeModalHandler()}
      className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black/50 z-[1500] backdrop-blur-sm"
    >
      <div
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="bg-white rounded-lg w-11/12 max-w-[630px]  p-4 py-8 shadow-xl flex flex-col gap-2"
      >
        {header && (
          <div className="border-b-2 border-black/20 py-2 flex justify-between items-center">
            <span className="font-medium">{headerTitle}</span>
            <span
              className="p-1 rounded-md bg-black/10 cursor-pointer"
              onClick={() => closeModalHandler()}
            >
              <GrFormClose size={24} />
            </span>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
