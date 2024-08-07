import DailyInfo from "./DailyInfo/DailyInfo.jsx";
import MonthInfo from "./DailyInfo/MonthInfo/MonthInfo.jsx";
import UserPanel from "./UserPanel/UserPanel.jsx";

function WaterDetailedInfo() {
  return (
    <div>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}

export default WaterDetailedInfo;
