import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { verifyEmail } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import css from "./VerifyEmail.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const VerifyEmail = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, setIsOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="delete"
        overlayClassName={css.overlay}
        className={css.modalContent}
      >
        <div className={css.verifyContainer}>
          <p className={css.doSmth}>
            Please check your email for further verification
          </p>
          <p className={css.verifying}>Verifying email...</p>
        </div>
      </Modal>
      ;
    </>
  );
};

export default VerifyEmail;
