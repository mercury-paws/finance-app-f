import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";
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
      <AddWaterBtn
        chosenDay={chosenDay}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
    </div>
  );
}

export default WaterMainInfo;
