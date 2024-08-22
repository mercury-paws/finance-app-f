import DailyInfo from "./DailyInfo/DailyInfo.jsx";
import MonthInfo from "./DailyInfo/MonthInfo/MonthInfo.jsx";
import UserPanel from "./UserPanel/UserPanel.jsx";
import { useState } from "react";

function WaterDetailedInfo() {
  const [chosenDay, setChosenDay] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  let chosenDate = (day) => {
    setChosenDay(day);
  };

  return (
    <div>
      <UserPanel />
      <DailyInfo
        chosenDay={chosenDay}
        setChosenDay={setChosenDay}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        chosenDate={chosenDate}
      />
      <MonthInfo
        chosenDate={chosenDate}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
      />
    </div>
  );
}

export default WaterDetailedInfo;
