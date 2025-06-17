import { useSelector } from "react-redux";
import { selectWater } from "../../../../redux/water/selectors";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./ProgressBar.module.css";

function ProgressBar({ note }) {

  const foundWaterData = useSelector(selectWater);
  const user = useSelector(selectUser);

    const totalSpent = foundWaterData
      .filter((day) => day.note === note)
      .reduce((sum, day) => sum + Number(day.spent), 0);
  
  let progressBar = Math.round(
    (Number(totalSpent) / (Number(user.planToSpend))) * 100
  );


  return (

      <div className={css.progressBar}>
      <p className={css.today}>{note}: { totalSpent}</p>
      <div className={css.progressBarContainer}>
        <div
          className={css.progressBarLine}
          style={{ width: `${progressBar}%` }}
        ></div>
      </div>
      {/* <p className={css.progressNumbers}>
        <span>0%</span> <span>50%</span> <span>100%</span>
      </p> */}
    </div>
    
  );
}

export default ProgressBar;
