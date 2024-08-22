import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import ChooseDate from "./ChooseDate/ChooseDate";
import WaterList from "./WaterList/WaterList";
import css from "./DailyInfo.module.css";
import { useState } from "react";

function DailyInfo({
  chosenDay,
  setChosenDay,
  currentMonth,
  setCurrentMonth,
  currentYear,
  setCurrentYear,
  chosenDate,
}) {
  const [currentDate, setCurrentDate] = useState("");
  return (
    <>
      <div className={css.dateAndBtn}>
        <ChooseDate
          chosenDay={chosenDay}
          setChosenDay={setChosenDay}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <AddWaterBtn />
      </div>

      <WaterList
        chosenDay={chosenDay}
        currentMonth={currentMonth}
        currentYear={currentYear}
        chosenDate={chosenDate}
        currentDate={currentDate}
      />
    </>
  );
}

export default DailyInfo;
