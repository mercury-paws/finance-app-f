import CalendarItem from "../../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";
import {
  getMaxDaysInMonth,
  getMonthIndex,
} from "../../../../../../constants/constants.js";
import { calculateFormattedDate } from "../../../../../../constants/constants.js";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWaterMonth } from "../../../../../../redux/water/operations.js";
import { useSelector } from "react-redux";
import { selectWater } from "../../../../../../redux/water/selectors.js";
import { useMemo } from "react";
import { selectUser } from "../../../../../../redux/auth/selectors.js";
import Chart from "../Chart/Chart.jsx";

function Calendar({ currentMonth, currentYear, chosenDate, chart }) {
  const [days, setDays] = useState([]);
  const dispatch = useDispatch();
  const foundWaterData = useSelector(selectWater);
  const user = useSelector(selectUser);

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
  }, [dispatch, currentMonthYear]);

  const waterDataByDay = useMemo(() => {
    const waterData = foundWaterData || [];
    const waterMap = {};

    waterData.forEach((item) => {
      if (waterMap[item.day]) {
        waterMap[item.day] = Number(waterMap[item.day]) + Number(item.ml);
      } else {
        waterMap[item.day] = Number(item.ml);
      }
    });

    Object.keys(waterMap).forEach((day) => {
      waterMap[day] = String(
        Math.round((waterMap[day] * 100) / (user.waterVolume * 1000))
      );
    });
    return waterMap;
  }, [foundWaterData, user.waterVolume]);

  return (
    <>
      {chart ? (
        <Chart
          days={days}
          chosenDate={chosenDate}
          currentMonthYear={currentMonthYear}
        />
      ) : (
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
      )}
    </>
  );
}

export default Calendar;
