import css from "./LogOut.module.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/auth/operations";
import { AiOutlineClose } from "react-icons/ai";

Modal.setAppElement("#root");

function LogOut({ isOpen, onRequestClose }) {
  let dispatch = useDispatch();
  let handleLogOut = () => {
    dispatch(logOut());
    onRequestClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="delete"
        overlayClassName={css.overlay}
        className={css.modalContent}
      >
        <div className={css.logoutContainer}>
          <div className={css.closeIcon}>
            <AiOutlineClose onClick={onRequestClose} />
          </div>
          <h4 className={css.doSmth}>Log out</h4>
          <p className={css.want}>Do you really want to leave?</p>
          <div className={css.btnBlock}>
            <button className={css.doBtn} onClick={handleLogOut}>
              Log out
            </button>
            <button className={css.cancelBtn} onClick={() => onRequestClose()}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LogOut;
