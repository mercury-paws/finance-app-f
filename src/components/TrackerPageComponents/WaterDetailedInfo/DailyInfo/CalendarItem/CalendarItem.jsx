import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWater } from "../../../../../redux/water/selectors";
import { fetchWaterDay } from "../../../../../redux/water/operations";
import { useMemo } from "react";

function CalendarItem({ day, chosenDate, waterAmount, currentMonthYear }) {
  const dispatch = useDispatch();

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

  return (
    <div onClick={chooseDate}>
      <p>{day}</p>
      <p>{waterAmount} ml</p>
    </div>
  );
}

export default CalendarItem;
