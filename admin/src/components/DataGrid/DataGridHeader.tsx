import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAddCircle, MdSearch } from "react-icons/md";
import {
  CompTypeEnum,
  DataGridHeader as Props,
} from "../../models/DataGrid/DataGrid";
import ChangeHotelComponent from "../ChangeHotelComponent";
import { TextInput } from "flowbite-react";
import { MODAL_ACTION_TYPE, MODAL_TYPE } from "../../models/Modal/ModalModal";

const DataGridHeader: React.FC<Props> = ({ changeHotel, newComp, search }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mobile:flex-row justify-between items-center w-full font-semibold py-4 gap-2">
      {changeHotel && <ChangeHotelComponent />}
      <div className="w-full flex flex-col mobile:flex-row justify-end gap-2">
        {search && (
          <span className="w-full mobile:w-max">
            <TextInput
              type="text"
              icon={MdSearch}
              sizing={"sm"}
              placeholder="keresés.."
            />
          </span>
        )}
        {newComp?.type === CompTypeEnum.MODAL && (
          <span
            onClick={() =>
              newComp.callBack &&
              newComp.callBack({
                type: MODAL_ACTION_TYPE.SHOW,
                payload: { id: null, modalType: MODAL_TYPE.NEW },
              })
            }
            className="cursor-pointer flex items-center justify-end gap-2 text-blue-900 hover:bg-blue-900/10 p-1 rounded-md transition-colors ease-in-out duration-300"
          >
            <MdAddCircle size={20} /> Létrehozás
          </span>
        )}
        {newComp?.type === CompTypeEnum.PATH && (
          <span
            onClick={() => navigate("uj-vendeghaz")}
            className="cursor-pointer flex items-center justify-end gap-2 text-blue-900 hover:bg-blue-900/10 p-1 rounded-md transition-colors ease-in-out duration-300"
          >
            <MdAddCircle size={20} /> Létrehozás
          </span>
        )}
      </div>
    </div>
  );
};

export default DataGridHeader;
