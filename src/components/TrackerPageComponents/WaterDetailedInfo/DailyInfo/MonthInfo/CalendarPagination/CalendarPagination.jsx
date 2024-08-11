import css from "./CalendarPagination.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { calculateFormattedDate } from "../../../../../../constants/constants";
import { useState, useEffect } from "react";
import { getMonthIndex } from "../../../../../../constants/constants";

function CalendarPagination() {
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  const chooseLesserDate = () => {
    let monthIndex = getMonthIndex(currentMonth);
    let year = parseInt(currentYear, 10);
    if (monthIndex <= 0) {
      monthIndex = 11;
      year -= 1;
    } else {
      monthIndex--;
    }
    const date = calculateFormattedDate(monthIndex, year);
    setCurrentMonth(date.month);
    setCurrentYear(date.year);
  };

  const chooseBiggerDate = () => {
    let monthIndex = getMonthIndex(currentMonth);
    let year = parseInt(currentYear, 10);
    if (monthIndex >= 11) {
      monthIndex = 0;
      year += 1;
    } else {
      monthIndex++;
    }
    const date = calculateFormattedDate(monthIndex, year);

    setCurrentMonth(date.month);
    setCurrentYear(date.year);
    return {
      date: date.month,
      year: date.year,
    };
  };

  useEffect(() => {
    let date = calculateFormattedDate();
    setCurrentMonth(`${date.month}`);
    setCurrentYear(`${date.year}`);
  }, []);

  return (
    <div className={css.pagination}>
      <button onClick={chooseLesserDate}>
        <FaAngleLeft />
      </button>
      <p>
        {currentMonth} {currentYear}
      </p>
      <button onClick={chooseBiggerDate}>
        <FaAngleRight />
      </button>
    </div>
  );
}

export default CalendarPagination;
