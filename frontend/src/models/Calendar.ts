import DateModel, { Day } from "./DateModel";
import Month from "./Month";
import { getDaysInMonth } from "date-fns";
import { v4 as uuid } from "uuid";
import BookedDate from "./BookedDate";
import { format } from "date-fns";
import { TbRuler } from "react-icons/tb";

class Calendar {
  private calendar: DateModel[][];
  private setCalendar: React.Dispatch<React.SetStateAction<DateModel[][]>>;
  private renderedMonth: number;
  private currYear = new Date().getFullYear();

  constructor(
    renderedMonth: number,
    renderedCalendar: DateModel[][],
    setCalendar: React.Dispatch<React.SetStateAction<DateModel[][]>>
  ) {
    this.calendar = renderedCalendar;
    this.renderedMonth = renderedMonth;
    this.setCalendar = setCalendar;
  }

  createInitialCalendar() {
    for (
      let monthCounter = 0;
      monthCounter <= this.renderedMonth - 1;
      monthCounter++
    ) {
      const {
        lastDaysOfPreviousMonth,
        firstDayOfMonth,
        allDaysInMonth,
        month,
      } = this.getMonthData(monthCounter);

      for (
        let i = lastDaysOfPreviousMonth - firstDayOfMonth + 2;
        i <= lastDaysOfPreviousMonth;
        i++
      ) {
        month.push({
          id: uuid(),
          arrayIndex: monthCounter,
          value: "",
          prevMonth: true,
        });
      }

      for (let i = 1; i <= allDaysInMonth; i++) {
        month.push(
          new Day(i, monthCounter, new Date(this.currYear, monthCounter, i))
        );
      }
      this.calendar?.push(month);
    }
    this.setCalendar(() => [...this.calendar]);
  }

  private getPreviousDaysOfMonth(month: number) {
    return new Date(this.currYear, month, -1 + 1).getDate();
  }

  private geFirstDayOfMonth(month: number) {
    const firstDay = new Date(this.currYear, month, 1).getDay();
    if (firstDay === 0) {
      return 7;
    }
    return firstDay;
  }

  private getMonthData(monthCounter: number) {
    const month: DateModel[] = [];
    const date = new Date(this.currYear, monthCounter, 1);
    const allDaysInMonth = getDaysInMonth(date);
    const lastDaysOfPreviousMonth = this.getPreviousDaysOfMonth(monthCounter);
    let firstDayOfMonth = this.geFirstDayOfMonth(monthCounter);

    return {
      month,
      date,
      allDaysInMonth,
      lastDaysOfPreviousMonth,
      firstDayOfMonth,
    };
  }

  private getBookedIndexes(
    bookedDate: BookedDate,
    index: number,
    status: "Accepted" | "Pending"
  ) {
    const firstIndex = this.calendar[index].findIndex(
      (day) =>
        day.date ===
          format(new Date(`${bookedDate.startDate}`), "yyyy-MM-dd") &&
        bookedDate.status === status
    );
    const secondIndex = this.calendar[index].findIndex(
      (day) =>
        day.date === format(new Date(`${bookedDate.endDate}`), "yyyy-MM-dd") &&
        bookedDate.status === status
    );

    return {
      firstIndex,
      secondIndex,
    };
  }

  private setBookedDates(
    firstIndex: number,
    secondIndex: number,
    month: number,
    status: "Accepted" | "Pending",
    options?: { hide: boolean }
  ) {
    let setItemTo: boolean;

    if (options && options.hide) {
      setItemTo = false;
    } else {
      setItemTo = true;
    }
    if (status === "Accepted") {
      if (firstIndex !== -1 && secondIndex !== -1) {
        for (let i = firstIndex; i <= secondIndex; i++) {
          if (firstIndex === i) {
            this.calendar[month][i].startBooked = setItemTo;
          } else if (secondIndex === i) {
            this.calendar[month][i].endBooked = setItemTo;
          } else {
            this.calendar[month][i].booked = setItemTo;
          }
        }
      } else if (firstIndex !== -1 && secondIndex === -1) {
        for (let i = firstIndex; i < this.calendar[month].length; i++) {
          if (firstIndex === i) {
            this.calendar[month][i].startBooked = setItemTo;
          } else if (secondIndex === i) {
            this.calendar[month][i].endBooked = setItemTo;
          } else {
            this.calendar[month][i].booked = setItemTo;
          }
        }
      } else if (firstIndex === -1 && secondIndex !== -1) {
        for (let i = 0; i <= secondIndex; i++) {
          if (firstIndex === i) {
            this.calendar[month][i].startBooked = setItemTo;
          } else if (secondIndex === i) {
            this.calendar[month][i].endBooked = setItemTo;
          } else {
            this.calendar[month][i].booked = setItemTo;
          }
        }
      }
      return;
    }
    if (status === "Pending") {
      if (firstIndex !== -1 && secondIndex !== -1) {
        for (let i = firstIndex; i <= secondIndex; i++) {
          if (firstIndex === i) {
            this.calendar[month][i].startPendingBooking = setItemTo;
          } else if (secondIndex === i) {
            this.calendar[month][i].endPendingBooking = setItemTo;
          } else {
            this.calendar[month][i].pendingBooking = setItemTo;
          }
        }
      } else if (firstIndex !== -1 && secondIndex === -1) {
        for (let i = firstIndex; i < this.calendar[month].length; i++) {
          if (firstIndex === i) {
            this.calendar[month][i].startPendingBooking = setItemTo;
          } else if (secondIndex === i) {
            this.calendar[month][i].endPendingBooking = setItemTo;
          } else {
            this.calendar[month][i].pendingBooking = setItemTo;
          }
        }
      } else if (firstIndex === -1 && secondIndex !== -1) {
        for (let i = 0; i <= secondIndex; i++) {
          if (firstIndex === i) {
            this.calendar[month][i].startPendingBooking = setItemTo;
          } else if (secondIndex === i) {
            this.calendar[month][i].endPendingBooking = setItemTo;
          } else {
            this.calendar[month][i].pendingBooking = setItemTo;
          }
        }
      }
    }
  }

