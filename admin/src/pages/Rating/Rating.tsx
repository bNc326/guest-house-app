import React, { useContext } from "react";
import DataGrid from "../../components/DataGrid/DataGrid";
import RatingAside from "../../components/Rating/RatingAside";
import useAside from "../../hooks/useAside";
import { CompTypeEnum } from "../../models/DataGrid/DataGrid";
import { HotelContext } from "../../context/HotelContextProvider";
const Rating = () => {
  const { aside, asideDispatch } = useAside();
  const hotelCtx = useContext(HotelContext);
  return (
    <>
      <section className="flex relative">
        {/* //TODO render rating star in datagrid */}
        <DataGrid
          endpoint="ratings"
          filter={[
            "createdAt",
            "_id",
            "name",
            "email",
            "rating",
            "message",
            "status",
          ]}
          editComp={{ type: CompTypeEnum.ASIDE, callBack: asideDispatch }}
          withCheckbox
          withChangeHotel
          withSearch
          socketData={{
            socketEndpoint: `${hotelCtx.hotelId}-ratings`,
            alert: {
              new: "Új értékelés érkezett!",
              update: "Egy admin módosított egy értékelést!",
              delete: "Egy admin törölt egy/több értékelést!",
            },
          }}
        />
        <RatingAside
          id={aside.id ? aside.id : ""}
          isShow={aside.isShow}
          dispatchFn={asideDispatch}
        />
      </section>
    </>
  );
};

export default Rating;
