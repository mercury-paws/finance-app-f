import { useSelector } from "react-redux";
// import { selectWater } from "../../../../redux/water/selectors";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./Bar.module.css";
// import { noteOptions } from "../../../../constants/constants";
import ProgressBar from "../ProgressBar/ProgressBar";

function Bar() {

  const user = useSelector(selectUser);
  const noteOptions = Object.keys(user.note);

  return (
    <div className={css.bar}>
      {noteOptions.map((note) => (
        
        <ProgressBar key={note} note={note} />
        
      ))}
    </div>
  );
}

export default Bar;