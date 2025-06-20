import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";
import Bar from "./Bar/Bar";

function WaterMainInfo({
  chosenDay,
  setCurrentDate,
  setCurrentYear,
  currentMonth,
  setCurrentMonth,
  currentYear,
  currentDate,
  setChosenDay,
}) {
  return (
    <div className={css.waterMainInfo}>
      <WaterDailyNorma />
      <WaterProgressBar />
      <Bar currentMonth={currentMonth} />
      
      {/* <AddWaterBtn
        chosenDay={chosenDay}
        currentMonth={currentMonth}
        currentYear={currentYear}
      /> */}
    </div>
  );
}

export default WaterMainInfo;
