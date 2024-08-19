import CalendarItem from "../../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";
import {
  getMaxDaysInMonth,
  getMonthIndex,
} from "../../../../../../constants/constants.js";
import { calculateFormattedDate } from "../../../../../../constants/constants.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchWaterMonth } from "../../../../../../redux/water/operations.js";
import { useSelector } from "react-redux";
import { selectWater } from "../../../../../../redux/water/selectors.js";
import { useMemo } from "react";

function Calendar({ currentMonth, currentYear, chosenDate }) {
  const [days, setDays] = useState([]);
  const dispatch = useDispatch();
  const foundWaterData = useSelector(selectWater);

  useEffect(() => {
    let date = calculateFormattedDate(getMonthIndex(currentMonth), currentYear);
    let daysInMonth = Array.from(
      { length: getMaxDaysInMonth(`${date.month}`, `${date.year}`) },
      (_, i) => i + 1
    );

    setDays(daysInMonth);
  }, [currentMonth, currentYear]);

  const currentMonthYear = useMemo(
    () => ({
      month: currentMonth,
      year: currentYear,
    }),
    [currentMonth, currentYear]
  );

  useEffect(() => {
    dispatch(fetchWaterMonth(currentMonthYear));
  }, [currentMonthYear]);

  const waterDataByDay = useMemo(() => {
    const waterData = foundWaterData || [];
    const waterMap = {};
    waterData.forEach((item) => {
      waterMap[item.day] = item.ml;
    });
    return waterMap;
  }, [foundWaterData]);

  return (
    <>
      <ul className={css.yearList}>
        {days.map((day) => {
          const waterAmount = waterDataByDay[day] || 0;
          return (
            <li key={day}>
              <CalendarItem
                day={day}
                chosenDate={chosenDate}
                waterAmount={waterAmount}
                currentMonthYear={currentMonthYear}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Calendar;
