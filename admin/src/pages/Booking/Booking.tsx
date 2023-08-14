import { useContext } from "react";
import DataGrid from "../../components/DataGrid/DataGrid";
import { CompTypeEnum } from "../../models/DataGrid/DataGrid";
import { HotelContext } from "../../context/HotelContextProvider";

const Booking = () => {
  const hotelCtx = useContext(HotelContext);
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
        socketData={{
          socketEndpoint: `${hotelCtx.hotelId}-booking`,
          alert: {
            new: "Új foglalás érkezett",
            update: "Egy admin módosított egy foglalást",
            delete: "Egy admin törölt egy/több foglalást",
          },
        }}
      />
    </>
  );
};

export default Booking;
