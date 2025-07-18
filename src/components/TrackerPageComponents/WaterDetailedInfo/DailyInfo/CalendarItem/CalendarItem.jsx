import { useDispatch } from "react-redux";

import { fetchSpentDay } from "../../../../../redux/spent/operations";

import css from "./CalendarItem.module.css";
import clsx from "clsx";
import { getMonthIndex } from "../../../../../constants/constants";

function CalendarItem({ day, chosenDate, waterAmount, currentMonthYear }) {
  const dispatch = useDispatch();

  const today = new Date();
  const dayNumber = today.getDate();
  const monthNumber = today.getMonth() + 1;
  const yearNumber = today.getFullYear();
  const monthNumberCalc = getMonthIndex(currentMonthYear.month) + 1;

  const currentDay = {
    day,
    month: currentMonthYear.month,
    year: currentMonthYear.year,
    ml: waterAmount,
  };

  const chooseDate = () => {
    chosenDate(day);
    dispatch(fetchSpentDay(currentDay));
  };

  const getClassName = (amount) => {
    if (
      Number(day) === Number(dayNumber) &&
      Number(monthNumber) === Number(monthNumberCalc) &&
      Number(yearNumber) === Number(currentMonthYear.year)
    ) {
      if (amount < 100) return css.todayLowWater;
      return css.todayHighWater;
    }
    if (amount < 100) return css.lowWater;

    return css.highWater;
  };

  return (
    <div onClick={chooseDate} className={css.dayInfo}>
      <p className={clsx(css.day, getClassName(waterAmount))}>{day}</p>
      <p className={css.waterAmount}>{waterAmount}</p>
    </div>
  );
}

export default CalendarItem;
