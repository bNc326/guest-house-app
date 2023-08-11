import React, { useState, useLayoutEffect, useContext } from "react";
import { Table, Checkbox, Rating } from "flowbite-react";
import { CompTypeEnum } from "../../models/DataGrid/DataGrid";
import {
  HeadProps,
  BodyProps,
  RowProps,
  CellProps,
  ButtonProps,
} from "../../models/DataGrid/DataTable";
import { NavLink } from "react-router-dom";
import { HotelContext } from "../../context/HotelContextProvider";
import { MODAL_ACTION_TYPE, MODAL_TYPE } from "../../models/Modal/ModalModal";
import { ASIDE_ACTION_TYPE } from "../../models/Aside/Aside";

export const TableHead: React.FC<HeadProps> = ({
  tableHead,
  onChange,
  checked,
  withCheckbox,
}) => {
  return (
    <Table.Head>
      {withCheckbox && (
        <Table.HeadCell className="p-4">
          <Checkbox
            theme={{
              root: {
                base: `h-5 w-5 rounded border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-cyan-500`,
              },
            }}
            onChange={onChange}
            checked={checked || false}
            className="cursor-pointer"
          />
        </Table.HeadCell>
      )}

      {tableHead.map((head, index) => {
        if (head)
          return (
            <Table.HeadCell key={index} className={`p-4`}>
              {head}
            </Table.HeadCell>
          );
      })}
      <Table.HeadCell>
        <span className="sr-only"></span>
      </Table.HeadCell>
    </Table.Head>
  );
};

export const TableBody: React.FC<BodyProps> = ({
  data,
  tableHead,
  editComp,
  handleChangeCheckbox,
  deletableIds,
  withCheckbox,
  searchValue,
}) => {
  const filterKeys = ["_id", "name", "email", "status", "hotelName", "NTAK"];
  const [filter, setFilter] = useState<string>();
  useLayoutEffect(() => {
    const cleanup = setTimeout(() => {
      setFilter(searchValue);
    }, 500);
    return () => clearTimeout(cleanup);
  }, [searchValue]);
  return (
    <Table.Body>
      {data.length
        ? data
            .filter((item) =>
              filterKeys.some(
                (key) =>
                  item[key] &&
                  item[key].toLowerCase().includes(filter)
              )
            )
            .map((item, index) => (
              <TableRow
                key={index}
                data={item}
                tableHead={tableHead}
                editComp={editComp}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleChangeCheckbox(item._id);
                }}
                deletableIds={deletableIds}
                withCheckbox={withCheckbox}
              />
            ))
        : ""}
    </Table.Body>
  );
};

const TableRow: React.FC<RowProps> = ({
  data,
  tableHead,
  editComp,
  onClick,
  deletableIds,
  withCheckbox,
}) => {
  return (
    <Table.Row
      theme={{
        base: "group/row border-b-[.5px] last:border-b-0",
        hovered: "hover:bg-gray-900/5 transition-all ease-in-out duration-150",
      }}
    >
      {" "}
      {withCheckbox && (
        <TableCell
          data={
            <Checkbox
              theme={{
                root: {
                  base: `h-5 w-5 rounded border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-cyan-500`,
                },
              }}
              checked={deletableIds.includes(data._id)}
              onChange={onClick}
              className="cursor-pointer"
            />
          }
        />
      )}
      {tableHead.map((head) => (
        <TableCell data={data[head]} />
      ))}
      {editComp && <TableButton to={data._id} editComp={editComp} />}
    </Table.Row>
  );
};

const TableCell: React.FC<CellProps> = ({ data }) => {
  const statusColor = {
    Accepted: "text-green-600 border-green-600 bg-green-600/10",
    Pending: "text-yellow-600 border-yellow-600 bg-yellow-600/10",
    Ejected: "text-red-600 border-red-600 bg-red-600/10",
  };
  if (data === "Accepted" || data === "Pending" || data === "Ejected") {
    const status = data as "Accepted" | "Pending" | "Ejected";
    return (
      <Table.Cell className="p-4">
        <>
          <span
            className={` whitespace-nowrap flex justify-center p-1 rounded-full font-bold border ${statusColor[status]}`}
          >
            {(data === "Accepted" && "Elfogadva") ||
              (data === "Pending" && "Függőben") ||
              (data === "Ejected" && "Elutasítva")}
          </span>
        </>
      </Table.Cell>
    );
  }
  if (typeof data === "string") {
    return (
      <Table.Cell className="p-4 whitespace-nowrap ">
        {`${data.toString().substring(0, 30)}${data.length > 30 ? "..." : ""}`}
      </Table.Cell>
    );
  }
  return <Table.Cell className="p-4 whitespace-nowrap ">{data}</Table.Cell>;
};

const TableButton: React.FC<ButtonProps> = ({ to, editComp }) => {
  const hotelCtx = useContext(HotelContext);
  return (
    <>
      {editComp?.type === CompTypeEnum.PATH && to && (
        <TableCell
          data={
            <NavLink
              to={`${to}?hotel=${hotelCtx.hotelId}`}
              className="text-blue-600 font-semibold"
            >
              módosítás
            </NavLink>
          }
        />
      )}
      {editComp?.type === CompTypeEnum.MODAL && to && (
        <TableCell
          data={
            <span
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                editComp.callBack &&
                  editComp.callBack({
                    type: MODAL_ACTION_TYPE.SHOW,
                    payload: { id: to, modalType: MODAL_TYPE.EDIT },
                  });
              }}
            >
              módosítás
            </span>
          }
        />
      )}
      {editComp?.type === CompTypeEnum.ASIDE && to && (
        <TableCell
          data={
            <span
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                editComp.callBack &&
                  editComp.callBack({
                    type: ASIDE_ACTION_TYPE.SHOW,
                    payload: { id: to },
                  });
              }}
            >
              módosítás
            </span>
          }
        />
      )}
    </>
  );
};
