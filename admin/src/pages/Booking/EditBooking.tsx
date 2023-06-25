import { useState, useEffect, useReducer } from "react";
import {
  useParams,
  json,
  useRouteLoaderData,
  LoaderFunctionArgs,
  useRevalidator,
  useOutletContext,
} from "react-router-dom";
import ModalComp from "../../components/modal/Modal";
import { BookingDateObject } from "../../models/Booking/BookingDate";
import EditBookingForm from "../../components/BookingComponents/EditBookingForm";
import EditBookingPreview from "../../components/BookingComponents/EditBookingPreview";
import useIsSure from "../../hooks/useIsSure";
import { IS_SURE_ENUM } from "../../models/IsSure/IsSure";
import useAlert from "../../hooks/useAlert";
import { ALERT_TYPE, ALERT_ACTION_TYPE } from "../../models/Alert/AlertModels";
import AlertComponent from "../../components/UI/Alert";
import { Outlet } from "../../models/OutletModel";

const EditBooking = () => {
  const params = useParams();
  const revalidator = useRevalidator();
  const data = useRouteLoaderData("editBooking") as BookingDateObject;
  const [showModal, setShowModal] = useState(false);
  const { isSure, isSureDispatch } = useIsSure();
  const outletCtx = useOutletContext() as Outlet;

  useEffect(() => {
    const acceptOrEjectFetcher = async (action: "ACCEPT" | "EJECT") => {
      const url = process.env.REACT_APP_BACKEND_API as string;
      let body = { ...data };
      if (action === "ACCEPT") {
        body.status = "Accepted";
      }
      if (action === "EJECT") {
        body.status = "Ejected";
      }

      const response = await fetch(url + `/booking/${params.bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.log("error");
      } else {
        await response.json();
        revalidator.revalidate();
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.SUCCESS,
            message: `Sikeresen ${
              isSure.actionType === "ACCEPT" ? "jóváhagytad" : ""
            } ${
              isSure.actionType === "EJECT" ? "elutasítottad" : ""
            } a foglalást`,
          },
        });
      }
    };

    const cleanup = setTimeout(() => {
      if (isSure.actionType === null || !isSure.isSure) {
        isSureDispatch({ type: IS_SURE_ENUM.RESET });
        return;
      }

      if (isSure.actionType === "ACCEPT" && isSure.isSure) {
        acceptOrEjectFetcher("ACCEPT");
        isSureDispatch({ type: IS_SURE_ENUM.RESET });
      }

      if (isSure.actionType === "EJECT" && isSure.isSure) {
        acceptOrEjectFetcher("EJECT");
        isSureDispatch({ type: IS_SURE_ENUM.RESET });
      }
    }, 300);

    return () => clearTimeout(cleanup);
  }, [isSure.isSure]);

  return (
    <section className="w-full flex flex-col laptop:gap-4 laptop:py-4 items-center">
      <ModalComp
        setIsShow={setShowModal}
        isSure={isSure}
        isShow={showModal}
        isSureDispatch={isSureDispatch}
      />
      <EditBookingPreview
        params={params}
        data={data}
        setShowModal={setShowModal}
        isSureDispatch={isSureDispatch}
      />
      <EditBookingForm data={data} />
    </section>
  );
};

export default EditBooking;

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const id = params.bookingId;
  const url = process.env.REACT_APP_BACKEND_API as string;
  const response = await fetch(url + `/booking/${id}`);
  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  } else {
    return response;
  }
};
