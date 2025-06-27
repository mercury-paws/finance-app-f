import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./Bar.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";

function Bar({ currentMonth }) {
  const user = useSelector(selectUser);
  const noteOptions = user.note ? Object.keys(user.note) : [];

  return (
    <div className={css.bar}>
      {noteOptions
        ? noteOptions.map((note) => (
            <ProgressBar key={note} note={note} currentMonth={currentMonth} />
          ))
        : "Loading"}
    </div>
  );
}

export default Bar;
