import BookingDate from "models/BookingDate";
import React from "react";

const CalendarNextButton: React.FC<{
  renderBookingDate: BookingDate | null;
}> = (props) => {
  return (
    <>
      {props.renderBookingDate?.firstDate &&
        props.renderBookingDate.endDate && (
          <div className=" w-full flex justify-center">
            <button className="bg-palette-3/50 rounded-full shadow-shadow text-palette-4 w-1/3 font-medium py-2 text-center  text-2xl animate__animated animate__bounceIn">
              Tovább
            </button>
          </div>
        )}
    </>
  );
};

export default CalendarNextButton;
