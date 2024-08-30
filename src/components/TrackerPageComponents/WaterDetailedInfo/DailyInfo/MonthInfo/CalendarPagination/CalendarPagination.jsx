import css from "./CalendarPagination.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import {
  calculateFormattedDate,
  getMonthNameByIndex,
} from "../../../../../../constants/constants";
import { useEffect } from "react";
import { getMonthIndex } from "../../../../../../constants/constants";

function CalendarPagination({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}) {
  const chooseLesserDate = () => {
    let monthIndex = getMonthIndex(currentMonth);
    let year = parseInt(currentYear, 10);
    if (monthIndex <= 0) {
      monthIndex = 11;
      year -= 1;
    } else {
      monthIndex--;
    }
    setCurrentMonth(getMonthNameByIndex(monthIndex));
    setCurrentYear(year);
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

    setCurrentMonth(getMonthNameByIndex(monthIndex));
    setCurrentYear(year);
  };

  useEffect(() => {
    let date = calculateFormattedDate();
    setCurrentMonth(`${date.month}`);
    setCurrentYear(`${date.year}`);
  }, [setCurrentMonth, setCurrentYear]);

  return (
    <div className={css.pagination}>
      <button onClick={chooseLesserDate} className={css.left}>
        {" "}
        <FaAngleLeft style={{ width: "14px", height: "20px" }} />
      </button>
      <p className={css.month}>
        {currentMonth} {currentYear}
      </p>
      <button onClick={chooseBiggerDate} className={css.right}>
        <FaAngleRight style={{ width: "14px", height: "20px" }} />
      </button>
    </div>
  );
}

export default CalendarPagination;
