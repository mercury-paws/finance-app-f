import css from "./Delete.module.css";

function Delete() {
  return (
    <>
      <h4 className={css.doSmth}>Delete entry</h4>
      <p className={css.want}>Are you sure you want to delete the entry?</p>
      <button className={css.doBtn}>Delete</button>
      <button className={css.cancelBtn}>Cancel</button>
    </>
  );
}

export default Delete;
