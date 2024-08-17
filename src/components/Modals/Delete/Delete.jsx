import css from "./Delete.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Delete({ isOpen, onRequestClose }) {
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
        <button className={css.doBtn}>Delete</button>
        <button className={css.cancelBtn} onClick={() => onRequestClose()}>
          Cancel
        </button>
      </>
    </Modal>
  );
}

export default Delete;
