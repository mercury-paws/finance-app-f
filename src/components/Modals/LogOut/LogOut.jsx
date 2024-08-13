import css from "./LogOut.module.css";

function LogOut() {
  return (
    <>
      <h4 className={css.doSmth}>Log out</h4>
      <p className={css.want}>Do you really want to leave?</p>
      <button className={css.doBtn}>Log out</button>
      <button className={css.cancelBtn}>Cancel</button>
    </>
  );
}

export default LogOut;
