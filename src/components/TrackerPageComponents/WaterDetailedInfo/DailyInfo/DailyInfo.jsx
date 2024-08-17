import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import ChooseDate from "./ChooseDate/ChooseDate";
import WaterList from "./WaterList/WaterList";
import css from "./DailyInfo.module.css";
import { useState } from "react";

function DailyInfo({ chosenDay, setChosenDay, currentMonth, setCurrentMonth }) {
  return (
    <>
      <div className={css.dateAndBtn}>
        <ChooseDate
          chosenDay={chosenDay}
          setChosenDay={setChosenDay}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <AddWaterBtn />
      </div>

      <WaterList />
    </>
  );
}

export default DailyInfo;
