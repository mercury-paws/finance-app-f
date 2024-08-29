import css from "./WaterDailyNorma.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";

function WaterDailyNorma() {
  const user = useSelector(selectUser);

  return (
    <div className={css.dailyNorma}>
      <p>
        {user.waterVolume
          ? user.waterVolume
          : "The average daily norma for a person is 1.5"}{" "}
        L
      </p>
      <p>My Daily Norma</p>
    </div>
  );
}

export default WaterDailyNorma;
