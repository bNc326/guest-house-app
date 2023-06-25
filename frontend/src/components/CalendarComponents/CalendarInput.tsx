import React from "react";
import BookingDate from "../../models/BookingDate";
const CalendarInput: React.FC<{ renderBookingDate: BookingDate | null }> = (
  props
) => {
  return (
    <div className="flex justify-center items-center gap-4 animate__animated animate__fadeInUp">
      <input
        type="text"
        placeholder="yyyy/MM/dd"
        className="rounded-2xl text-center w-[400px] bg-palette-3 text-palette-4 text-2xl font-medium border-none shadow-shadow"
        value={`${
          props.renderBookingDate?.firstDate
            ? props.renderBookingDate?.firstDate
            : "yyyy/MM/dd"
        }`}
        disabled
      />
      <span className="w-4 bg-palette-3 h-1 rounded"></span>
      <input
        type="text"
        placeholder="yyyy/MM/dd"
        className="rounded-2xl text-center w-[400px] bg-palette-3 text-palette-4 text-2xl font-medium border-none shadow-shadow"
        value={`${
          props.renderBookingDate?.endDate
            ? props.renderBookingDate?.endDate
            : "yyyy/MM/dd"
        }`}
        disabled
      />
    </div>
  );
};

export default CalendarInput;