  private resetBookedDates() {
    this.calendar.map((month) => {
      month.map((day) => {
        day.booked = false;
        day.startBooked = false;
        day.endBooked = false;
        day.pendingBooking = false;
        day.startPendingBooking = false;
        day.endPendingBooking = false;
        day.bookedAndPendingBooked = false;
      });
    });
  }

  private fixDatesCrossing(day: DateModel) {
    if ((day.startBooked && day.endBooked) === true) {
      day.startBooked = false;
      day.endBooked = false;
      day.booked = true;
    }
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
  }

  getBookedDate(bookedDates: Array<BookedDate>) {
    this.resetBookedDates();
    bookedDates.map((booked) => {
      this.calendar.map((month, index) => {
        (() => {
          const { firstIndex, secondIndex } = this.getBookedIndexes(
            booked,
            index,
            "Accepted"
          );
          this.setBookedDates(firstIndex, secondIndex, index, "Accepted");
        })();

        (() => {
          const { firstIndex, secondIndex } = this.getBookedIndexes(
            booked,
            index,
            "Pending"
          );
          this.setBookedDates(firstIndex, secondIndex, index, "Pending", {
            hide: false,
          });
        })();

        month.map((day) => this.fixDatesCrossing(day));
      });
    });

    this.setCalendar(() => [...this.calendar]);
  }

  renderNewBookedDate(booked: BookedDate) {
    this.calendar.map((month, index) => {
      (() => {
        const { firstIndex, secondIndex } = this.getBookedIndexes(
          booked,
          index,
          "Accepted"
        );
        this.setBookedDates(firstIndex, secondIndex, index, "Accepted");
      })();

      (() => {
        const { firstIndex, secondIndex } = this.getBookedIndexes(
          booked,
          index,
          "Pending"
        );
        this.setBookedDates(firstIndex, secondIndex, index, "Pending");
      })();

      month.map((day) => this.fixDatesCrossing(day));
    });
    this.setCalendar([...this.calendar]);
  }

  deleteBookedDate(booked: BookedDate) {
    this.calendar.map((month, index) => {
      (() => {
        const { firstIndex, secondIndex } = this.getBookedIndexes(
          booked,
          index,
          "Accepted"
        );
        this.setBookedDates(firstIndex, secondIndex, index, "Accepted", {
          hide: true,
        });
      })();

      (() => {
        const { firstIndex, secondIndex } = this.getBookedIndexes(
          booked,
          index,
          "Pending"
        );
        this.setBookedDates(firstIndex, secondIndex, index, "Pending", {
          hide: true,
        });
      })();

      month.map((day) => this.fixDatesCrossing(day));
    });
    this.setCalendar([...this.calendar]);
  }
  // TODO set status function
  renderNewMonth(
    renderCount: number,
    setRenderedMonth: React.Dispatch<React.SetStateAction<number>>
  ) {
    console.log("calendar", this.calendar);
    const maxMonth = this.renderedMonth + renderCount - 1;

    for (
      let monthCounter = this.renderedMonth;
      monthCounter <= maxMonth;
      monthCounter++
    ) {
      setRenderedMonth((prev) => prev + 1);
      const {
        lastDaysOfPreviousMonth,
        firstDayOfMonth,
        allDaysInMonth,
        month,
      } = this.getMonthData(monthCounter);
      for (
        let i = lastDaysOfPreviousMonth - firstDayOfMonth + 2;
        i <= lastDaysOfPreviousMonth;
        i++
      ) {
        month.push({
          id: uuid(),
          arrayIndex: monthCounter,
          value: "",
          prevMonth: true,
        });
      }
      for (let i = 1; i <= allDaysInMonth; i++) {
        month.push(
          new Day(i, monthCounter, new Date(this.currYear, monthCounter, i))
        );
      }
      this.setCalendar((prev) => [...prev, month]);
    }
  }
}

export default Calendar;
