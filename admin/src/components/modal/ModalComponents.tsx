import React from "react";
import { GrFormClose } from "react-icons/gr";
import { BsFillCalendar2RangeFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { TextInput, Label } from "flowbite-react";
import { ClipLoader } from "react-spinners";
import { ModalData } from "../../models/Modal/ModalData";

interface Props {
  id?: string;
}

const ModalComponents: React.FC<Props> = ({ ...props }) => {

    
  return (
    <section className="absolute w-full h-full flex items-center justify-center bg-black/30">
      <article className="bg-white rounded-lg shadow-lg flex flex-col w-full max-w-[640px]">
        <div className="flex justify-between items-center p-4 border-b-[1px]">
          <span className="font-medium">Kizárt dátum szerkesztése</span>
          <span className="hover:bg-black/30 rounded cursor-pointer transition-all ease-in-out duration-300 group:">
            <GrFormClose size={24} />
          </span>
        </div>
        <div className="flex py-8 px-4">
          <form className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col w-full">
                <Label htmlFor="">Kezdő Dátum</Label>
                <TextInput
                  icon={BsFillCalendar2RangeFill}
                  type="date"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="">Vége Dátum</Label>
                <TextInput
                  icon={BsFillCalendar2RangeFill}
                  type="date"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <button
                disabled={false}
                type="submit"
                className="bg-[#155e75] text-white w-full rounded-md p-2"
              >
                <span className="flex justify-center gap-1 items-center">
                  {false ? (
                    <ClipLoader loading={true} color={"white"} size={"1rem"} />
                  ) : (
                    <FaSave />
                  )}
                  Mentés
                </span>
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default ModalComponents;
