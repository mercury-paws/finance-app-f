import { useSelector } from "react-redux";
import { selectDayWater } from "../../../../redux/water/selectors";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./WaterProgressBar.module.css";

function WaterProgressBar() {
  let dayWater = useSelector(selectDayWater);
  const user = useSelector(selectUser);

  // Math.round((item.ml * 100) / (user.waterVolume * 1000)

  let progress = dayWater
    .map((day) => day.ml)
    .reduce((total, num) => total + Number(num), 0);

  let progressBar = Math.round(
    (Number(progress) * 100) / (Number(user.waterVolume) * 1000)
  );

  if (progressBar > 100) {
    progressBar = 100;
  }

  return (
    <div className={css.progressBar}>
      <p className={css.today}>Today</p>
      <div className={css.progressBarContainer}>
        <div
          className={css.progressBarLine}
          style={{ width: `${progressBar}%` }}
        ></div>
      </div>
      <p className={css.progressNumbers}>
        <span>0%</span> <span>50%</span> <span>100%</span>
      </p>
    </div>
  );
}

export default WaterProgressBar;
