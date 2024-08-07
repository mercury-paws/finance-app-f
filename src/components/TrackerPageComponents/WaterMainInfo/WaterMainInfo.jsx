import AddWaterBtn from "./AddWaterBtn/AddWaterBtn";
import WaterDailyNorma from "./WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "./WaterProgressBar/WaterProgressBar";

function WaterMainInfo() {
  return (
    <div>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
}

export default WaterMainInfo;
