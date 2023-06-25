import React from "react";
import { IconType } from "react-icons/lib";
const Capsule: React.FC<{
  Icon?: IconType;
  text: string;
  className?: string;
}> = (props) => {
  const { Icon, text, className } = { ...props };
  return (
    <li
      className={`flex items-center justify-center px-2 py-1 gap-2 bg-palette-4 rounded-full w-max shadow-md ${
        className ? className : ""
      } `}
    >
      {Icon && <Icon size={24} />}
      <p>{text}</p>
    </li>
  );
};

export default Capsule;
