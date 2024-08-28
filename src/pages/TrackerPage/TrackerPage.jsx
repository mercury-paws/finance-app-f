import WaterMainInfo from "../../components/TrackerPageComponents/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/TrackerPageComponents/WaterDetailedInfo/WaterDetailedInfo.jsx";
import css from "./TrackerPage.module.css";
import { useDispatch } from "react-redux";
import { calculateFormattedDate } from "../../constants/constants.js";
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import { refreshUser } from "../../redux/auth/operations.js";

function HomePage() {
  const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  let date = calculateFormattedDate();

  const [chosenDay, setChosenDay] = useState(date.day.replace(",", ""));
  const [currentMonth, setCurrentMonth] = useState(date.month);
  const [currentYear, setCurrentYear] = useState(date.year);
  const [currentDate, setCurrentDate] = useState("Today");
  return (
    <div className={css.startPage}>
      <WaterMainInfo
        chosenDay={chosenDay}
        setCurrentDate={setCurrentDate}
        setCurrentYear={setCurrentYear}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        currentDate={currentDate}
        setChosenDay={setChosenDay}
      />
      <WaterDetailedInfo
        chosenDay={chosenDay}
        setCurrentDate={setCurrentDate}
        setCurrentYear={setCurrentYear}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        currentDate={currentDate}
        setChosenDay={setChosenDay}
      />
    </div>
  );
}

export default HomePage;
