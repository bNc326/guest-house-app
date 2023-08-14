import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { Outlet } from "../../models/OutletModel";
import { HotelContext } from "../../context/HotelContextProvider";
import { DataGridProps } from "../../models/DataGrid/DataGrid";
import DataGridHeader from "./DataGridHeader";
import {
  RefreshContext,
  RefreshEnum,
} from "../../context/RefreshContextProvider";
import useFetch from "../../hooks/useFetch";
import { Table, Button, Rating } from "flowbite-react";
import { TableHead, TableBody } from "./DataTable";
import { format } from "date-fns";
import lang from "../../Lang/lang";
import { cloneDeep } from "lodash";
import { HiTrash } from "react-icons/hi";
import { ALERT_ACTION_TYPE, ALERT_TYPE } from "../../models/Alert/AlertModels";

export type Checkbox = {
  id: string;
  checked: boolean;
};

const DataGrid: React.FC<DataGridProps> = ({
  endpoint,
  filter,
  query,
  editComp,
  newComp,
  initialData,
  withChangeHotel,
  withSearch,
  withCheckbox,
  socketData,
}) => {
  const language = lang;
  const { data, reFetch } = useFetch(endpoint, { query, socketData });
  const [formatData, setFormatData] = useState<any[]>([]);
  const [formatHeader, setFormatHeader] = useState<string[]>([]);
  const [deletableIds, setDeletableIds] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const hotelCtx = useContext(HotelContext);
  const refreshCtx = useContext(RefreshContext);
  const outletCtx = useOutletContext() as Outlet;
  const accessToken = useAuthHeader();

  useEffect(() => {
    const cleanup = setTimeout(() => {
      if (refreshCtx.loading === RefreshEnum.END) return;
      reFetch();
    }, 100);
    return () => clearTimeout(cleanup);
  }, [refreshCtx.loading]);

  useLayoutEffect(() => {
    const handleFormatHeader = () => {
      const updateFilter = cloneDeep([...filter]);
      filter.map((item, index) => {
        language.map((lang) => {
          if (item === lang.eng) {
            updateFilter[index] = lang.hu;
          }
          if (item === "_id") {
            updateFilter[index] = "id";
          }
        });
      });
      setFormatHeader(updateFilter);
    };
    const cleanup = setTimeout(handleFormatHeader, 100);
    return () => clearTimeout(cleanup);
  }, []);

  useLayoutEffect(() => {
    const handleFormatData = () => {
      const updateData = cloneDeep([...data]);
      data.map((item, index) => {
        for (let i in item) {
          if (i === "startDate" || i === "endDate") {
            updateData[index][i] = format(new Date(item[i]), "P");
          }
          if (i === "createdAt") {
            updateData[index][i] = format(new Date(item[i]), `p${" "}P`);
          }
          if (i === "rating") {
            const stars: React.ReactNode[] = [];
            const rating: number = updateData[index][i];
            for (let rateI = 1; rateI <= 5; rateI++) {
              if (rateI <= rating) {
                stars.push(<Rating.Star key={rateI} filled />);
              } else {
                stars.push(
                  <Rating.Star key={rateI} className="fill-gray-700" />
                );
              }
            }
            const renderStars = <Rating>{stars.map((star) => star)}</Rating>;
            updateData[index][i] = renderStars;
          }
        }
        setFormatData(updateData);
      });
    };

    const cleanup = setTimeout(() => {
      setCheckAll(false);
      setDeletableIds([]);
      setFormatData([]);
      handleFormatData();
    }, 100);
    return () => clearTimeout(cleanup);
  }, [data]);

  useLayoutEffect(() => {
    const cleanup = setTimeout(() => {
      if (formatData.length && deletableIds.length === formatData.length) {
        setCheckAll(true);
      } else {
        setCheckAll(false);
      }
    }, 100);

    return () => clearTimeout(cleanup);
  }, [deletableIds]);

  const handleChangeCheckbox = (id: string) => {
    const isIn = deletableIds.includes(id);

    if (!isIn) {
      setDeletableIds((prev) => [...prev, id]);
      return;
    }

    setDeletableIds(deletableIds.filter((item) => item !== id));
  };

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    const ids: string[] = [];
    formatData.map((item) => ids.push(item._id));
    setDeletableIds(ids);
    if (checkAll) {
      setDeletableIds([]);
    }
  };

  const handleDeleteItems = async () => {
    const url = process.env.REACT_APP_BACKEND_API as string;

    const res = await fetch(`${url}/${endpoint}?hotel=${hotelCtx.hotelId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken(),
      },
      body: JSON.stringify(deletableIds),
    });

    if (!res.ok) {
      console.log("error");
    } else {
      const data = await res.json();
      reFetch();
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: {
          alertType: ALERT_TYPE.SUCCESS,
          message: data.message,
        },
      });
      setDeletableIds([]);
    }
  };

  return (
    <section className={`flex flex-col w-full relative px-4`}>
      <DataGridHeader
        changeHotel={withChangeHotel}
        newComp={newComp}
        search={withSearch ? { withSearch: true, setSearchValue } : undefined}
      />
      {deletableIds.length !== 0 && (
        <div className="w-full flex justify-between items-center bg-blue-600/30 backdrop-blur-sm p-2 rounded-md sticky top-16 z-[5000]">
          <span>{deletableIds.length} elem kiválasztva</span>{" "}
          <Button color="failure" onClick={handleDeleteItems}>
            <span className="flex gap-1 items-center">
              <HiTrash />
              Törlés
            </span>
          </Button>
        </div>
      )}

      <div className="overflow-x-scroll rounded-lg border border-gray-300">
        <Table
          hoverable
          theme={{
            root: {
              base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
              shadow:
                "absolute bg-white dark:bg-black w-full h-full top-0 left-0 rounded-lg -z-10",
              wrapper: "relative",
            },
          }}
        >
          <TableHead
            onChange={handleCheckAll}
            checked={checkAll}
            tableHead={formatHeader}
            withCheckbox={withCheckbox}
          />
          <TableBody
            deletableIds={deletableIds}
            handleChangeCheckbox={handleChangeCheckbox}
            data={formatData}
            tableHead={filter}
            editComp={editComp}
            withCheckbox={withCheckbox}
            searchValue={searchValue}
          />
        </Table>
        {!formatData.length && (
          <div className="w-full flex justify-center p-2">Nincs még adat..</div>
        )}
      </div>
    </section>
  );
};

export default DataGrid;
