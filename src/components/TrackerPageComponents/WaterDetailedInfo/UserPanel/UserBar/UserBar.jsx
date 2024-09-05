import { FaAngleDown } from "react-icons/fa";
import UserBarPopover from "../../UserBarPopover/UserBarPopover";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";
import css from "./UserBar.module.css";
import clsx from "clsx";

function UserBar() {
  const user = useSelector(selectUser);
  const [userBar, setUserBar] = useState(false);

  const toggleUserBarPopover = () => {
    setUserBar(!userBar);
    return css.angleRight;
  };

  return (
    <div className={css.btnContainer}>
      <button onClick={toggleUserBarPopover} className={css.btn}>
        {user.name ? user.name : "User"}
        {user.photo ? (
          <img
            className={css.userPhoto}
            src={user.photo}
            alt={`Photo of ${user.name}`}
          />
        ) : (
          <div></div>
        )}
        <FaAngleDown
          className={clsx(css.angleDown, userBar && css.angleRight)}
        />
      </button>
      {userBar && <UserBarPopover className={css.barPopover} />}
    </div>
  );
}

export default UserBar;
