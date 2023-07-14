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
import { Outlet } from "../../models/OutletModel";
import { HotelContext } from "../../context/HotelContextProvider";
import { useAuthHeader } from "react-auth-kit";
import ModalContainer from "./ModalContainer";
import Backdrop from "./Backdrop";

interface ModalData {
  _id: string;
  startDate: string;
  endDate: string;
}

const EditModal: React.FC<{
  id: string | null;
  isShow: boolean;
  modalDispatch: React.Dispatch<MODAL_ACTION>;
}> = (props) => {
  const [data, setData] = useState<ModalData | null>();
  const [backup, setBackup] = useState<ModalData | null>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [isObjectEqual, setIsObjectEqual] = useState<boolean>(false);
  const revalidator = useRevalidator();
  const outletCtx = useOutletContext() as Outlet;
  const hotelCtx = useContext(HotelContext);
  const accessToken = useAuthHeader();

  useEffect(() => {
    if (!props.isShow && props.id === null) return;
    const fetchData = async () => {
      const url = process.env.REACT_APP_BACKEND_API as string;

      const res = await fetch(
        url + `/disabled-days/${props.id}?hotel=${hotelCtx.hotelUUID}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: accessToken(),
          },
        }
      );

      if (!res.ok) {
        console.log("error");
      } else {
        const data: ModalData = await res.json();
        const update = {
          _id: data._id,
          startDate: format(new Date(data.startDate), "yyyy-MM-dd"),
          endDate: format(new Date(data.endDate), "yyyy-MM-dd"),
        };
        setData(update);
        setBackup(cloneDeep(update));
        setFetchLoading(false);
      }
    };
    setFetchLoading(true);
    const cleanup = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(cleanup);
    };
  }, [props.id]);

  useEffect(() => {
    if (!props.isShow && props.id === null) return;
    if (isObjectEqual) {
      if (!isEqual(backup, data)) {
        setIsObjectEqual(false);
      }
    } else {
      if (isEqual(backup, data)) {
        setIsObjectEqual(true);
      }
    }
  }, [data]);

  const resetModalData = () => {
    setData(null);
    setBackup(null);
    props.modalDispatch({ type: MODAL_ACTION_TYPE.HIDE });
  };

  const closeModalHandler = () => {
    resetModalData();
  };

  const onChangeHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const value = e.target.value as string;
    const name = e.target.name;

    setData((prevState) => {
      if (!prevState) return;
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    const url = process.env.REACT_APP_BACKEND_API as string;

    const res = await fetch(url + `/disabled-days/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken(),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.log("error");
      setIsloading(false);
    } else {
      const data = await res.json();
      revalidator.revalidate();
      setIsloading(false);
      resetModalData();
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: { alertType: ALERT_TYPE.SUCCESS, message: data.message },
      });
    }
  };

  return (
    <Backdrop
      backdropClose
      closeModalHandler={closeModalHandler}
      header
      headerTitle="Kizárt dátum szerkesztése"
    >
      <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>
        {data && !fetchLoading && (
          <div className="flex flex-col mobile:flex-row gap-4 items-center">
            <div className="w-full">
              <label htmlFor="startDate">Kezdő dátum</label>
              <TextInput
                icon={BsFillCalendar2RangeFill}
                onChange={onChangeHandler}
                name="startDate"
                id="startDate"
                defaultValue={format(new Date(data.startDate), "yyyy-MM-dd")}
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
                defaultValue={format(new Date(data.endDate), "yyyy-MM-dd")}
                color="gray"
                type="date"
              />
            </div>
          </div>
        )}
        {fetchLoading && (
          <div className="w-full flex items-center justify-center py-4">
            <SyncLoader loading color="#00000080" size={".5rem"} />
          </div>
        )}
        <Button disabled={isObjectEqual} type="submit">
          <span className="flex gap-1 items-center">
            {isLoading ? (
              <ClipLoader loading={true} color={"white"} size={"1rem"} />
            ) : (
              <FaSave />
            )}
            Mentés
          </span>
        </Button>
        <span className="text-black/50 text-md">azonosító: {data?._id}</span>
      </form>
    </Backdrop>
  );
};

export default EditModal;
