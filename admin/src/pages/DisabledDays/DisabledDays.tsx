import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  json,
  useRouteLoaderData,
  useRevalidator,
  useOutletContext,
  LoaderFunctionArgs,
} from "react-router-dom";
import { ALERT_TYPE, ALERT_ACTION_TYPE } from "../../models/Alert/AlertModels";
import AlertComponent from "../../components/UI/Alert";
import Table, {
  TableRow,
  TableButton,
  TableCell,
} from "../../components/UI/Table";
import { format } from "date-fns";
import { Button, Checkbox } from "flowbite-react";
import { HiTrash } from "react-icons/hi";
import { BsCalendar2PlusFill } from "react-icons/bs";
import { DisabledDaysModel } from "../../models/Disabled-days/Disabled-days";
import { Checkbox as CheckboxModel } from "../../models/CheckboxModel";
import useAlert from "../../hooks/useAlert";
import EditModal from "../../components/modal/EditModal";
import useModals from "../../hooks/useModals";
import { MODAL_ACTION_TYPE, MODAL_TYPE } from "../../models/Modal/ModalModal";
import NewModal from "../../components/modal/NewModal";
import { Outlet } from "../../models/OutletModel";
import ChangeHotelComponent from "../../components/ChangeHotelComponent";
import { HotelContext } from "../../context/HotelContextProvider";

const DisabledDays = () => {
  const data = useRouteLoaderData("disabled-days") as DisabledDaysModel;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const revalidator = useRevalidator();
  const [itemForDelete, setItemForDelete] = useState<string[]>([]);
  const [allItemDelete, setAllItemDelete] = useState<boolean>(false);
  const tableHead = ["id", "Kezdő Dátum", "Vége Dátum", "Admin", "Kelt"];
  const [deleteCheckbox, setDeleteCheckbox] = useState<CheckboxModel[]>([]);
  const { modal, modalDispatch } = useModals();
  const [isNewModal, setIsNewModal] = useState<boolean>(false);
  const outletCtx = useOutletContext() as Outlet;
  const hotelCtx = useContext(HotelContext);

  // * SIDE effects

  useEffect(() => {
    // * CHECKBOX set to all item

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

  useLayoutEffect(() => {
    const updateData: CheckboxModel[] = [];
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
          updateData.push({
            id: dataItem._id,
            checked: false,
          });
        }
      });
      setDeleteCheckbox(updateData);
    };

    const cleanup = setTimeout(() => {
      createCheckboxData();
    }, 200);

    return () => clearTimeout(cleanup);
  }, [data, hotelCtx]);

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


  // * HANDLERS for the delete item in the table

  const selectItemForDeleteHandler = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const id = e.target.id as string;
    const checked = e.target.checked;
    const index = itemForDelete.indexOf(id);
    const updateCheckbox = [...deleteCheckbox];

    updateCheckbox.map((item) => {
      if (item.checked && item.id === id) {
        item.checked = false;
        return;
      }

      if (!item.checked && item.id === id) {
        item.checked = true;
        return;
      }
    });

    setDeleteCheckbox(updateCheckbox);

    if (!checked) {
      setItemForDelete((prevState) => {
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)];
      });
      return;
    }
    setItemForDelete((prevState) => {
      if (index !== -1) {
        return prevState;
      }
      return [...prevState, id];
    });
  };

  const selectAllItemForDelete = (e: React.ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const checked = e.target.checked;
    const updateCheckbox = [...deleteCheckbox];
    const allId = updateCheckbox.map((item) => item.id);

    if (!checked) {
      updateCheckbox.map((item) => (item.checked = false));
      setDeleteCheckbox(updateCheckbox);
      setAllItemDelete(false);
      setItemForDelete([]);
      return;
    }
    updateCheckbox.map((item) => (item.checked = true));
    setAllItemDelete(true);
    setDeleteCheckbox(updateCheckbox);
    setItemForDelete(allId);
  };

  const deleteItemsHandler = async () => {
    const url = process.env.REACT_APP_BACKEND_API as string;

    const res = await fetch(
      url + `/disabled-days?hotel=${hotelCtx.hotelUUID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemForDelete),
      }
    );

    if (!res.ok) {
      console.log("err");
    } else {
      const data = await res.json();
      setDeleteCheckbox((prev) => {
        prev.map((item) => (item.checked = false));
        return prev;
      });
      revalidator.revalidate();
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: {
          alertType: ALERT_TYPE.SUCCESS,
          message: data.message,
        },
      });
    }
  };

  //*\

  return (
    <section className="w-full flex flex-col h-full gap-4">
      <div className="flex justify-between items-center w-full shadow-lg rounded-md p-4 bg-gray-300 font-medium">
        Új kizárt dátum
        <span
          className="cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
          onClick={() =>
            modalDispatch({
              type: MODAL_ACTION_TYPE.SHOW,
              payload: { id: null, modalType: MODAL_TYPE.NEW },
            })
          }
        >
          <BsCalendar2PlusFill size={"1.5rem"} />
        </span>
      </div>
      <div>
        {itemForDelete.length !== 0 && (
          <div className="w-full flex justify-between items-center bg-blue-600/30 backdrop-blur-sm p-2 rounded-md sticky top-16">
            <span>{itemForDelete.length} elem kiválasztva</span>{" "}
            <Button color="failure" onClick={deleteItemsHandler}>
              <span className="flex gap-1 items-center">
                <HiTrash />
                Törlés
              </span>
            </Button>
          </div>
        )}
        <ChangeHotelComponent path="foglalasi-naptar" />
        <div className="overflow-x-scroll">
          <Table
            tableHead={tableHead}
            allItemDelete={allItemDelete}
            selectAllItemForDelete={selectAllItemForDelete}
          >
            {data.map((date, index) => (
              <TableRow
                key={index}
                className={`${
                  index + 1 !== data.length && "border-b-[1px]"
                } border-black/30 `}
              >
                <TableCell className="p-4">
                  <input
                    type="checkbox"
                    className="rounded-sm cursor-pointer"
                    name={date._id}
                    id={date._id}
                    onChange={selectItemForDeleteHandler}
                    checked={deleteCheckbox[index]?.checked || false}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 ">
                  {date._id}
                </TableCell>
                <TableCell>
                  {format(new Date(date.startDate), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>
                  {format(new Date(date.endDate), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>{date.admin}</TableCell>
                <TableCell>
                  {format(new Date(date.createdAt), "yyyy-MM-dd")}
                </TableCell>
                <TableButton
                  modalDispatch={modalDispatch}
                  to={date._id}
                  type="modal"
                />
              </TableRow>
            ))}
          </Table>
        </div>
        {!data.length && (
          <div className="w-full text-center font-medium text-lg py-4">
            Nincs még kizárt nap
          </div>
        )}
      </div>

      {modal.modalType === MODAL_TYPE.EDIT && (
        <EditModal
          id={modal.id}
          isShow={modal.isShow}
          modalDispatch={modalDispatch}
        />
      )}
      {modal.modalType === MODAL_TYPE.NEW && (
        <NewModal
          id={modal.id}
          isShow={modal.isShow}
          modalDispatch={modalDispatch}
          setIsNewModal={setIsNewModal}
        />
      )}
    </section>
  );
};

export default DisabledDays;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const hotelQuery = request.url.split("hotel=")[1];
  const url = process.env.REACT_APP_BACKEND_API as string;
  const response = await fetch(url + `/disabled-days?hotel=${hotelQuery}`);

  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  } else {
    return response;
  }
}
