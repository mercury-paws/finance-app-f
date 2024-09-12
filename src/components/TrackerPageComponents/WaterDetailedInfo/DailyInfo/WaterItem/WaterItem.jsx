import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import css from "./WaterItem.module.css";
import Edit from "../../../../Modals/Edit/Edit.jsx";
import Delete from "../../../../Modals/Delete/Delete.jsx";
import { useSelector } from "react-redux";
import { selectDayWater } from "../../../../../redux/water/selectors.js";

function WaterItem({ ml, time, id, currentMonth, chosenDay, currentYear }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const foundWaterDayData = useSelector(selectDayWater);

  return (
    <div className={css.waterItem}>
      <svg className={css.cupIcon} width="32" height="36">
        <use href="../../../../../assets/symbol-defs.svg#cup"></use>
      </svg>
      <div className={css.mlTime}>
        <p className={css.ml}>{ml} ml</p>
        <p className={css.time}>{time}</p>
      </div>
      <div className={css.btnBlock}>
        <button className={css.btn} onClick={handleEditModalOpen}>
          <FaPen className={css.penIcon} />
        </button>
        {editModalOpen && (
          <Edit
            isOpen={editModalOpen}
            onRequestClose={handleEditModalClose}
            currentMonth={currentMonth}
            chosenDay={chosenDay}
            currentYear={currentYear}
            id={id}
            time={time}
            ml={ml}
          />
        )}
        <button className={css.btn} onClick={handleDeleteModalOpen}>
          <FaTrash className={css.trashIcon} />
        </button>
        {deleteModalOpen && (
          <Delete
            isOpen={deleteModalOpen}
            onRequestClose={handleDeleteModalClose}
            foundWaterDayData={foundWaterDayData}
            id={id}
          />
        )}
      </div>
    </div>
  );
}

export default WaterItem;
