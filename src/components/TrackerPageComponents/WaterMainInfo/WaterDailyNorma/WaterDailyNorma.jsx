import css from "./WaterDailyNorma.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";

function WaterDailyNorma() {
  const user = useSelector(selectUser);

  return (
    <div className={css.dailyNorma}>
      <p className={css.waterVolume}>
        {user.waterVolume ? user.waterVolume : "1.5"} L
      </p>
      <p className={css.myDN}>My Daily Norma</p>
    </div>
  );
}

export default WaterDailyNorma;
