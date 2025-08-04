import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";
import css from "./WaterMainInfo.module.css";
import Bar from "./Bar/Bar";
import { useEffect, useRef } from "react";
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

  const lastFetched = useRef({ month: null, year: null });

  useEffect(() => {
    if (
      lastFetched.current.month === currentMonth &&
      lastFetched.current.year === currentYear
    ) {
      return;
    }

    dispatch(fetchInMonth({ month: currentMonth, year: currentYear }))
      .unwrap()
      .then((result) => {
        // console.log("fetch result");
      })
      .catch((error) => {
        console.error("fetch error:");
      });
  }, [currentMonth, currentYear, dispatch]);

  return (
    <div className={css.waterMainInfo}>
      <WaterDailyNorma currentMonth={currentMonth} currentYear={currentYear} />
      <WaterProgressBar />
      <Bar currentMonth={currentMonth} />
    </div>
  );
}

export default WaterMainInfo;
