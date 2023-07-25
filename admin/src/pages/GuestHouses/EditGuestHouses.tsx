import { useEffect, useState } from "react";
import { useRouteLoaderData, LoaderFunctionArgs, json } from "react-router-dom";
import { GuestHouseModel } from "../../models/GuestHouseModel";
import EditGuestHouseForm from "../../components/GuestHouseComponents/EditGuestHouseForm";
import AlertComponent from "../../components/UI/Alert";
import useAlert from "../../hooks/useAlert";

const EditGuestHouses = () => {
  const data = useRouteLoaderData("editGuestHouse") as GuestHouseModel;
  return (
    <article className="p-4 shadow-xl flex justify-center space-y-8 rounded-3xl w-full">
      <EditGuestHouseForm data={data} />
    </article>
  );
};

export default EditGuestHouses;

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const id = params.guestHouseId;
  const url = process.env.REACT_APP_BACKEND_API as string
  const response = await fetch(url +
    `/hotels/${id}`
  );
  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  } else {
    return response;
  }
};
