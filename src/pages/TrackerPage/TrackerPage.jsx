import WaterMainInfo from "../../components/TrackerPageComponents/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/TrackerPageComponents/WaterDetailedInfo/WaterDetailedInfo.jsx";
import css from "./TrackerPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { calculateFormattedDate } from "../../constants/constants.js";
import { useState, useEffect } from "react";
import { selectUser } from "../../redux/auth/selectors.js";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../components/Logo/Logo.jsx";
import { useRef } from "react";

function HomePage() {
  let date = calculateFormattedDate();

  const [chosenDay, setChosenDay] = useState(date.day.replace(",", ""));
  const [currentMonth, setCurrentMonth] = useState(date.month);
  const [currentYear, setCurrentYear] = useState(date.year);
  const [currentDate, setCurrentDate] = useState("Today");
  const user = useSelector(selectUser);

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (user && !hasShownToast.current) {
      toast.success("User data updated!");
      hasShownToast.current = true;
    }
  }, [user]);

  return (
    <>
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
        <Toaster />
      </div>
    </>
  );
}

export default HomePage;
