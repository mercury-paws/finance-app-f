import DailyInfo from "./DailyInfo/DailyInfo.jsx";
import MonthInfo from "./DailyInfo/MonthInfo/MonthInfo.jsx";
import UserPanel from "./UserPanel/UserPanel.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSpentDay } from "../../../redux/spent/operations.js";
import css from "./WaterDetailedInfo.module.css";
import Settings from "./Settings/Settings.jsx";
import Quotes from "./Quotes/Quotes.jsx";

function WaterDetailedInfo({
  chosenDay,
  setCurrentDate,
  setCurrentYear,
  currentMonth,
  setCurrentMonth,
  currentYear,
  currentDate,
  setChosenDay,
}) {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchSpentDay({ day: chosenDay, month: currentMonth, year: currentYear })
    );
  }, [chosenDay, currentMonth, currentYear, dispatch]);

  let chosenDate = (day) => {
    setChosenDay(day);
  };

  return (
    <div className={css.waterDeateiledInfo}>
      <UserPanel />
      <DailyInfo
        chosenDay={chosenDay}
        setChosenDay={setChosenDay}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        chosenDate={chosenDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <Settings />
      <Quotes />
      <MonthInfo
        chosenDate={chosenDate}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        chosenDay={chosenDay}
        setCurrentYear={setCurrentYear}
      />
    </div>
  );
}

export default WaterDetailedInfo;
