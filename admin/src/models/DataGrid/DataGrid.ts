import { SocketData } from "../../hooks/useSocket";

export enum CompTypeEnum {
  PATH = "comp_path",
  MODAL = "comp_modal",
  ASIDE = "comp_aside",
}

export interface DataGridProps extends CRUD {
  endpoint: string;
  filter: string[]; //* filter rendered field; DEFAULT render all field
  query?: string;
  initialData?: any[];
  withChangeHotel?: boolean;
  withSearch?: boolean;
  withCheckbox?: boolean;
  socketData?: SocketData;
}

export interface DataTableProps extends CRUD {
  data: any[];
  filter?: string[];
}

export interface DataGridHeader extends CRUD {
  changeHotel?: boolean;
  search?: {
    withSearch: boolean;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  };
}

export interface CompObj {
  type: CompTypeEnum;
  callBack?: React.Dispatch<any>;
}

export interface CRUD {
  newComp?: CompObj;
  editComp?: CompObj;
}
