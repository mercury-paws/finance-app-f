import css from "./Delete.module.css";
import Modal from "react-modal";
import { deleteSpent } from "../../../redux/spent/operations";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

Modal.setAppElement("#root");

function Delete({ isOpen, onRequestClose, id }) {
  let dispatch = useDispatch();
  let handleDelete = () => {
    dispatch(deleteSpent(id));
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
      <div className={css.deleteContainer}>
        <div className={css.closeIcon}>
          <AiOutlineClose onClick={onRequestClose} />
        </div>
        <h4 className={css.doSmth}>Delete entry</h4>
        <p className={css.want}>Are you sure you want to delete the entry?</p>
        <div className={css.btnBlock}>
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
        </div>
      </div>
    </Modal>
  );
}

export default Delete;
