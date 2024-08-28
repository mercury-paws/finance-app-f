import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";

function Name() {
  return (
    <>
      <p>hello, User </p>
    </>
  );
}

export default Name;
