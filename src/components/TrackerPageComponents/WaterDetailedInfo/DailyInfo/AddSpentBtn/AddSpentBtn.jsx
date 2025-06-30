import css from "./AddSpentBtn.module.css";
import { FaPlus } from "react-icons/fa";
import Add from "../../../../Modals/Add/Add.jsx";
import { useState } from "react";

function AddSpentBtn({ chosenDay, currentMonth, currentYear }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddModalOpen = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={css.addSpentBtn}>
      <button className={css.btn} onClick={handleAddModalOpen}>
        <FaPlus className={css.plusIcon} /> Add
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

export default AddSpentBtn;
