import DailyInfo from "./DailyInfo/DailyInfo.jsx";
import MonthInfo from "./DailyInfo/MonthInfo/MonthInfo.jsx";
import UserPanel from "./UserPanel/UserPanel.jsx";
import { useState } from "react";

function WaterDetailedInfo() {
  // const [chosenDay, setChosenDay] = useState("today");

  // let chosenDate = (day) => {
  //   console.log(day);
  // };

  return (
    <div>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}

export default WaterDetailedInfo;
