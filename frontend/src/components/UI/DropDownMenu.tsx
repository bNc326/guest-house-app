import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const DropDownMenu: React.FC<{
  route: object[];
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
}> = (props) => {
  const dropDownStyle = ` pl-8 font-bold py-2`;
  const activeNavLinkStyle = `bg-palette-2 pl-8 py-2 font-bold text-palette-4`;

  const hideDropDownHandler = () => {
    props.setIsOpen(false);
  };
  return (
    <Fragment>
      {props.isOpen && (
        <div className="absolute z-40 top-[calc(64px+16px)] tablet:right-[calc(32px)] transform w-[calc(100%-32px)] tablet:w-1/2 bg-palette-3 rounded-xl overflow-hidden shadow-shadow animate__animated animate__fadeInDown">
          <ul className="flex flex-col">
            {props.route.map((route: any) => (
              <NavLink
                end={route.end}
                key={route.id}
                className={({ isActive }) =>
                  isActive ? activeNavLinkStyle : dropDownStyle
                }
                to={route.path}
                onClick={hideDropDownHandler}
              >
                {route.linkName}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default DropDownMenu;
