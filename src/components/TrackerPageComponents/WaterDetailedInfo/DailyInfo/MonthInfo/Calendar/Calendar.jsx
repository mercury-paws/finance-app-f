import CalendarItem from "../../CalendarItem/CalendarItem.jsx";
import css from "./Calendar.module.css";
import {
  getMaxDaysInMonth,
  getMonthIndex,
} from "../../../../../../constants/constants.js";
import { calculateFormattedDate } from "../../../../../../constants/constants.js";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSpentMonth } from "../../../../../../redux/spent/operations.js";
import { useSelector } from "react-redux";
import { selectSpent } from "../../../../../../redux/spent/selectors.js";
import { useMemo } from "react";
import { selectUser } from "../../../../../../redux/auth/selectors.js";
import Chart from "../Chart/Chart.jsx";

function Calendar({ currentMonth, currentYear, chosenDate, chart }) {
  const [days, setDays] = useState([]);
  const dispatch = useDispatch();
  const foundWaterData = useSelector(selectSpent);
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
    dispatch(fetchSpentMonth(currentMonthYear));
  }, [dispatch, currentMonthYear]);

  const waterDataByDay = useMemo(() => {
    const waterData = foundWaterData || [];
    const waterMap = {};

    waterData.forEach((item) => {
      if (waterMap[item.day]) {
        waterMap[item.day] = Number(waterMap[item.day]) + Number(item.spent);
      } else {
        waterMap[item.day] = Number(item.spent);
      }
    });

    return waterMap;
  }, [foundWaterData, user.planToSpend]);

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
