import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";

function Name() {
  const user = useSelector(selectUser);
  return (
    <>
      <p>
        hello,
        {user.name ? user.name : "User"}
      </p>
    </>
  );
}

export default Name;
