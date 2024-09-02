import css from "./AddInfo.module.css";
import { Link } from "react-router-dom";
function AddInfo() {
  return (
    <div className={css.addInfo}>
      <div className={css.dotDriveContainer}>
        <div className={css.dot}></div>
        <p className={css.drive}>Habit drive</p>
      </div>
      <Link to="/signin" className={css.statistics}>
        View statistics
      </Link>
      <p className={css.rating}>Personal rate settings</p>
    </div>
  );
}

export default AddInfo;
