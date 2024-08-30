import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";
import css from "./Name.module.css";
function Name() {
  const user = useSelector(selectUser);
  return (
    <>
      <p className={css.name}>
        Hello,{" "}
        <span className={css.userName}>{user.name ? user.name : "User"}</span>!
      </p>
    </>
  );
}

export default Name;
