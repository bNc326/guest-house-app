import React from "react";
import DateModel, { Day } from "./DateModel";
import Month from "./Month";
import { getDaysInMonth } from "date-fns";
import { v4 as uuid } from "uuid";

class Calendar {
  calendar: DateModel[][];
  private renderedMonth: number;
  private currYear = new Date().getFullYear();

  constructor(renderedMonth: number) {
    this.calendar = [];
    this.renderedMonth = renderedMonth;
    this.createInitialCalendar();
  }

  private createInitialCalendar() {
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
  }

  private getPreviousDaysOfMonth(month: number) {
    return new Date(this.currYear, month, -1 + 1).getDate();
  }
  private geFirstDayOfMonth(month: number) {
    return new Date(this.currYear, month, 1).getDay();
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
  //! FIX CALENDAR 
  renderNewMonth(
    renderCount: number,
    setCalendar: React.Dispatch<React.SetStateAction<DateModel[][]>>
  ) {
    for (
      let monthCounter = this.renderedMonth;
      monthCounter <= this.renderedMonth - 1 + renderCount;
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
      this.calendar.push(month);
      setCalendar((prev) => [...prev, month]);
    }
    this.renderedMonth += renderCount;
  }
}

export default Calendar;
