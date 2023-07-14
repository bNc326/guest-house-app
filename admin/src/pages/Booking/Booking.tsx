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

const Booking = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const revalidator = useRevalidator();
  const data = useRouteLoaderData("booking") as BookingDate;
  const [itemForDelete, setItemForDelete] = useState<string[]>([]);
  const [allItemDelete, setAllItemDelete] = useState<boolean>(false);
  const tableHead = [
    "id",
    "Kezdő Dátum",
    "Vége Dátum",
    "Email",
    "Foglaló",
    "Éjszakák",
    "HUF",
    "EUR",
    "Kelt",
    "Státusz",
  ];
  const [deleteCheckbox, setDeleteCheckbox] = useState<CheckboxModel[]>([]);
  const outletCtx = useOutletContext() as Outlet;
  const ctx = useContext(TippContext);
  const hotelCtx = useContext(HotelContext);
  const accessToken = useAuthHeader();

  // * SIDE effects

  useEffect(() => {
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
  useLayoutEffect(() => {
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

    const res = await fetch(url + `/booking?hotel=${hotelCtx.hotelUUID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken(),
      },
      body: JSON.stringify(itemForDelete),
    });

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
    <section className={`flex flex-col gap-4 w-full relative`}>
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

              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {date._id}
              </TableCell>
              <TableCell>
                {format(new Date(date.startDate), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>
                {format(new Date(date.endDate), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>{date.costumer.email}</TableCell>
              <TableCell>{date.costumer.name}</TableCell>
              <TableCell>{date.nightAmount}</TableCell>
              <TableCell>{date.price.HUF} Ft</TableCell>
              <TableCell>{date.price.EUR} &#8364;</TableCell>
              <TableCell>
                {format(new Date(date.createdAt), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>
                {date.status === "Accepted" && (
                  <span className=" border-green-600 border-2 rounded-3xl p-2 text-green-600 font-bold">
                    Elfogadva
                  </span>
                )}
                {date.status === "Pending" && (
                  <span className=" border-yellow-600 border-2 rounded-3xl p-2 text-yellow-600 font-bold">
                    Függőben
                  </span>
                )}
                {date.status === "Ejected" && (
                  <span className=" border-red-600 border-2 rounded-3xl p-2 text-red-600 font-bold">
                    Elutasítva
                  </span>
                )}
              </TableCell>
              <TableButton
                to={`${date._id}?hotel=${hotelCtx.hotelUUID}`}
                type="edit"
              />
            </TableRow>
          ))}
        </Table>
      </div>
      {!data.length && (
        <div className="w-full text-center font-medium text-lg py-4">
          Nincs még foglalás
        </div>
      )}
    </section>
  );
};

export default Booking;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const hotelQuery = request.url.split("hotel=")[1];

  const url = process.env.REACT_APP_BACKEND_API as string;
  const response = await fetch(`${url}/booking?hotel=${hotelQuery}`);

  if (!response.ok) {
    throw json({ message: "fetch failed" }, { status: 500 });
  } else {
    return response;
  }
}
