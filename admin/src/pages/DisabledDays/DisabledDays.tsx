import React, { useState, useContext } from "react";
import EditModal from "../../components/modal/EditModal";
import useModals from "../../hooks/useModals";
import { MODAL_TYPE } from "../../models/Modal/ModalModal";
import NewModal from "../../components/modal/NewModal";
import DataGrid from "../../components/DataGrid/DataGrid";
import { CompTypeEnum } from "../../models/DataGrid/DataGrid";
import { HotelContext } from "../../context/HotelContextProvider";

const DisabledDays = () => {
  const { modal, modalDispatch } = useModals();
  const [isNewModal, setIsNewModal] = useState<boolean>(false);
  const hotelCtx = useContext(HotelContext);

  return (
    <>
      <DataGrid
        endpoint="disabled-days"
        filter={["createdAt", "_id", "startDate", "endDate"]}
        editComp={{ type: CompTypeEnum.MODAL, callBack: modalDispatch }}
        newComp={{ type: CompTypeEnum.MODAL, callBack: modalDispatch }}
        withSearch
        withChangeHotel
        withCheckbox
        socketData={{
          socketEndpoint: `${hotelCtx.hotelId}-disabled-days`,
          alert: {
            new: "Egy admin létrehozott egy kizárt napot!",
            update: "Egy admin módosított egy kizárt napot!",
            delete: "Egy admin törölt egy/több kizárt napot!",
          },
        }}
      />
      {modal.modalType === MODAL_TYPE.EDIT && (
        <EditModal
          id={modal.id}
          isShow={modal.isShow}
          modalDispatch={modalDispatch}
        />
      )}
      {modal.modalType === MODAL_TYPE.NEW && (
        <NewModal
          id={modal.id}
          isShow={modal.isShow}
          modalDispatch={modalDispatch}
          setIsNewModal={setIsNewModal}
        />
      )}
    </>
  );
};

export default DisabledDays;
