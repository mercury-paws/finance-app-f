import WaterMainInfo from "../../components/TrackerPageComponents/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/TrackerPageComponents/WaterDetailedInfo/WaterDetailedInfo.jsx";
import css from "./TrackerPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { calculateFormattedDate } from "../../constants/constants.js";
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectUser } from "../../redux/auth/selectors.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import Logo from "../../components/Logo/Logo.jsx";
function HomePage() {
  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  let date = calculateFormattedDate();

  const [chosenDay, setChosenDay] = useState(date.day.replace(",", ""));
  const [currentMonth, setCurrentMonth] = useState(date.month);
  const [currentYear, setCurrentYear] = useState(date.year);
  const [currentDate, setCurrentDate] = useState("Today");
  return (
    <>
      {/* {isRefreshing ? (
        <b>Refreshing user, please wait</b>
      ) : ( */}
      <div className={css.startPage}>
        <div className={css.logo}>
          <Logo />
        </div>
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
      {/* )} */}
    </>
  );
}

export default HomePage;
