// import { useSelector } from "react-redux";
// import { selectWater } from "../../../../redux/water/selectors";
// import { selectUser } from "../../../../redux/auth/selectors";
import css from "./Bar.module.css";
import { noteOptions } from "../../../../constants/constants";
import ProgressBar from "../ProgressBar/ProgressBar";

function Bar() {
  console.log("noteOptions", noteOptions)
  return (
    <div     className={css.bar}>
      {noteOptions.map((note) => (
        
        <ProgressBar key={note} note={note} />
        
      ))}
    </div>
  );
}

export default Bar;