import css from "./LogOut.module.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/auth/operations";
Modal.setAppElement("#root");

function LogOut({ isOpen, onRequestClose }) {
  let dispatch = useDispatch();
  let handleLogOut = () => {
    dispatch(logOut());
    onRequestClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="delete"
        overlayClassName={css.overlay}
        className={css.modalContent}
      >
        <h4 className={css.doSmth}>Log out</h4>
        <p className={css.want}>Do you really want to leave?</p>
        <button className={css.doBtn} onClick={handleLogOut}>
          Log out
        </button>
        <button className={css.cancelBtn} onClick={() => onRequestClose()}>
          Cancel
        </button>
      </Modal>
    </>
  );
}

export default LogOut;
