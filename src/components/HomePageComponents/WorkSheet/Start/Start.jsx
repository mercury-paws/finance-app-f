import { NavLink } from "react-router-dom";
import css from "./Start.module.css";

function Start() {
  return (
    <div className={css.homePage}>
      <p className={css.homePageSlogan}>Track daily. Save monthly.</p>
      <h1 className={css.homePageHeader}>Personal finance tracker</h1>
      <div className={css.homePageBtns}>
        <NavLink className={css.homePageRegister} to="/signup">
          Try Tracker
        </NavLink>
        <NavLink className={css.homePageSignIn} to="/signin">
          Sign In
        </NavLink>
      </div>
    </div>
  );
}

export default Start;
