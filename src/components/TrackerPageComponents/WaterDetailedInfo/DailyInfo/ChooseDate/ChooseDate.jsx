import { useEffect, useState } from "react";
import { calculateFormattedDate } from "../../../../../constants/constants";

function ChooseDate({
  chosenDay,
  setChosenDay,
  currentMonth,
  setCurrentMonth,
  setCurrentYear,
  currentYear,
}) {
  const [currentDate, setCurrentDate] = useState("");

  let date = calculateFormattedDate();

  const goToToday = () => {
    // let date = calculateFormattedDate();
    setCurrentDate("Today");
    setChosenDay("");
    setCurrentMonth(date.month);
    setCurrentYear(date.year);
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
  }, [chosenDay, currentMonth, date.month, date.day, date.year]);

  return (
    <>
      <p onClick={goToToday}>{currentDate}</p>
    </>
  );
}

export default ChooseDate;
