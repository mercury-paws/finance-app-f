import css from "./WaterDailyNorma.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";
import { selectWater } from "../../../../redux/water/selectors";

function WaterDailyNorma() {

  const foundWaterData = useSelector(selectWater);
  const user = useSelector(selectUser);

  let progress = foundWaterData
    .map((day) => day.spent)
    .reduce((total, num) => total + Number(num), 0);

  let plan = user.planToSpend;
  let difference = plan - progress;
  
  return (
    <div className={css.norm}>
      <div className={css.dailyNorma}>
      <p className={css.waterVolume}>
        {plan ? plan : "1000"} CZK
      </p>
      <p className={css.myDN}> / Month</p>
      
    </div>
    <div className={css.dailyNorma}>
    <p className={css.waterVolume}>
      {progress ? progress : "-"} CZK
    </p>
    <p className={css.myDN}> spent</p>
    
      </div>
    <div className={css.dailyNorma}>
    <p className={css.waterVolume}>
      {difference ? difference : "-"} CZK
    </p>
    <p className={css.myDN}> left</p>
    
      </div>
    </div>
    
  );
}

export default WaterDailyNorma;

