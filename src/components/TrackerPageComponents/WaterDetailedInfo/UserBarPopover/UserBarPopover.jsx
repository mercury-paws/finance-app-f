import css from "./UserBarPopover.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import LogOut from "../../../Modals/LogOut/LogOut";
import { useState } from "react";
import Setting from "../../../Modals/Setting/Setting";

function UserBarPopover() {
  const [modalSettingsOpen, setModalSettingsOpen] = useState(false);

  const handleSettingsModalOpen = () => {
    setModalSettingsOpen(true);
  };

  const closeSettingsModal = () => {
    setModalSettingsOpen(false);
  };

  const [modalLogoutOpen, setModalLogoutOpen] = useState(false);

  const handleLogoutModalOpen = () => {
    setModalLogoutOpen(true);
  };

  const closeLogoutModal = () => {
    setModalLogoutOpen(false);
  };

  return (
    <>
      <button onClick={handleSettingsModalOpen}>
        {" "}
        <FaRegSun /> Settings
      </button>
      {modalSettingsOpen && (
        <Setting
          isOpen={modalSettingsOpen}
          onRequestClose={closeSettingsModal}
        />
      )}
      <button className={css.logOut} onClick={handleLogoutModalOpen}>
        {" "}
        <FaSignOutAlt /> Log out
      </button>
      {modalLogoutOpen && (
        <LogOut isOpen={modalLogoutOpen} onRequestClose={closeLogoutModal} />
      )}
    </>
  );
}

export default UserBarPopover;
