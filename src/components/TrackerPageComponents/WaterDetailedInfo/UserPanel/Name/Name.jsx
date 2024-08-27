import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/auth/selectors";

function Name() {
  let user = useSelector(selectUser);
  console.log(user);
  return (
    <>
      <p>hello, User {user.name}</p>
    </>
  );
}

export default Name;
