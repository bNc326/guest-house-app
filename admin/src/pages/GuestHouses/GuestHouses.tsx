import React from "react";
import { useState, useEffect } from "react";
import {
  useRouteLoaderData,
  useRevalidator,
  json,
  useNavigate,
} from "react-router-dom";
import useAlert from "../../hooks/useAlert";
import AlertComponent from "../../components/UI/Alert";
import { Checkbox as CheckboxModel } from "../../models/CheckboxModel";
import { ALERT_TYPE, ALERT_ACTION_TYPE } from "../../models/Alert/AlertModels";
import { BsFillHouseAddFill } from "react-icons/bs";
import Table, {
  TableButton,
  TableCell,
  TableRow,
} from "../../components/UI/Table";
import { format } from "date-fns";
import { HiTrash } from "react-icons/hi";
import { HotelsModel } from "../../models/Hotels/HotelsModel";

const GuestHouses = () => {
  const data = useRouteLoaderData("guest-house") as HotelsModel;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [itemForDelete, setItemForDelete] = useState<string[]>([]);
  const [allItemDelete, setAllItemDelete] = useState<boolean>(false);
  const tableHead = ["Id", "Vendégház", "Ár/éj", "NTAK"];
  const [deleteCheckbox, setDeleteCheckbox] = useState<CheckboxModel[]>([]);

  // * SIDE effects

  useEffect(() => {
    // * CHECKBOX set to all item
    const updateData: CheckboxModel[] = [...deleteCheckbox];
    const createCheckboxData = () => {
      itemForDelete.map((item) => {
        const index = updateData.findIndex((i) => i.id === item);
        updateData.splice(index, 1);
      });
      setItemForDelete([]);
      data.map((dataItem) => {
        const id = dataItem._id as string;
        const index = updateData.findIndex((item) => item.id === id);
        if (index === -1) {
          if (dataItem._id === undefined) return;
          updateData.push({
            id: dataItem._id,
            checked: false,
          });
        }
      });
      setDeleteCheckbox(updateData);
    };

    createCheckboxData();
    //*\

    // * REFETCH in every minute
    if (!isMounted) {
      revalidator.revalidate();
      setIsMounted(true);
      return;
    }

    const cleanupInterval = setInterval(() => {
      revalidator.revalidate();
    }, 60000);
    //*\

    // * CLEANUP function
    return () => {
      clearInterval(cleanupInterval);
    };
  }, [data]);

  // * LISTENER for all item select in the table
  useEffect(() => {
    const getAllSelected = () => {
      if (deleteCheckbox.length === 0) return;
      for (let i in deleteCheckbox) {
        if (
          (!deleteCheckbox[i].checked && deleteCheckbox[i].checked !== null) ||
          undefined
        ) {
          return false;
        }
      }
      return true;
    };
    getAllSelected() ? setAllItemDelete(true) : setAllItemDelete(false);
  }, [deleteCheckbox]);
  //*\


  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center w-full shadow-lg rounded-md p-4 bg-gray-300 font-medium">
        Új kizárt dátum
        <span
          className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
          onClick={() => navigate("uj-vendeghaz")}
        >
          <BsFillHouseAddFill size={"1.5rem"} />
        </span>
      </div>
      <div className="overflow-x-scroll">
        <Table tableHead={tableHead} allItemDelete={allItemDelete}>
          {data.map((hotel, index) => (
            <TableRow
              key={index}
              className={`${
                index + 1 !== data.length && "border-b-[1px]"
              } border-black/30 `}
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white !p-4">
                {hotel._id}
              </TableCell>
              <TableCell>{hotel.hotelName}</TableCell>
              <TableCell>{hotel.price}</TableCell>
              <TableCell>{hotel.impressum.NTAK_regNumber}</TableCell>

              <TableButton to={hotel._id ? hotel._id : ""} type="edit" />
            </TableRow>
          ))}
        </Table>
        {!data.length && (
          <div className="w-full text-center font-medium text-lg py-4">
            Nincs még kizárt nap
          </div>
        )}
      </div>

    </section>
  );
};

export default GuestHouses;

export async function loader() {
  const url = process.env.REACT_APP_BACKEND_API as string
  const response = await fetch(url + `/hotels`);

  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  } else {
    return response;
  }
}
