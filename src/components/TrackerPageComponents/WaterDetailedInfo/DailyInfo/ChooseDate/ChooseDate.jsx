import { useEffect, useState } from "react";
import { calculateFormattedDate } from "../../../../../constants/constants";
import { useDispatch } from "react-redux";
import { fetchWaterDay } from "../../../../../redux/water/operations";

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
  // let dispatch = useDispatch();

  const goToToday = () => {
    // let date = calculateFormattedDate();
    setCurrentDate("Today");
    setChosenDay(date.day);
    setCurrentMonth(date.month);
    setCurrentYear(date.year);

    // dispatch(
    //   fetchWaterDay({ day: date.day, month: date.month, year: date.year })
    // );
  };

  useEffect(() => {
    const parsedDate = new Date(
      `${date.month} ${date.day.replace(",", "")}, ${date.year}`
    );
    const dateToCompare = new Date();

    if (chosenDay) {
      setCurrentDate(`${chosenDay}, ${currentMonth}`);
    } else if (
      !chosenDay &&
      parsedDate.toDateString() === dateToCompare.toDateString()
    ) {
      setCurrentDate("Today");
    } else {
      setCurrentDate(`${date.day}, ${date.month}`);
    }
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
      <p onClick={goToToday}>{currentDate}</p>
    </>
  );
}

export default ChooseDate;
