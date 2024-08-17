import { FaAngleDown } from "react-icons/fa";
import UserBarPopover from "../../UserBarPopover/UserBarPopover";
import { useState } from "react";

function UserBar() {
  const [userBar, setUserBar] = useState(false);

  const toggleUserBarPopover = () => {
    setUserBar(!userBar);
  };

  return (
    <>
      <button onClick={toggleUserBarPopover}>
        img Username <FaAngleDown />
      </button>
      {userBar && <UserBarPopover />}
    </>
  );
}

export default UserBar;
