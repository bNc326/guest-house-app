import React, { useEffect, useState, useContext } from "react";
import { useRevalidator, useOutletContext } from "react-router-dom";
import { Button, Modal, TextInput } from "flowbite-react";
import { BsFillCalendar2RangeFill } from "react-icons/bs";
import { format } from "date-fns";
import { cloneDeep, isEqual } from "lodash";
import { ClipLoader, SyncLoader } from "react-spinners";
import { FaSave } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import {
  ALERT_ACTION,
  ALERT_ACTION_TYPE,
  ALERT_TYPE,
} from "../../models/Alert/AlertModels";
import { MODAL_ACTION, MODAL_ACTION_TYPE } from "../../models/Modal/ModalModal";
import { AuthContext } from "../../context/AuthContext";
import { Outlet } from "../../models/OutletModel";
import { HotelContext } from "../../context/HotelContextProvider";
import { useAuthHeader } from "react-auth-kit";
import ModalContainer from "./ModalContainer";
import Backdrop from "./Backdrop";

interface ModalData {
  startDate: string;
  endDate: string;
  admin: string | null;
}

const NewModal: React.FC<{
  id: string | null;
  isShow: boolean;
  modalDispatch: React.Dispatch<MODAL_ACTION>;
  setIsNewModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [data, setData] = useState<ModalData>({
    startDate: "",
    endDate: "",
    admin: null,
  });
  const [isLoading, setIsloading] = useState<boolean>(false);
  const revalidator = useRevalidator();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);
  const outletCtx = useOutletContext() as Outlet;
  const hotelCtx = useContext(HotelContext);
  const accessToken = useAuthHeader();

  useEffect(() => {
    props.setIsNewModal(true);
    const admin = authCtx.user?.username;
    if (!admin) return;
    setData((prev) => {
      return { ...prev, admin: admin };
    });
  }, []);

  useEffect(() => {
    if (data.startDate.length === 0 || data.endDate.length === 0) return;
    setIsFormValid(true);
  }, [data]);

  const resetModalData = () => {
    props.modalDispatch({ type: MODAL_ACTION_TYPE.HIDE });
    setData({
      startDate: "",
      endDate: "",
      admin: null,
    });
  };

  const closeModalHandler = () => {
    resetModalData();
  };

  const onChangeHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const value = e.target.value as string;
    const name = e.target.name;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    const url = process.env.REACT_APP_BACKEND_API as string;

    const res = await fetch(
      url + `/disabled-days?hotel=${hotelCtx.hotelUUID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken(),
        },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      console.log("error");
      setIsloading(false);
    } else {
      const data = await res.json();
      props.modalDispatch({ type: MODAL_ACTION_TYPE.HIDE });
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: { alertType: ALERT_TYPE.SUCCESS, message: data.message },
      });
      setIsloading(false);
      revalidator.revalidate();
    }
  };

  return (
    <Backdrop backdropClose closeModalHandler={closeModalHandler} header headerTitle="Új kizárt dátum létrehozás">
      <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>
        <div className="flex flex-col mobile:flex-row gap-4 items-center">
          <div className="w-full">
            <label htmlFor="startDate">Kezdő dátum</label>
            <TextInput
              icon={BsFillCalendar2RangeFill}
              onChange={onChangeHandler}
              name="startDate"
              id="startDate"
              defaultValue={`${
                data.startDate.length === 0
                  ? ""
                  : format(new Date(data.startDate), "yyyy-MM-dd")
              }`}
              color="gray"
              type="date"
            />
          </div>
          <div className="w-full">
            <label htmlFor="endDate">Vége dátum</label>
            <TextInput
              icon={BsFillCalendar2RangeFill}
              onChange={onChangeHandler}
              name="endDate"
              id="endDate"
              defaultValue={`${
                data.endDate.length === 0
                  ? ""
                  : format(new Date(data.endDate), "yyyy-MM-dd")
              }`}
              color="gray"
              type="date"
            />
          </div>
        </div>

        <Button disabled={!isFormValid} type="submit">
          <span className="flex gap-1 items-center">
            {isLoading ? (
              <ClipLoader loading={true} color={"white"} size={"1rem"} />
            ) : (
              <FaSave />
            )}
            Létrehozás
          </span>
        </Button>
      </form>
    </Backdrop>
  );
};

export default NewModal;
