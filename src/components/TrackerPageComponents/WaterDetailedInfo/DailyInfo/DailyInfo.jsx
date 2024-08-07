import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import ChooseDate from "./ChooseDate/ChooseDate";
import WaterList from "./WaterList/WaterList";
import css from "./DailyInfo.module.css";
function DailyInfo() {
  return (
    <>
      <div className={css.dateAndBtn}>
        <ChooseDate />
        <AddWaterBtn />
      </div>

      <WaterList />
    </>
  );
}

export default DailyInfo;
