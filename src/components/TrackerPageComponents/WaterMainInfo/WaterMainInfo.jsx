import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";
import Bar from "./Bar/Bar";
import { useEffect } from "react";
import { fetchInMonth } from "../../../redux/income/operations";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInMonth({ month: currentMonth, year: currentYear }));
  }, [currentMonth, currentYear, dispatch]);

  return (
    <div className={css.waterMainInfo}>
      <WaterDailyNorma currentMonth={currentMonth} currentYear={currentYear} />
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
