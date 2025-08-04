import css from "./WaterDailyNorma.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";
import { selectSpent } from "../../../../redux/spent/selectors";
import Income from "../../../Modals/In/Income";
import { useState } from "react";
import { selectIn } from "../../../../redux/income/selectors";

function WaterDailyNorma({ currentMonth, currentYear }) {
  const [modalOpen, setModalOpen] = useState(false);
  const foundWaterData = useSelector(selectSpent);

  const foundInData = useSelector(selectIn);
  console.log(foundInData);
  const user = useSelector(selectUser);

  let income =
    foundInData?.reduce((total, item) => total + Number(item.income), 0) ?? 0;

  // let income = Number(foundInData?.[0]?.income ?? 0);
  // let note = foundInData?.[0]?.note;
  // let id = foundInData?.[0]?._id;

  let progress = foundWaterData
    .map((day) => day.spent)
    .reduce((total, num) => total + Number(num), 0);

  let plan = user.planToSpend;
  let difference = plan - progress;

  let saved = income - progress;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={css.norm}>
      <div className={css.dailyNorma}>
        <p className={css.waterVolume}>{plan ? plan : 0} CZK</p>
        <p className={css.myDN}> month</p>
      </div>
      <div className={css.dailyNorma}>
        <p className={css.waterVolume}>{progress ? progress : 0} CZK</p>
        <p className={css.myDN}> spent</p>
      </div>
      <div className={css.dailyNorma}>
        <p className={css.waterVolume}>{difference ? difference : 0} CZK</p>
        <p className={css.myDN}> left</p>
      </div>
      <div className={css.dailyNorma} onClick={handleModalOpen}>
        <p className={css.waterVolume}>{saved ? saved : 0} CZK</p>
        <p className={css.myDN}> saved</p>
      </div>

      {modalOpen && (
        <Income
          isOpen={modalOpen}
          onRequestClose={handleModalClose}
          currentMonth={currentMonth}
          currentYear={currentYear}
          incomes={foundInData}
        />
      )}
    </div>
  );
}

export default WaterDailyNorma;
