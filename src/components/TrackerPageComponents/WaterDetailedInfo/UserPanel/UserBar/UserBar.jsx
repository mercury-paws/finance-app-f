import { FaAngleDown } from "react-icons/fa";
import UserBarPopover from "../../UserBarPopover/UserBarPopover";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";
import css from "./UserBar.module.css";
function UserBar() {
  const user = useSelector(selectUser);
  const [userBar, setUserBar] = useState(false);

  const toggleUserBarPopover = () => {
    setUserBar(!userBar);
  };

  return (
    <div className={css.btnContainer}>
      <button onClick={toggleUserBarPopover} className={css.btn}>
        {user.name ? user.name : "User"} img
        <FaAngleDown className={css.angleDown} />
      </button>
      {userBar && <UserBarPopover className={css.barPopover} />}
    </div>
  );
}

export default UserBar;
