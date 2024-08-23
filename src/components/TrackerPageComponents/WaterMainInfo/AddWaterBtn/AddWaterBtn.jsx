import css from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Add from "../../../Modals/Add/Add";

function AddWaterBtn({ chosenDay, currentMonth, currentYear }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddModalOpen = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={css.AddWaterBtn}>
      <button className={css.btn} onClick={handleAddModalOpen}>
        <FaPlus className={css.plusIcon} /> Add water
      </button>
      {modalOpen && (
        <Add
          isOpen={modalOpen}
          onRequestClose={closeModal}
          chosenDay={chosenDay}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      )}
    </div>
  );
}

export default AddWaterBtn;
