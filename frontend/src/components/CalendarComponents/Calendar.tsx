import DateModel from "../../models/DateModel";
import { DbDateModel, DisabledDbDays } from "../../models/DbDateModel";
import { getDaysInMonth, format } from "date-fns";
import { useEffect, useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import BigCalendar from "./BigCalendar";
import BookingDate from "../../models/BookingDate";
import BookedDate from "../../models/BookedDate";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { BookingContext } from "context/BookingContextProvider";
import { DisabledDaysModel } from "models/DisabledDaysModel";
import { HotelContext } from "context/HotelContextProvider";

const CalendarComponent: React.FC<{
  isSelecting: boolean;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const weekDays: string[] = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];
  const months: string[] = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const currYear: number = currentDate.getFullYear();
  const [isMounted, setIsMounted] = useState(false);
  const [renderedCalendar, setRenderedCalendar] = useState<DateModel[][]>([]);
  const [calendarLoading, setCalendarLoading] = useState<
    "no loading" | "loading" | "change state" | "success"
  >("no loading");
  const [hotelChange, setHotelChange] = useState<boolean>(false);
  const [renderBookingDate, setRenderBookingDate] = useState<BookingDate>({});
  const [firstTouch, setFirstTouch] = useState<boolean>(false);
  const [firstTouchIndex, setFirstTouchIndex] = useState<number | null>(null);
  const [firstTouchMaxSelectable, setFirstTouchMaxSelectable] = useState<
    string[]
  >([]);
  const [selectedArrayIndex, setSelectedArrayIndex] = useState<number>(0);
  const [maxSelectableDate, setMaxSelectableDate] = useState<string[]>([]);
  const [allBlockedDate, setAllBlockedDate] = useState<string[]>([]);
  const [bookedDate, setBookedDate] = useState<BookedDate[]>([]);
  const [disabledDays, setDisabledDays] = useState<DisabledDaysModel[]>([]);
  const bookingCtx = useContext(BookingContext);
  const hotelCtx = useContext(HotelContext);

  // ! ASYNC FUNCTIONS

  useEffect(() => {
    const filterAcceptedDate = (item: DbDateModel) => {
      if (item.status === "Accepted" || item.status === "Pending") {
        return item;
      }
    };
    const fetchDate = async () => {
      let dbDate: BookedDate[] = [];
      const disabledDbDays: DisabledDaysModel[] = [];
      const url = process.env.REACT_APP_BACKEND_API as string;
      const response = await fetch(
        `${url}/booking?hotel=${hotelCtx?.hotelUUID}`
      );
      const disabledDaysResponse = await fetch(
        `${url}/disabled-days?hotel=${hotelCtx?.hotelUUID}`
      );
      if (!response.ok) {
        //TODO: Handle error
        console.log("hiba");
      } else {
        const data = await response.json();
        const disabledDaysData = await disabledDaysResponse.json();
        data.filter(filterAcceptedDate).map((item: DbDateModel) => {
          const updatedObject: BookedDate = {
            id: item._id,
            startDate: item.startDate,
            endDate: item.endDate,
            status: item.status,
          };
          dbDate.push(updatedObject);
          setBookedDate(dbDate);
        });
        disabledDaysData.map((item: DisabledDbDays) => {
          const updatedObject: DisabledDaysModel = {
            id: item._id,
            startDate: item.startDate,
            endDate: item.endDate,
          };
          disabledDbDays.push(updatedObject);
          setDisabledDays(disabledDbDays);
        });
        setHotelChange(false);
      }
    };
    const renderAllDays = () => {
      let monthCounter = 0;
      const updatedRenderCalendar: DateModel[][] = [];
      for (monthCounter; monthCounter <= 11; monthCounter++) {
        let updatedRenderDays: DateModel[] = [];
        const date = new Date(currYear, monthCounter, 1);
        const allDaysInMonth = getDaysInMonth(date);
        const lastDaysOfPreviousMonth = new Date(
          currYear,
          monthCounter,
          -1 + 1
        ).getDate();
        let firstDayOfMonth = new Date(currYear, monthCounter, 1).getDay();
        // ! fixed weekdays
        if (firstDayOfMonth === 0) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          firstDayOfMonth = 7;
        }
        // * prev Month
        for (
          let i = lastDaysOfPreviousMonth - firstDayOfMonth + 2;
          i <= lastDaysOfPreviousMonth;
          i++
        ) {
          updatedRenderDays = [
            ...updatedRenderDays,
            {
              id: uuid(),
              arrayIndex: monthCounter,
              value: "",
              prevMonth: true,
            },
          ];
        }
        // * current Month
        for (let i = 1; i <= allDaysInMonth; i++) {
          updatedRenderDays = [
            ...updatedRenderDays,
            {
              id: uuid(),
              arrayIndex: monthCounter,
              value: i,
              prevMonth: false,
              nextMonth: false,
              date: format(new Date(currYear, monthCounter, i), "yyyy-MM-dd"),
              today:
                format(new Date(), "yyyy-MM-dd") ===
                format(new Date(currYear, monthCounter, i), "yyyy-MM-dd")
                  ? true
                  : false,
              selected: false,
              disabled:
                new Date(currYear, monthCounter, i) < new Date() ? true : false,
              booked: false,
            },
          ];
        }
        updatedRenderCalendar.push(updatedRenderDays);
        setRenderedCalendar(updatedRenderCalendar);
        setCalendarLoading("success");
      }
    };
    fetchDate();
    setIsMounted(true);

    const interval = setInterval(() => {
      console.log("fetch");
      fetchDate();
    }, 60000);
    renderAllDays();

    return () => clearInterval(interval);
  }, [hotelCtx.hotelUUID]);

  useEffect(() => {
    const updateCalendarWithBookedDate = () => {
      if (renderedCalendar.length !== 0 && bookedDate.length !== 0) {
        const updatedRenderDays = [...renderedCalendar];

        const resetBookedDate = () => {
          for (let month = 0; month < updatedRenderDays.length; month++) {
            for (let day = 0; day < updatedRenderDays[month].length; day++) {
              updatedRenderDays[month][day].booked = false;
              updatedRenderDays[month][day].startBooked = false;
              updatedRenderDays[month][day].endBooked = false;
              updatedRenderDays[month][day].pendingBooking = false;
              updatedRenderDays[month][day].startPendingBooking = false;
              updatedRenderDays[month][day].endPendingBooking = false;
            }
          }
        };
        resetBookedDate();
        bookedDate.map((booked) => {
          for (let month in renderedCalendar) {
            const firstIndex = renderedCalendar[month].findIndex(
              (day) =>
                day.date ===
                  format(new Date(`${booked.startDate}`), "yyyy-MM-dd") &&
                booked.status !== "Pending"
            );
            const secondIndex = renderedCalendar[month].findIndex(
              (day) =>
                day.date ===
                  format(new Date(`${booked.endDate}`), "yyyy-MM-dd") &&
                booked.status !== "Pending"
            );

            if (firstIndex !== -1 && secondIndex !== -1) {
              for (let i = firstIndex; i <= secondIndex; i++) {
                if (firstIndex === i && booked.status !== "Pending") {
                  updatedRenderDays[month][i].startBooked = true;
                } else if (secondIndex === i) {
                  updatedRenderDays[month][i].endBooked = true;
                } else {
                  updatedRenderDays[month][i].booked = true;
                }
              }
            } else if (firstIndex !== -1 && secondIndex === -1) {
              for (
                let i = firstIndex;
                i < updatedRenderDays[month].length;
                i++
              ) {
                if (firstIndex === i && booked.status !== "Pending") {
                  updatedRenderDays[month][i].startBooked = true;
                } else if (secondIndex === i) {
                  updatedRenderDays[month][i].endBooked = true;
                } else {
                  updatedRenderDays[month][i].booked = true;
                }
              }
            } else if (firstIndex === -1 && secondIndex !== -1) {
              for (let i = 0; i <= secondIndex; i++) {
                if (firstIndex === i && booked.status !== "Pending") {
                  updatedRenderDays[month][i].startBooked = true;
                } else if (secondIndex === i) {
                  updatedRenderDays[month][i].endBooked = true;
                } else {
                  updatedRenderDays[month][i].booked = true;
                }
              }
            }
            updatedRenderDays[month].map((day) => {
              if ((day.startBooked && day.endBooked) === true) {
                day.startBooked = false;
                day.endBooked = false;
                day.booked = true;
              }
            });
          }
        });
        bookedDate.map((booked) => {
          for (let month in renderedCalendar) {
            const firstIndex = renderedCalendar[month].findIndex(
              (day) =>
                day.date ===
                  format(new Date(`${booked.startDate}`), "yyyy-MM-dd") &&
                booked.status === "Pending"
            );
            const secondIndex = renderedCalendar[month].findIndex(
              (day) =>
                day.date ===
                  format(new Date(`${booked.endDate}`), "yyyy-MM-dd") &&
                booked.status === "Pending"
            );

            if (firstIndex !== -1 && secondIndex !== -1) {
              for (let i = firstIndex; i <= secondIndex; i++) {
                if (firstIndex === i) {
                  updatedRenderDays[month][i].startPendingBooking = true;
                } else if (secondIndex === i) {
                  updatedRenderDays[month][i].endPendingBooking = true;
                } else {
                  updatedRenderDays[month][i].pendingBooking = true;
                }
              }
            } else if (firstIndex !== -1 && secondIndex === -1) {
              for (
                let i = firstIndex;
                i < updatedRenderDays[month].length;
                i++
              ) {
                if (firstIndex === i) {
                  updatedRenderDays[month][i].startPendingBooking = true;
                } else if (secondIndex === i) {
                  updatedRenderDays[month][i].endPendingBooking = true;
                } else {
                  updatedRenderDays[month][i].pendingBooking = true;
                }
              }
            } else if (firstIndex === -1 && secondIndex !== -1) {
              for (let i = 0; i <= secondIndex; i++) {
                if (firstIndex === i) {
                  updatedRenderDays[month][i].startPendingBooking = true;
                } else if (secondIndex === i) {
                  updatedRenderDays[month][i].endPendingBooking = true;
                } else {
                  updatedRenderDays[month][i].pendingBooking = true;
                }
              }
            }
            updatedRenderDays[month].map((day) => {
              if ((day.startPendingBooking && day.endPendingBooking) === true) {
                day.startPendingBooking = false;
                day.endPendingBooking = false;
                day.pendingBooking = true;
              }
              if (
                (day.startBooked === true && day.endPendingBooking === true) ||
                (day.endBooked === true && day.startPendingBooking === true)
              ) {
                day.bookedAndPendingBooked = true;
              }
            });
          }
        });

        setRenderedCalendar(updatedRenderDays);
      }
    };

    const updatedCalendarWithDisabledDays = () => {
      if (renderedCalendar.length !== 0 && disabledDays.length !== 0) {
        const updatedRenderDays = [...renderedCalendar];

        const resetDisabledDays = () => {
          for (let month = 0; month < updatedRenderDays.length; month++) {
            for (let day = 0; day < updatedRenderDays[month].length; day++) {
              updatedRenderDays[month][day].disabledDays = false;
            }
          }
        };
        resetDisabledDays();
        disabledDays.map((disabledDay) => {
          for (let month in renderedCalendar) {
            const firstIndex = renderedCalendar[month].findIndex(
              (day) =>
                day.date ===
                format(new Date(`${disabledDay.startDate}`), "yyyy-MM-dd")
            );
            const secondIndex = renderedCalendar[month].findIndex(
              (day) =>
                day.date ===
                format(new Date(`${disabledDay.endDate}`), "yyyy-MM-dd")
            );
            if (firstIndex !== -1 && secondIndex !== -1) {
              for (let i = firstIndex; i <= secondIndex; i++) {
                updatedRenderDays[month][i].disabledDays = true;
              }
            } else if (firstIndex !== -1 && secondIndex === -1) {
              for (
                let i = firstIndex;
                i < updatedRenderDays[month].length;
                i++
              ) {
                updatedRenderDays[month][i].disabledDays = true;
              }
            } else if (firstIndex === -1 && secondIndex !== -1) {
              for (let i = 0; i <= secondIndex; i++) {
                updatedRenderDays[month][i].disabledDays = true;
              }
            }
          }
        });
        setRenderedCalendar(updatedRenderDays);
      }
    };

    const timeout = setTimeout(() => {
      updateCalendarWithBookedDate();
      updatedCalendarWithDisabledDays();
    }, 300);

    return () => clearTimeout(timeout);
  }, [bookedDate]);

  useEffect(() => {
    setHotelChange(true);
  }, [hotelCtx.hotelUUID]);

  // ! HANDLERS

  const selectDateHandler = (e: React.MouseEvent<EventTarget>): void => {
    if (!(e.target instanceof HTMLHeadingElement)) {
      return;
    }

    const date = e.target.dataset.date as string;
    const index: number = Number(e.target.dataset.index) as number;
    const disabled = e.target.dataset.disabled;
    const booked = e.target.dataset.booked;
    const arrayIndex = Number(e.target.dataset.arrayindex) as number;
    const prevMonth = e.target.dataset.prevmonth as string;
    const nextMonth = e.target.dataset.nextmonth as string;
    const disabledDays = e.target.dataset.disabledDays as string;
    const bookedAndPendingBooked = e.target.dataset
      .bookedAndPendingBooked as string;
    const pendingBooking = e.target.dataset.pendingBooking as string;
    if (
      props.isSelecting ||
      disabled === "true" ||
      prevMonth === "true" ||
      booked === "true" ||
      nextMonth === "true" ||
      disabledDays === "true" ||
      bookedAndPendingBooked === "true" ||
      pendingBooking === "true"
    ) {
      return;
    }

    const resetDateSelect = () => {
      const updatedState = [...renderedCalendar];
      updatedState.map((calendar) => {
        calendar.map((day) => (day.selected = false));
        calendar.map((day) => (day.startSelected = false));
        calendar.map((day) => (day.endSelected = false));
      });
      setRenderBookingDate({});
      setRenderedCalendar(updatedState);
      setFirstTouchIndex(0);
      setSelectedArrayIndex(0);
      setFirstTouchMaxSelectable([]);
      setAllBlockedDate([]);
    };

    const getAllBlockedDate = () => {
      for (
        let aIndex = arrayIndex;
        aIndex <= renderedCalendar.length - 1;
        aIndex++
      ) {
        let i = 0;
        if (arrayIndex === aIndex) {
          i = index;
        }

        for (i; i <= renderedCalendar[aIndex].length - 1; i++) {
          const blockedDate = renderedCalendar[aIndex][i];
          if (
            blockedDate.startBooked === true ||
            blockedDate.startPendingBooking === true ||
            blockedDate.disabledDays === true
          ) {
            const date = blockedDate.date as string;
            setAllBlockedDate((prev) => {
              return [...prev, date];
            });
            return;
          }
        }
      }
    };

    if (!firstTouch) {
      resetDateSelect();
      getAllBlockedDate();
      setRenderBookingDate((prevState) => {
        return { ...prevState, firstDate: date };
      });
      const updateState = [...renderedCalendar];
      const selectedDate = updateState[arrayIndex][index];
      if (
        selectedDate.startBooked === true ||
        selectedDate.startPendingBooking === true
      ) {
        const lastSelectableDate = selectedDate.date;
        if (!lastSelectableDate) return;
        setFirstTouchMaxSelectable((prev) => {
          return [...prev, lastSelectableDate];
        });
      }
      if (selectedDate.startBooked === true) {
        selectedDate.endSelected = true;
      } else {
        selectedDate.startSelected = true;
      }
      setFirstTouch(true);
      setRenderedCalendar(updateState);
      setFirstTouchIndex(index);
      setSelectedArrayIndex(arrayIndex);
    }

    if (firstTouch) {
      if (new Date(date) > new Date(allBlockedDate[0])) {
        return;
      }
      if (date === renderBookingDate.firstDate) {
        setFirstTouch(false);
        resetDateSelect();
      } else {
        const startDate = renderBookingDate.firstDate as string;
        if (new Date(startDate) <= new Date(date)) {
          if (maxSelectableDate.length === 0) {
            props.setIsSelecting(true);
            setTimeout(() => {
              setRenderBookingDate((prevState) => {
                return { ...prevState, endDate: date };
              });
              if (renderBookingDate.firstDate) {
                bookingCtx.calcNightAmountHandler(
                  renderBookingDate.firstDate,
                  date
                );
                props.setIsSelecting(false);
                setFirstTouch(false);
              }
            }, 500);
          } else {
            if (new Date(date) <= new Date(maxSelectableDate[0])) {
              props.setIsSelecting(true);
              setTimeout(() => {
                setRenderBookingDate((prevState) => {
                  return { ...prevState, endDate: date };
                });
                if (renderBookingDate.firstDate) {
                  bookingCtx.calcNightAmountHandler(
                    renderBookingDate.firstDate,
                    date
                  );
                  props.setIsSelecting(false);
                  setFirstTouch(false);
                }
              }, 500);
            }
          }
        }
      }
    }
  };

  const selectStartDateToEndDate = (e: React.MouseEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const id = e.target.dataset.id as string;
    const index = Number(e.target.dataset.index) as number;
    const arrayIndex = Number(e.target.dataset.arrayindex) as number;
    const resetDateSelect = () => {
      const updatedState = [...renderedCalendar];
      updatedState.map((calendar) => {
        calendar.map((day) => (day.selected = false));
        calendar.map((day) => (day.endSelected = false));
      });
      setMaxSelectableDate([]);
      if (firstTouchMaxSelectable.length !== 0) {
        setMaxSelectableDate((prev) => {
          return [...prev, firstTouchMaxSelectable[0]];
        });
      }
    };
    if (firstTouch && firstTouchIndex !== null) {
      resetDateSelect();
      const updatedRenderDays = [...renderedCalendar[arrayIndex]];
      updatedRenderDays.map((day) => (day.selected = false));
      if (arrayIndex > selectedArrayIndex) {
        const updateState = [...renderedCalendar];
        for (
          let i = firstTouchIndex;
          i <= renderedCalendar[selectedArrayIndex].length;
          i++
        ) {
          if (
            renderedCalendar[selectedArrayIndex][i]?.startBooked === true ||
            renderedCalendar[selectedArrayIndex][i]?.startPendingBooking ===
              true ||
            renderedCalendar[selectedArrayIndex][i]?.disabledDays === true
          ) {
            const lastSelectableDate = renderedCalendar[selectedArrayIndex][i]
              .date as string;
            setMaxSelectableDate((prev) => [...prev, lastSelectableDate]);
          }
          if (
            renderedCalendar[selectedArrayIndex][i]?.booked === true ||
            renderedCalendar[selectedArrayIndex][i]?.pendingBooking === true ||
            renderedCalendar[selectedArrayIndex][i]?.disabledDays === true
          ) {
            return;
          } else {
            updateState[selectedArrayIndex].map((day, dayIndex) => {
              if (dayIndex === firstTouchIndex) {
                day.startSelected = true;
              } else if (dayIndex === i) {
                day.selected = true;
              }
            });
          }
        }
        setRenderedCalendar(updateState);
        for (let i = selectedArrayIndex + 1; i < arrayIndex; i++) {
          for (let x = 0; x < renderedCalendar[i].length; x++) {
            if (
              renderedCalendar[i][x]?.startBooked === true ||
              renderedCalendar[i][x]?.startPendingBooking === true ||
              renderedCalendar[i][x]?.disabledDays === true
            ) {
              const lastSelectableDate = renderedCalendar[selectedArrayIndex][i]
                .date as string;
              setMaxSelectableDate((prev) => [...prev, lastSelectableDate]);
            }
            if (
              renderedCalendar[i][x]?.booked === true ||
              renderedCalendar[i][x]?.startPendingBooking === true ||
              renderedCalendar[i][x]?.disabledDays === true
            ) {
              return;
            } else {
              updateState[i][x].selected = true;
              setRenderedCalendar(updateState);
            }
          }
        }
        const foundIndex = renderedCalendar[arrayIndex].findIndex(
          (day) => day.id === id
        );
        let bookedIndex: number[] = [];
        for (let i = 0; i <= renderedCalendar[arrayIndex].length; i++) {
          if (
            renderedCalendar[arrayIndex][i]?.booked === true ||
            renderedCalendar[arrayIndex][i]?.endBooked === true ||
            renderedCalendar[arrayIndex][i]?.disabledDays === true ||
            renderedCalendar[arrayIndex][i]?.pendingBooking === true ||
            renderedCalendar[arrayIndex][i]?.endPendingBooking === true
          ) {
            bookedIndex.push(i);
          }
          if (
            renderedCalendar[arrayIndex][i]?.startBooked === true ||
            renderedCalendar[arrayIndex][i]?.startPendingBooking === true ||
            renderedCalendar[arrayIndex][i]?.disabledDays === true
          ) {
            const lastSelectableDate = renderedCalendar[arrayIndex][i]
              .date as string;
            setMaxSelectableDate((prev) => [...prev, lastSelectableDate]);
          }
        }
        for (let i = 0; i <= foundIndex; i++) {
          if (i + 1 === bookedIndex[0]) {
            updateState[arrayIndex].map((day, index) => {
              if (index === i) {
                day.endSelected = true;
              }
            });
            return;
          } else {
            if (i === index) {
              updateState[arrayIndex][i].endSelected = true;
            } else {
              updateState[arrayIndex][i].selected = true;
            }
          }
          setRenderedCalendar(updateState);
        }
      }
      if (arrayIndex === selectedArrayIndex) {
        let bookedIndex: number[] = [];
        for (
          let i = firstTouchIndex + 1;
          i <= renderedCalendar[selectedArrayIndex].length;
          i++
        ) {
          if (
            renderedCalendar[selectedArrayIndex][i]?.booked === true ||
            renderedCalendar[selectedArrayIndex][i]?.endBooked === true ||
            renderedCalendar[selectedArrayIndex][i]?.disabledDays === true ||
            renderedCalendar[selectedArrayIndex][i]?.pendingBooking === true ||
            renderedCalendar[selectedArrayIndex][i]?.endPendingBooking ===
              true ||
            renderedCalendar[selectedArrayIndex][i]?.bookedAndPendingBooked ===
              true
          ) {
            bookedIndex.push(i);
          }
          if (
            renderedCalendar[selectedArrayIndex][i]?.startBooked === true ||
            renderedCalendar[selectedArrayIndex][i]?.startPendingBooking ===
              true ||
            renderedCalendar[selectedArrayIndex][i]?.disabledDays === true
          ) {
            const lastSelectableDate = renderedCalendar[selectedArrayIndex][i]
              .date as string;
            setMaxSelectableDate((prev) => {
              return [...prev, lastSelectableDate];
            });
          }
        }
        for (let i = firstTouchIndex; i <= index; i++) {
          if (i + 1 === bookedIndex[0]) {
            updatedRenderDays[i].endSelected = true;
            setRenderedCalendar((prevState) => {
              return [
                ...prevState.slice(0, arrayIndex),
                updatedRenderDays,
                ...prevState.slice(arrayIndex + 1),
              ];
            });
            return;
          } else {
            if (i === firstTouchIndex) {
              updatedRenderDays[i].selected = false;
            } else if (i === index) {
              updatedRenderDays[i].endSelected = true;
            } else {
              updatedRenderDays[i].selected = true;
            }
            setRenderedCalendar((prevState) => {
              return [
                ...prevState.slice(0, arrayIndex),
                updatedRenderDays,
                ...prevState.slice(arrayIndex + 1),
              ];
            });
          }
        }
      }
    }
    if (firstTouchIndex === null && !firstTouch) {
      return;
    }
  };
  // ! RENDER
  return (
    <div
      className={`${
        hotelChange || props.isSelecting
          ? "bg-black rounded-3xl pointer-events-none"
          : ""
      } relative`}
    >
      <div
        className={`bg-gradient-to-br ${
          hotelChange || props.isSelecting
            ? "opacity-80 pointer-events-none"
            : ""
        }  from-palette-4 to-[#B08968] py-8 px-4 rounded-3xl w-full h-[80vh] overflow-y-scroll scrollbar-thin tall:scrollbar-thin scrollbar-thumb-palette-4 scrollbar-thumb-rounded-3xl`}
      >
        {calendarLoading === "success" && (
          <BigCalendar
            weekDays={weekDays}
            renderCalendar={renderedCalendar}
            currentYear={currYear}
            months={months}
            onClick={selectDateHandler}
            onMouseEnter={selectStartDateToEndDate}
            blockedDate={renderBookingDate?.endDate}
          />
        )}
        {props.isSelecting && (
          <ScaleLoader
            loading
            color="#E6CCB2"
            className="absolute top-1/2 left-1/2"
          />
        )}
        {hotelChange && (
          <ClipLoader
            loading
            color="#E6CCB2"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
