import { useSelector } from "react-redux";
import { selectWater } from "../../../../redux/water/selectors";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./ProgressBar.module.css";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import List from "../../../Modals/List/List";
// import { fetchWaterMonth } from "../../../../redux/water/operations";

function ProgressBar({ note, currentMonth }) {
  const [listModalOpen, setListModalOpen] = useState(false);

  const foundWaterData = useSelector(selectWater);
  const user = useSelector(selectUser);

  const totalSpent = foundWaterData
    .filter((day) => day.note === note)
    .reduce((sum, day) => sum + Number(day.spent), 0);

  const spentPerNote = foundWaterData.filter((day) => day.note === note);

  const handleListModalOpen = () => {
    setListModalOpen(true);
  };

  const handleListModalClose = () => {
    setListModalOpen(false);
  };

  const noteValues = user.note[note];

  // const planToSpend = Number(user.planToSpend) || 0;
  // const progressNum = Number(totalSpent) || 0;

  // let progressBar =
  //   planToSpend === 0 ? 0 : Math.round((progressNum / planToSpend) * 100);

  let progressBar = Math.round((Number(totalSpent) / Number(noteValues)) * 100);

  let difference = noteValues - totalSpent;

  return (
    <div className={css.progressBar}>
      <div className={css.today} onClick={handleListModalOpen}>
        <p>
          {note}: {totalSpent}
        </p>
        <p>
          {difference >= 0 ? "left: " : "over: "}
          {difference}
        </p>
      </div>

      <div
        className={css.progressBarContainerNum}
        onClick={handleListModalOpen}
      >
        <div className={css.progressBarContainer}>
          <div
            className={css.progressBarLine}
            style={
              difference >= 0
                ? { width: `${progressBar}%` }
                : { width: "100%", backgroundColor: "#ff0000" }
            }
          ></div>
        </div>
        <p className={css.progressNumbers}>
          <span>0%</span> <span>50%</span> <span>{noteValues}</span>
        </p>
      </div>

      {listModalOpen && (
        <List
          isOpen={listModalOpen}
          onRequestClose={handleListModalClose}
          spent={spentPerNote}
          note={note}
          currentMonth={currentMonth}
          totalSpent={totalSpent}
        />
      )}
    </div>
  );
}

export default ProgressBar;
