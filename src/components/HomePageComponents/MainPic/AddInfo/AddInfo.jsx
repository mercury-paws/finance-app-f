import css from "./AddInfo.module.css";

function AddInfo() {
  return (
    <div className={css.addInfo}>
      <div className={css.square}>
        <blockquote className={css.quote}>
          "It's not your salary that makes you rich, it's your spending habits."
          <footer>- Charles A. Jaffe</footer>
        </blockquote>
      </div>
    </div>
  );
}

export default AddInfo;
