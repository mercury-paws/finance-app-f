import Calendar from "./Calendar/Calendar";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./MonthInfo.module.css";
import { useState } from "react";

function MonthInfo() {
  // const date = chooseBiggerDate(day, month)
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  return (
    <>
      <div className={css.monthAndPagination}>
        <p>Month</p>
        <CalendarPagination
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
        />
      </div>

      <Calendar
        currentMonth={currentMonth}
        currentYear={currentYear}
        // chosenDate={chosenDate}
      />
    </>
  );
}

export default MonthInfo;
