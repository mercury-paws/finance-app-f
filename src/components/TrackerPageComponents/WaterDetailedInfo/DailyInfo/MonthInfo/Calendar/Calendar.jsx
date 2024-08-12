import CalendarItem from "../../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";
import {
  getMaxDaysInMonth,
  getMonthIndex,
} from "../../../../../../constants/constants.js";
import { calculateFormattedDate } from "../../../../../../constants/constants.js";
import { useState, useEffect } from "react";

function Calendar({ currentMonth, currentYear }) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    let date = calculateFormattedDate(getMonthIndex(currentMonth), currentYear);
    let daysInMonth = Array.from(
      { length: getMaxDaysInMonth(`${date.month}`, `${date.year}`) },
      (_, i) => i + 1
    );

    setDays(daysInMonth);
  }, [currentMonth, currentYear]);

  return (
    <>
      <ul className={css.yearList}>
        {days.map((day) => {
          return (
            <li key={day}>
              <CalendarItem day={day} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Calendar;
