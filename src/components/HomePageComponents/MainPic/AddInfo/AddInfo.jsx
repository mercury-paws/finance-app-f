import css from "./AddInfo.module.css";
function AddInfo() {
  return (
    <div className={css.addInfo}>
      <div className={css.dotDriveContainer}>
        <div className={css.dot}></div>
        <p className={css.drive}>Habit drive</p>
      </div>
      <button className={css.statistics}>View statistics</button>
      <p className={css.rating}>Personal rate settings</p>
    </div>
  );
}

export default AddInfo;
