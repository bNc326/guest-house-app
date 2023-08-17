import { json, useOutletContext } from "react-router-dom";
import DateModel, { Day } from "../../models/DateModel";
import Calendar from "models/Calendar";
import { DbDateModel, DisabledDbDays } from "../../models/DbDateModel";
import { getDaysInMonth, format } from "date-fns";
import {
  useEffect,
  useState,
  useContext,
  useLayoutEffect,
  useCallback,
} from "react";
import { v4 as uuid } from "uuid";
import BigCalendar from "./BigCalendar";
import BookingDate from "../../models/BookingDate";
import BookedDate from "../../models/BookedDate";
import { ClipLoader, ScaleLoader } from "react-spinners";
import { BookingContext } from "context/BookingContextProvider";
import { DisabledDaysModel } from "models/DisabledDaysModel";
import { HotelContext } from "context/HotelContextProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import UnavailableDates from "models/UnavailableDates";
import { Outlet } from "models/OutletModel";
import { ALERT_ACTION_TYPE, ALERT_TYPE } from "models/AlertModels";

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
  const currentDate = new Date();
  const currYear: number = currentDate.getFullYear();
  const [renderedMonth, setRenderedMonth] = useState<number>(12);
  const [renderedCalendar, setRenderedCalendar] = useState<DateModel[][]>([]);
  const [calendarLoading, setCalendarLoading] = useState<boolean>(true);
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
  const [hasMore, setHasMore] = useState(true);
  const calendar = new Calendar(
    renderedMonth,
    renderedCalendar,
    setRenderedCalendar
  );
  const outletCtx = useOutletContext() as Outlet;

  // ! ASYNC FUNCTIONS

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      const url = process.env.REACT_APP_BACKEND_API as string;

      const response = await fetch(
        `${url}/hotels/${hotelCtx.hotelId}?filter=booked,disabled`
      );

      if (!response.ok) {
        console.log("error");
        return json({
          status: 404,
          message: "Nem sikerült az adata lekérése!",
        });
      } else {
        const data: UnavailableDates = await response.json();
        if (data.bookedDates) {
          setBookedDate(data.bookedDates);
        }
        if (data.disabledDays) {
          setDisabledDays(data.disabledDays);
        }
      }
    };
    const cleanup = setTimeout(() => {
      fetchUnavailableDates();
    }, 100);
    return () => clearTimeout(cleanup);
  }, [hotelCtx.hotelId, renderedMonth]);

  useLayoutEffect(() => {
    const renderAllDays = () => {
      calendar.resetCalendar();
      setRenderedMonth(12);
      calendar.createInitialCalendar();
    };

    const cleanup = setTimeout(() => {
      renderAllDays();
      setCalendarLoading(false);
      setHotelChange(false);
    }, 100);

    return () => clearTimeout(cleanup);
  }, [hotelCtx.hotelId]);

  useLayoutEffect(() => {
    const updateCalendarWithBookedDate = () => {
      calendar.getBookedDate(bookedDate);
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
    });

    return () => clearTimeout(timeout);
  }, [bookedDate]);

  useLayoutEffect(() => {
    setHotelChange(true);
    setRenderedMonth(12);
  }, [hotelCtx.hotelId]);

  useLayoutEffect(() => {
    if (bookedDate.length !== 0) {
      calendar.getBookedDate(bookedDate);
    }
    if (renderedMonth >= 36) {
      setHasMore(false);
    }
  }, [renderedMonth]);

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
    const disabledDay = e.target.dataset.disabledDays as string;
    const bookedAndPendingBooked = e.target.dataset
      .bookedAndPendingBooked as string;
    const pendingBooking = e.target.dataset.pendingBooking as string;
    if (
      props.isSelecting ||
      disabled === "true" ||
      prevMonth === "true" ||
      booked === "true" ||
      nextMonth === "true" ||
      disabledDay === "true" ||
      bookedAndPendingBooked === "true" ||
      pendingBooking === "true"
    ) {
      outletCtx.alertDispatch({
        type: ALERT_ACTION_TYPE.SHOW,
        payload: {
          alertType: ALERT_TYPE.FAILURE,
          message: "Ezt a napot nem lehet lefoglalni!",
        },
      });
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
      const unavailableDates = [...bookedDate, ...disabledDays];
      unavailableDates
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )
        .map((unavailable) => {
          const parseSelectedDate = new Date(
            format(Date.parse(date), "yyyy-MM-dd")
          );
          const parseDate = new Date(
            format(Date.parse(unavailable.startDate as string), "yyyy-MM-dd")
          );
          if (parseSelectedDate <= parseDate) {
            setAllBlockedDate((prev) => [
              ...prev,
              format(parseDate, "yyyy-MM-dd"),
            ]);
          }
        });
    };

    if (!firstTouch) {
      if (
        !renderBookingDate.firstDate &&
        (renderedCalendar[arrayIndex][index].startBooked ||
          renderedCalendar[arrayIndex][index].startPendingBooking ||
          renderedCalendar[arrayIndex][index + 1].disabledDays)
      ) {
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.FAILURE,
            message: "Minimum 2 napot le kell foglalni!",
          },
        });
        resetDateSelect();
        return;
      }

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
      setFirstTouchIndex(index);
      setSelectedArrayIndex(arrayIndex);
      setRenderedCalendar(updateState);
    }

    if (firstTouch) {
      if (renderBookingDate.firstDate === date) {
        setFirstTouch(false);
        resetDateSelect();
        return;
      }
      if (new Date(date) > new Date(allBlockedDate[0])) {
        outletCtx.alertDispatch({
          type: ALERT_ACTION_TYPE.SHOW,
          payload: {
            alertType: ALERT_TYPE.FAILURE,
            message: "Ezt a napot nem lehet lefoglalni!",
          },
        });
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

    const index = Number(e.target.dataset.index) as number;
    const arrayIndex = Number(e.target.dataset.arrayindex) as number;
    const currentDay = index;
    const currentMonth = arrayIndex;
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
      const blockedDates = {
        firstTouch: [] as number[],
        middle: {
          day: [] as number[],
          month: [] as number[],
        },
        current: [] as number[],
      };
      resetDateSelect();
      const updatedRenderDays = [...renderedCalendar[arrayIndex]];
      updatedRenderDays.map((day) => (day.selected = false));

      if (arrayIndex > selectedArrayIndex) {
        (() => {
          const findIndex: number[] = [];

          renderedCalendar[selectedArrayIndex].map((day, dayIndex, arr) => {
            if (dayIndex >= firstTouchIndex) {
              allBlockedDate.map((blocked) => {
                if (blocked === day.date) {
                  findIndex.push(dayIndex);
                  blockedDates.firstTouch.push(dayIndex);
                }
              });
              if (dayIndex <= (findIndex[0] || arr.length - 1)) {
                setRenderedCalendar((prev) => {
                  const update = [...prev];
                  if (dayIndex === firstTouchIndex) {
                    update[selectedArrayIndex][dayIndex].startSelected = true;
                  } else if (
                    dayIndex === findIndex[0] &&
                    findIndex[0] !== arr.length - 1
                  ) {
                    update[selectedArrayIndex][dayIndex].endSelected = true;
                  } else {
                    update[selectedArrayIndex][dayIndex].selected = true;
                  }
                  return update;
                });
              }
            }
          });
        })();

        if (!blockedDates.firstTouch.length) {
          (() => {
            let findIndex: number[] = [];
            renderedCalendar.map((month, monthIndex) => {
              if (
                monthIndex > selectedArrayIndex &&
                monthIndex < currentMonth
              ) {
                month.map((day, dayIndex, arr) => {
                  allBlockedDate.map((blocked) => {
                    if (blocked === day.date) {
                      findIndex.push(dayIndex);
                      blockedDates.middle.day.push(dayIndex);
                      blockedDates.middle.month.push(monthIndex);
                    }
                  });
                  if (
                    dayIndex <= (findIndex[0] || arr.length) &&
                    monthIndex <= (blockedDates.middle.month[0] || monthIndex)
                  ) {
                    setRenderedCalendar((prev) => {
                      const update = [...prev];
                      if (
                        monthIndex === blockedDates.middle.month[0] &&
                        dayIndex === findIndex[0] &&
                        dayIndex !== arr.length - 1
                      ) {
                        update[monthIndex][dayIndex].endSelected = true;
                      } else {
                        update[monthIndex][dayIndex].selected = true;
                      }
                      return update;
                    });
                  }
                });
              }
            });
          })();

          if (
            !blockedDates.middle.day.length &&
            !blockedDates.middle.month.length
          ) {
            (() => {
              const findIndex: number[] = [];
              renderedCalendar[currentMonth].map((day, dayIndex, arr) => {
                if (dayIndex <= currentDay) {
                  allBlockedDate.map((blocked) => {
                    if (blocked === day.date) {
                      findIndex.push(dayIndex);
                    }
                  });
                  if (dayIndex <= (findIndex[0] || arr.length - 1)) {
                    setRenderedCalendar((prev) => {
                      const update = [...prev];
                      if (
                        dayIndex === currentDay ||
                        dayIndex === (findIndex[0] || arr.length - 1)
                      ) {
                        update[currentMonth][dayIndex].endSelected = true;
                      } else {
                        update[currentMonth][dayIndex].selected = true;
                      }
                      return update;
                    });
                  }
                }
              });
            })();
          }
        }
      }

      if (arrayIndex === selectedArrayIndex) {
        const findIndex: number[] = [];

        renderedCalendar[selectedArrayIndex].map((day, dayIndex, arr) => {
          if (dayIndex >= firstTouchIndex && dayIndex <= currentDay) {
            allBlockedDate.map((blocked) => {
              if (blocked === day.date) {
                findIndex.push(dayIndex);
              }
            });

            if (dayIndex <= (findIndex[0] || arr.length - 1)) {
              setRenderedCalendar((prev) => {
                const update = [...prev];
                if (dayIndex === firstTouchIndex) {
                  update[selectedArrayIndex][dayIndex].startSelected = true;
                } else if (
                  dayIndex === currentDay ||
                  dayIndex === (findIndex[0] || arr.length - 1)
                ) {
                  update[selectedArrayIndex][dayIndex].endSelected = true;
                } else {
                  update[selectedArrayIndex][dayIndex].selected = true;
                }
                return update;
              });
            }
          }
        });
      }
    }
    if (firstTouchIndex === null && !firstTouch) {
      return;
    }
  };

  const handleLoadMonth = () => {
    setTimeout(() => {
      calendar.renderNewMonth(3, setRenderedMonth);
    }, 1500);
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
        id="calendar-scroll"
        className={`bg-gradient-to-br ${
          hotelChange || props.isSelecting
            ? "opacity-80 pointer-events-none"
            : ""
        }  from-palette-4 to-[#B08968] py-8 px-4 rounded-3xl w-full h-[80vh] overflow-auto scrollbar-thin tall:scrollbar-thin scrollbar-thumb-palette-4 scrollbar-thumb-rounded-3xl`}
      >
        <InfiniteScroll
          dataLength={renderedCalendar.length}
          next={handleLoadMonth}
          hasMore={hasMore}
          loader={
            <span className="w-full flex items-center justify-center py-2">
              <ClipLoader size={20} color="#DDB892" loading />
            </span>
          }
          scrollableTarget={"calendar-scroll"}
          style={{ overflow: "hidden" }}
        >
          {!calendarLoading && (
            <BigCalendar
              weekDays={weekDays}
              renderCalendar={renderedCalendar}
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
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default CalendarComponent;
