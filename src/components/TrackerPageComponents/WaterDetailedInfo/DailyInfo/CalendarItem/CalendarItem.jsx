import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWater } from "../../../../../redux/water/selectors";
import { fetchWaterDay } from "../../../../../redux/water/operations";
import { useMemo } from "react";
import css from "./CalendarItem.module.css";
import clsx from "clsx";

function CalendarItem({ day, chosenDate, waterAmount, currentMonthYear }) {
  const dispatch = useDispatch();

  // const today = new Date(); // Create a new Date object for the current date and time
  // const dayNumber = today.getDate();

  const currentDay = {
    day,
    month: currentMonthYear.month,
    year: currentMonthYear.year,
    ml: waterAmount,
  };

  // need to amend so that upon loading the fetch water showed the todays day water
  const chooseDate = () => {
    chosenDate(day);
    dispatch(fetchWaterDay(currentDay));
  };

  const getClassName = (amount) => {
    if (amount < 100) return css.lowWater;
    return css.highWater;
  };

  return (
    <div onClick={chooseDate} className={css.dayInfo}>
      <p className={clsx(css.day, getClassName(waterAmount))}>{day}</p>
      <p className={css.waterAmount}>{waterAmount} %</p>
    </div>
  );
}

export default CalendarItem;
