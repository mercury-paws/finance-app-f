import css from "./Delete.module.css";
import Modal from "react-modal";
import { deleteWater } from "../../../redux/water/operations";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root");

function Delete({ isOpen, onRequestClose, id }) {
  let dispatch = useDispatch();
  let handleDelete = () => {
    dispatch(deleteWater(id));
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="delete"
      overlayClassName={css.overlay}
      className={css.modalContent}
    >
      <>
        <h4 className={css.doSmth}>Delete entry</h4>
        <p className={css.want}>Are you sure you want to delete the entry?</p>
        <button className={css.doBtn} onClick={handleDelete}>
          Delete
        </button>
        <button
          className={css.cancelBtn}
          onClick={() => {
            onRequestClose();
          }}
        >
          Cancel
        </button>
      </>
    </Modal>
  );
}

export default Delete;
