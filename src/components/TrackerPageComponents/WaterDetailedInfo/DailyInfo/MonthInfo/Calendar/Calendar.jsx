import CalendarItem from "../../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";
import days from "../../../../../../constants/constants.js";

function Calendar() {
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
