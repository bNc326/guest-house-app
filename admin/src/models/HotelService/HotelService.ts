import { IconType } from "react-icons";
import { ComponentProps } from "react";

export interface IconTypes extends Record<string, IconType> {
  [key: string]: IconType;
}

export interface DynamicIconComp extends ComponentProps<any> {
  name: string;
  size?: number | string;
}
