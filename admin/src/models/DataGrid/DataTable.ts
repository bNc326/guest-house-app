import React, { ComponentProps } from "react";
import { CRUD } from "./DataGrid";

export interface HeadProps extends ComponentProps<any> {
  tableHead: string[];
  withCheckbox?: boolean;
}

export interface BodyProps extends CRUD {
  tableHead: string[];
  data: any[];
  handleChangeCheckbox: (id: string) => void;
  deletableIds: string[];
  withCheckbox?: boolean;
}

export interface RowProps extends HeadProps, CRUD, ComponentProps<any> {
  data: any;
  deletableIds: string[];
  withCheckbox?: boolean;
}

export interface CellProps {
  data: React.ReactNode;
}

export interface ButtonProps extends CRUD {
  to?: string;
  callBack?: React.Dispatch<any>;
}
