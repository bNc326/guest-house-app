import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  json,
  useRouteLoaderData,
  useRevalidator,
  useOutletContext,
  LoaderFunctionArgs,
} from "react-router-dom";
import { ALERT_TYPE, ALERT_ACTION_TYPE } from "../../models/Alert/AlertModels";
import AlertComponent from "../../components/UI/Alert";
import Table, {
  TableRow,
  TableButton,
  TableCell,
} from "../../components/UI/Table";
import { format } from "date-fns";
import { Button, Checkbox } from "flowbite-react";
import { HiTrash } from "react-icons/hi";
import { BsCalendar2PlusFill } from "react-icons/bs";
import { DisabledDaysModel } from "../../models/Disabled-days/Disabled-days";
import { Checkbox as CheckboxModel } from "../../models/CheckboxModel";
import useAlert from "../../hooks/useAlert";
import EditModal from "../../components/modal/EditModal";
import useModals from "../../hooks/useModals";
import { MODAL_ACTION_TYPE, MODAL_TYPE } from "../../models/Modal/ModalModal";
import NewModal from "../../components/modal/NewModal";
import { Outlet } from "../../models/OutletModel";
import ChangeHotelComponent from "../../components/ChangeHotelComponent";
import { HotelContext } from "../../context/HotelContextProvider";
import { useAuthHeader } from "react-auth-kit";
import DataGrid from "../../components/DataGrid/DataGrid";
import { CompTypeEnum } from "../../models/DataGrid/DataGrid";

const DisabledDays = () => {
  const { modal, modalDispatch } = useModals();
  const [isNewModal, setIsNewModal] = useState<boolean>(false);

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
