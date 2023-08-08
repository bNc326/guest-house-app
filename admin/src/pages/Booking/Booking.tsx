import {
  useEffect,
  useState,
  useContext,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  json,
  useRouteLoaderData,
  useRevalidator,
  useOutletContext,
  LoaderFunctionArgs,
  useSearchParams,
} from "react-router-dom";
import { Button } from "flowbite-react";
import { TippContext } from "../../context/TippContext";
import { format } from "date-fns";
import { ALERT_TYPE, ALERT_ACTION_TYPE } from "../../models/Alert/AlertModels";
import { HiTrash } from "react-icons/hi";
import Table, {
  TableCell,
  TableRow,
  TableButton,
} from "../../components/UI/Table";
import { BookingDate } from "../../models/Booking/BookingDate";
import { Checkbox as CheckboxModel } from "../../models/CheckboxModel";
import { Outlet } from "../../models/OutletModel";
import { HotelContext } from "../../context/HotelContextProvider";
import ChangeHotelComponent from "../../components/ChangeHotelComponent";
import { useAuthHeader } from "react-auth-kit";
import DataGrid from "../../components/DataGrid/DataGrid";
import { CompTypeEnum } from "../../models/DataGrid/DataGrid";

const Booking = () => {
  return (
    <>
      <DataGrid
        endpoint="booking"
        filter={[
          "createdAt",
          "_id",
          "startDate",
          "endDate",
          "name",
          "email",
          "nightAmount",
          "HUF",
          "EUR",
          "status",
        ]}
        editComp={{ type: CompTypeEnum.PATH }}
        withChangeHotel
        withSearch
        withCheckbox
      />
    </>
  );
};

export default Booking;
