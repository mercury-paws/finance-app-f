import CalendarItem from "../../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";

const getMaxDaysInMonth = (month, year) => {
  const monthDays = {
    January: 31,
    February:
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };
  return monthDays[month];
};

let days = [];

for (let i = 1; i <= getMaxDaysInMonth("February", 2025); i++) {
  days.push(i);
}

function Calendar() {
  return (
    <>
      {/* <p>Calendar list of monthcalendar days</p> */}
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
