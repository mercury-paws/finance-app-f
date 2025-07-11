import { useEffect, useState, useMemo } from "react";
import { calculateFormattedDate } from "../../../../../constants/constants";
import { useDispatch } from "react-redux";
import { fetchSpentDay } from "../../../../../redux/spent/operations";
import css from "./ChooseDate.module.css";
function ChooseDate({
  chosenDay,
  setChosenDay,
  currentMonth,
  setCurrentMonth,
  setCurrentYear,
  currentYear,
  currentDate,
  setCurrentDate,
}) {
  let date = calculateFormattedDate();
  const [isToday, setIsToday] = useState(false);

  const goToToday = () => {
    setChosenDay(date.day);
    setCurrentMonth(date.month);
    setCurrentYear(date.year);
    setIsToday(true);
  };

  const parsedDate = useMemo(() => {
    return new Date(`${date.month} ${date.day.replace(",", "")}, ${date.year}`);
  }, [date.month, date.day, date.year]);

  const dateToCompare = useMemo(() => {
    return new Date();
  }, []);

  useEffect(() => {
    if (chosenDay) {
      setCurrentDate(`${chosenDay}, ${currentMonth}`);
    } else {
      setCurrentDate(`${date.day}, ${date.month}`);
    }
    setIsToday(false);
  }, [
    chosenDay,
    currentMonth,
    date.month,
    date.day,
    date.year,
    setCurrentDate,
  ]);

  return (
    <>
      <p onClick={goToToday} className={css.date}>
        {currentDate}
      </p>
    </>
  );
}

export default ChooseDate;
