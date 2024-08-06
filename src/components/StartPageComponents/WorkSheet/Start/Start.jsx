import { NavLink } from "react-router-dom";
import css from "./Start.module.css";

function Start() {
  return (
    <div className={css.homePage}>
      <p>Record daily water intake and track</p>
      <h1>water consumption tracker</h1>
      <NavLink to="/signup">Try Tracker</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
    </div>
  );
}

export default Start;
