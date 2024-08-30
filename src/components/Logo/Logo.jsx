import css from "./Logo.module.css";

function Logo() {
  return (
    <div className={css.logoContainer}>
      <p className={css.logo}>Aquatrack</p>
    </div>
  );
}

export default Logo;
