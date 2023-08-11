import react, { ComponentProps } from "react";

export interface Input {
  input: InputValidator;
  setInput: React.Dispatch<React.SetStateAction<InputValidator>>;
}

export interface InputValidator {
  [key: string]: {
    pattern: RegExp | null;
    valid: boolean;
    value: any;
    firstTouch: boolean;
    error: string;
  };
}

export interface PassData {
  [key: string]: any;
}

export interface FormProps extends ComponentProps<any> {
  id?: string;
  inputs: Input;
  passData?: PassData;
  sendAction?: {
    endpoint: string;
    method: "POST" | "PUT";
    query?: string;
    callBack?: () => void;
  };
  acceptAction?: {
    endpoint: string;
    initialStatus: "Accepted" | "Pending" | "Ejected";
    id: string;
  };
  withoutHotelQuery?: boolean;
  children: (object: ChildProps) => React.ReactNode;
}

export interface ChildProps {
  handleChange: (e: React.ChangeEvent) => void;
  handleBlur: (e: React.ChangeEvent) => void;
}
