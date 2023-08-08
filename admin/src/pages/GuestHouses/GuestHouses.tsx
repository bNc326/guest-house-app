import React, { useContext } from "react";
import { HotelContext } from "../../context/HotelContextProvider";
import DataGrid from "../../components/DataGrid/DataGrid";
import { CompTypeEnum } from "../../models/DataGrid/DataGrid";
import { ClipLoader } from "react-spinners";

const GuestHouses = () => {
  return (
    <>
      <DataGrid
        endpoint="hotels"
        filter={["createdAt", "_id", "hotelName", "price", "NTAK"]}
        query="-bookedDates,-disabledDays,-ratings"
        editComp={{ type: CompTypeEnum.PATH }}
        newComp={{ type: CompTypeEnum.PATH }}
        withSearch
      />
    </>
  );
};

export default GuestHouses;
