import { useEffect, useState } from "react";
import { calculateFormattedDate } from "../../../../../constants/constants";
import { DateSchema } from "yup";

function ChooseDate({
  chosenDay,
  setChosenDay,
  currentMonth,
  setCurrentMonth,
}) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    let date = calculateFormattedDate();
    const parsedDate = new Date(
      `${date.month} ${date.day.replace(",", "")}, ${date.year}`
    );
    const dateToCompare = new Date();

    if (chosenDay) {
      setCurrentDate(`${chosenDay}, ${currentMonth}`);
    } else if (parsedDate.toDateString() === dateToCompare.toDateString()) {
      setCurrentDate("Today");
    } else {
      setCurrentDate(`${date.day}, ${date.month}`);
    }
  }, [chosenDay]);

  const goToToday = () => {
    let date = calculateFormattedDate();
    setCurrentDate("Today");
    setCurrentMonth(date.month);
  };

  return (
    <>
      <p onClick={goToToday}>{currentDate}</p>
    </>
  );
}

export default ChooseDate;
