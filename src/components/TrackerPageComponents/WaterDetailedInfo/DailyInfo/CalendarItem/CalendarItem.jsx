import { useDispatch } from "react-redux";

import { fetchWaterDay } from "../../../../../redux/water/operations";

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

  if (waterAmount > 100) {
    waterAmount = 100;
  }

  const currentDay = {
    day,
    month: currentMonthYear.month,
    year: currentMonthYear.year,
    ml: waterAmount,
  };

  const chooseDate = () => {
    chosenDate(day);
    dispatch(fetchWaterDay(currentDay));
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
      <p className={css.waterAmount}>{waterAmount} czk</p>
    </div>
  );
}

export default CalendarItem;
