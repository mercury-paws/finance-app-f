import Calendar from "./Calendar/Calendar";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./MonthInfo.module.css";
import { useState } from "react";

function MonthInfo({
  chosenDate,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
}) {

  const [chart, setChart] = useState(true);

  return (
    <>
      <div className={css.monthAndPagination}>
        <p className={css.month}>Month</p>
        <CalendarPagination
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          setChart={setChart}
          chart={chart}
        />
      </div>

      <Calendar
        currentMonth={currentMonth}
        currentYear={currentYear}
        chosenDate={chosenDate}
        chart={chart}
      />
      {/* )} */}
    </>
  );
}

export default MonthInfo;
