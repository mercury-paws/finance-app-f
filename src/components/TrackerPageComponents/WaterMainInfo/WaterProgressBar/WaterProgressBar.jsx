import { useSelector } from "react-redux";
import { selectSpent } from "../../../../redux/spent/selectors";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./WaterProgressBar.module.css";

function WaterProgressBar() {
  // let dayWater = useSelector(selectDayWater);
  const foundWaterData = useSelector(selectSpent);
  const user = useSelector(selectUser);

  let progress = foundWaterData
    .map((day) => day.spent)
    .reduce((total, num) => total + Number(num), 0);

  const planToSpend = Number(user.planToSpend) || 0;
  const progressNum = Number(progress) || 0;

  let progressBar =
    planToSpend === 0 ? 0 : Math.round((progressNum / planToSpend) * 100);

  let difference = planToSpend - progressNum;

  return (
    <div className={css.progressBar}>
      <p className={css.today}>Total</p>
      <div className={css.progressBarContainer}>
        <div
          className={css.progressBarLine}
          style={
            difference >= 0
              ? { width: `${progressBar}%` }
              : { width: "100%", backgroundColor: "#ff0000" }
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
