import React from "react";
import DataGrid from "../../components/DataGrid/DataGrid";
import RatingAside from "../../components/Rating/RatingAside";
import useAside from "../../hooks/useAside";
import { CompTypeEnum } from "../../models/DataGrid/DataGrid";
const Rating = () => {
  const { aside, asideDispatch } = useAside();
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
