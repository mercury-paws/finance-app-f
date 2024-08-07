import css from "./WaterProgressBar.module.css";
function WaterProgressBar() {
  return (
    <div className={css.progressBar}>
      <p>ProgressBar today</p>
      <p>0% 50% 100%</p>
    </div>
  );
}

export default WaterProgressBar;
