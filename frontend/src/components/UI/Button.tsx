import { IconType } from "react-icons/lib";

const Button: React.FC<{
  onClick?: () => void;
  bordered?: boolean;
  className?: string;
  btnText?: string;
  icon?: IconType;
}> = (props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex justify-center items-center font-medium py-2 text-dynamicBtn ${
          props.bordered
            ? " border-palette-4 border-[3px] text-palette-4 hover:bg-palette-4 hover:text-white"
            : "text-white bg-palette-4 hover:bg-[#7f5039]"
        }  rounded-xl transition-all ease-in-out duration-300 ${
          props.className
        }`}
      >
        <span className="flex gap-2 items-center justify-center">
          {props.icon && (
            <span>
              <props.icon />
            </span>
          )}
          {props.btnText}
        </span>
      </button>
    </>
  );
};

export default Button;
