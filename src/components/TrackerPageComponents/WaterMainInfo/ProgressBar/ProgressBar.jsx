import { useSelector } from "react-redux";
import { selectSpent } from "../../../../redux/spent/selectors";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./ProgressBar.module.css";
import { useState } from "react";
import List from "../../../Modals/List/List";

function ProgressBar({ note, currentMonth }) {
  const [listModalOpen, setListModalOpen] = useState(false);

  const foundWaterData = useSelector(selectSpent);
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
