import Name from "./Name/Name";
import UserBar from "./UserBar/UserBar";
import css from "./UserPanel.module.css";
function UserPanel() {
  return (
    <div className={css.userPanel}>
      <Name />
      <UserBar />
    </div>
  );
}

export default UserPanel;
