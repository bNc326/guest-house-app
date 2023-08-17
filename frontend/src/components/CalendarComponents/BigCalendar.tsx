import React, { useRef, useEffect, useContext } from "react";
import DateModel from "models/DateModel";
import { getMonth } from "date-fns";
import { HotelContext } from "context/HotelContextProvider";
import Month from "./Month";
const BigCalendar: React.FC<{
  weekDays: string[];
  renderCalendar: DateModel[][];
  blockedDate?: Date | string;
  onClick?: (e: React.MouseEvent<EventTarget>) => void;
  onMouseEnter?: (e: React.MouseEvent<EventTarget>) => void;
  onMouseLeave?: (e: React.MouseEvent<EventTarget>) => void;
}> = (props) => {
  const calendar = useRef<HTMLDivElement>(null);
  const currentMonth = getMonth(new Date());
  const hotelCtx = useContext(HotelContext);

  useEffect(() => {
    calendar.current?.children[currentMonth].scrollIntoView({
      block: "center",
    });
  }, [currentMonth, hotelCtx.hotelId]);

  return (
    <div
      ref={calendar}
      className="flex flex-wrap w-full gap-4 justify-center cursor-pointer select-none"
    >
      {props.renderCalendar.map((month, monthIndex) => (
        <Month
          month={month}
          monthIndex={monthIndex}
          handleEnterMouse={props.onMouseEnter}
          handleClick={props.onClick}
        />
      ))}
    </div>
  );
};

export default BigCalendar;
