import React, { ComponentProps } from "react";
import { Link } from "react-router-dom";
import {
  MODAL_ACTION,
  MODAL_ACTION_TYPE,
  MODAL_TYPE,
} from "../../models/Modal/ModalModal";

const Table: React.FC<{
  children?: JSX.Element[];
  tableHead: string[];
  allItemDelete: boolean;
  selectAllItemForDelete?: (e: React.ChangeEvent) => void;
}> = (props) => {
  return (
    <>
      <table className="w-full rounded-lg shadow-lg text-dynamicMedium">
        <thead>
          <tr className="font-medium uppercase text-xs">
            {props.selectAllItemForDelete && (
              <td className="p-4 ">
                <input
                  type="checkbox"
                  className="rounded-sm cursor-pointer"
                  onChange={props.selectAllItemForDelete}
                  checked={props.allItemDelete || false}
                />
              </td>
            )}

            {props.tableHead.map((head, index) => (
              <td key={index} className="!p-4">
                {head}
              </td>
            ))}
          </tr>
        </thead>
        {props.children && (
          <tbody>
            <>{props.children}</>
          </tbody>
        )}
      </table>
    </>
  );
};

export default Table;

interface Children extends Record<any, any> {
  children: JSX.Element | JSX.Element[] | any;
}

interface TableCellInterface extends Children {
  className?: string;
}

interface TableCellProps extends ComponentProps<any> {}

interface TableRowProps extends ComponentProps<any> {
  children: JSX.Element | JSX.Element[];
}

export const TableRow: React.FC<TableRowProps> = (props) => {
  return <tr className={props.className + 'hover:bg-gray-300 transition-all ease-in-out duration-150 '}>{props.children}</tr>;
};

export const TableCell: React.FC<TableCellProps> = (props) => {
  return (
    <td {...props} className={`${props.className} whitespace-nowrap px-4`}>
      {props.children}
    </td>
  );
};

export const TableButton: React.FC<{
  to: string;
  type: "edit" | "delete" | "modal";
  modalDispatch?: React.Dispatch<MODAL_ACTION>;
}> = (props) => {
  return (
    <td className="px-4">
      {props.type === "edit" && (
        <Link
          to={props.to}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Szerkesztés
        </Link>
      )}
      {props.type === "delete" && (
        <Link
          to={props.to}
          className="font-medium text-red-600 hover:underline dark:text-red-500"
        >
          Törlés
        </Link>
      )}
      {props.type === "modal" && (
        <span
          onClick={() => {
            props.modalDispatch &&
              props.modalDispatch({
                type: MODAL_ACTION_TYPE.SHOW,
                payload: { id: props.to, modalType: MODAL_TYPE.EDIT },
              });
          }}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
        >
          Szerkesztés
        </span>
      )}
    </td>
  );
};
