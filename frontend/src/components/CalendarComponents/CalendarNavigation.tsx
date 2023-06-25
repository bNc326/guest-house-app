import React from "react";
import Arrow from "assets/svg/arrow.svg";
const CalendarNavigation: React.FC<{
  months: string[];
  currMonth: number;
  currYear: number;
  subMonthHandler: () => void;
  addMonthHandler: () => void;
}> = (props) => {
  return (
    <div className="flex justify-center items-center py-8 gap-8 animate__animated animate__fadeInDown">
      <img
        src={Arrow}
        alt="nyíl"
        className="w-12 rotate-90 cursor-pointer"
        onClick={props.subMonthHandler}
      />
      <h3 className="text-5xl text-palette font-bold">{`${
        props.months[props.currMonth]
      } ${props.currYear}`}</h3>
      <img
        src={Arrow}
        alt="nyíl"
        className="w-12 -rotate-90 cursor-pointer"
        onClick={props.addMonthHandler}
      />
    </div>
  );
};

export default CalendarNavigation;
