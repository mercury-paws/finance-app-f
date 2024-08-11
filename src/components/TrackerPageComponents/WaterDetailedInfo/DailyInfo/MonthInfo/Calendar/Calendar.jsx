import CalendarItem from "../../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";
import { getMaxDaysInMonth } from "../../../../../../constants/constants.js";
import { calculateFormattedDate } from "../../../../../../constants/constants.js";
import { useState, useEffect } from "react";

function Calendar() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    let date = calculateFormattedDate();
    let daysInMonth = Array.from(
      { length: getMaxDaysInMonth(`${date.month}`, `${date.year}`) },
      (_, i) => i + 1
    );

    setDays(daysInMonth);
  }, [setDays]);

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
