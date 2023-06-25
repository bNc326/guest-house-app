import React, { useRef, useEffect, Fragment } from "react";
import DateModel from "models/DateModel";
import { getMonth } from "date-fns";
const BigCalendar: React.FC<{
  weekDays: string[];
  renderCalendar: DateModel[][];
  currentYear: number;
  months: string[];
  blockedDate?: Date | string;
  onClick?: (e: React.MouseEvent<EventTarget>) => void;
  onMouseEnter?: (e: React.MouseEvent<EventTarget>) => void;
  onMouseLeave?: (e: React.MouseEvent<EventTarget>) => void;
}> = (props) => {
  const calendar = useRef<HTMLDivElement>(null);
  const currentMonth = getMonth(new Date());
  useEffect(() => {
    calendar.current?.children[currentMonth].scrollIntoView({
      block: "center",
    });
  }, [currentMonth]);

  return (
    <div
      ref={calendar}
      className="flex flex-wrap w-full gap-4 justify-center cursor-pointer select-none"
    >
      {props.renderCalendar.map((month, monthIndex) => (
        <div
          key={monthIndex}
          className="bg-calendar w-[calc(100%)] mobile:w-[calc(50%-1rem/2)] laptop:w-[calc(33%-1rem/2)] h-full rounded-3xl shadow-shadow relative"
        >

          {/* Current Year*/}
          <div className="flex justify-center py-2 z-50 text-palette-2">
            <h2 className="text-dynamicTitle3 font-medium">
              <span className="font-bold">{props.currentYear}</span>{" "}
              {props.months[monthIndex]}
            </h2>
          </div>

          {/* Week */}
          <div className="bg-[#6D4D37] flex justify-between p-4">
            {props.weekDays.map((day, weekDaysIndex) => (
              <div key={weekDaysIndex} className="w-[calc(100%/7)]">
                <h3
                  className={`text-dynamicList text-palette-2 ${
                    (weekDaysIndex === 5 || weekDaysIndex === 6) && "font-bold"
                  } ${weekDaysIndex < 5 && "font-medium"} w-full text-center`}
                >
                  {day.substring(0, 2)}
                </h3>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="flex w-full p-4 tablet:py-10 tablet:px-8  flex-wrap">
            {month.map((day, dayIndex) => (
              <h3
                key={dayIndex}
                className={`text-dynamicList w-[calc(100%/7)] text-palette-2 h-max p-dynamicCalendarDay flex items-center justify-center font-bold  ${
                  day.today ? "underline" : ""
                } ${!day.prevMonth && "border-[.5px] border-[#A2795A]"} ${
                  day.selected && !day.prevMonth ? "bg-palette-5" : ""
                } ${
                  day.disabled && !day.prevMonth && !day.nextMonth
                    ? `bg-palette-4/25 cursor-not-allowed opacity-50`
                    : ""
                } ${
                  day.disabledDays && !day.prevMonth && !day.disabled
                    ? "bg-palette-4/25 cursor-not-allowed opacity-50"
                    : ""
                } animate__animated animate__zoomIn ${
                  day.booked &&
                  !day.prevMonth &&
                  !day.disabled &&
                  "bg-palette-4 cursor-not-allowed opacity-80"
                } ${
                  day.pendingBooking &&
                  !day.prevMonth &&
                  !day.disabled &&
                  "BookedDisabled"
                } ${
                  day.startSelected &&
                  !day.prevMonth &&
                  !day.disabled &&
                  "startSelectedDate"
                } ${
                  day.endSelected &&
                  !day.prevMonth &&
                  !day.disabled &&
                  "endSelectedDate"
                } ${
                  day.startBooked &&
                  !day.prevMonth &&
                  !day.disabled &&
                  "startBookedDate"
                }  ${
                  day.endBooked &&
                  !day.prevMonth &&
                  !day.disabled &&
                  "endBookedDate"
                } ${
                  day.startPendingBooking &&
                  !day.prevMonth &&
                  "startBookedDisabled"
                } ${
                  day.endPendingBooking && !day.prevMonth && "endBookedDisabled"
                } ${
                  ((day.startPendingBooking && day.endBooked) === true ||
                    (day.endPendingBooking && day.startBooked) === true) &&
                  "cursor-not-allowed"
                }`}
                data-id={day.id}
                data-date={day.date}
                data-today={day.today}
                data-index={dayIndex}
                data-arrayindex={day.arrayIndex}
                data-disabled={day.disabled}
                data-booked={day.booked}
                data-prevmonth={day.prevMonth}
                data-nextmonth={day.nextMonth}
                data-disabled-days={day.disabledDays}
                data-pending-booking={day.pendingBooking}
                data-booked-and-pending-booked={day.bookedAndPendingBooked}
                onClick={props.onClick}
                onMouseEnter={props.onMouseEnter}
              >
                {day.value}
              </h3>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BigCalendar;
