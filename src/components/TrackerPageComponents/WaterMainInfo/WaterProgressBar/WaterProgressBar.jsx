import { useSelector } from "react-redux";
import { selectWater } from "../../../../redux/water/selectors";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./WaterProgressBar.module.css";

function WaterProgressBar() {
  // let dayWater = useSelector(selectDayWater);
  const foundWaterData = useSelector(selectWater);
  const user = useSelector(selectUser);

  let progress = foundWaterData
    .map((day) => day.spent)
    .reduce((total, num) => total + Number(num), 0);


  let progressBar = Math.round(
    (Number(progress) / (Number(user.planToSpend))) * 100
  );
  let difference = user.planToSpend-progress;

  return (
    <div className={css.progressBar}>
      <p className={css.today}>Total</p>
      <div className={css.progressBarContainer}>
        <div
          className={css.progressBarLine}
          style={ difference >= 0 ?
            { width: `${progressBar}%` } : { width: "100%", backgroundColor:"#ff0000" }
          }
        ></div>
      </div>
      <p className={css.progressNumbers}>
        <span>0%</span> <span>50%</span> <span>100%</span>
      </p>
    </div>
  );
}

export default WaterProgressBar;
