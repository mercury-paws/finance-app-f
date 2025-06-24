import css from "./List.module.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import WaterListItem from "../../TrackerPageComponents/WaterDetailedInfo/DailyInfo/WaterListItem/WaterListItem";

Modal.setAppElement("#root");

function List({
  isOpen,
  onRequestClose,
  spent,
  note,
  currentMonth,
  totalSpent,
}) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="list"
        overlayClassName={css.overlay}
        className={css.modalContent}
        shouldCloseOnOverlayClick={true}
      >
        <div className={css.listContainer} onClick={(e) => e.stopPropagation()}>
          <div className={css.closeIcon}>
            <AiOutlineClose onClick={onRequestClose} />
          </div>
          <h4 className={css.doSmth}>
            Spent {totalSpent} czk for {note} in {currentMonth}
          </h4>

          <div className={css.waterListItems}>
            {spent.map((el) => (
              <WaterListItem
                key={el._id}
                details={el.details}
                currentMonth={currentMonth}
                day={el.day}
                spent={el.spent}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default List;
