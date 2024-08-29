import { FaAngleDown } from "react-icons/fa";
import UserBarPopover from "../../UserBarPopover/UserBarPopover";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";

function UserBar() {
  const user = useSelector(selectUser);
  const [userBar, setUserBar] = useState(false);

  const toggleUserBarPopover = () => {
    setUserBar(!userBar);
  };

  return (
    <>
      <button onClick={toggleUserBarPopover}>
        img
        {user.name ? user.name : "User"}
        <FaAngleDown />
      </button>
      {userBar && <UserBarPopover />}
    </>
  );
}

export default UserBar;
