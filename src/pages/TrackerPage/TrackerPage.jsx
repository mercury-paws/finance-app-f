import WaterMainInfo from "../../components/TrackerPageComponents/WaterMainInfo/WaterMainInfo.jsx";
import WaterDetailedInfo from "../../components/TrackerPageComponents/WaterDetailedInfo/WaterDetailedInfo.jsx";
import css from "./TrackerPage.module.css";
function HomePage() {
  return (
    <div className={css.startPage}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
}

export default HomePage;
