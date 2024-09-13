import Logo from "../Logo/Logo";
import css from "./NotFound.module.css";
import clsx from "clsx";

function NotFound() {
  return (
    <div className={css.notFoundContainer}>
      <div className={css.notFound}>
        <div className={css.logo}>
          <Logo />
        </div>
        <h3 className={css.notFoundHeader}>
          404
          <br />
          Page not found. The page you are looking for doesn't exist.
        </h3>
        <div>
          <div className={clsx(css.circle, css.scaleUpDownCenter)}></div>
          <div className={clsx(css.circle, css.scaleUpDownCenter)}></div>
          <div className={clsx(css.circle, css.scaleUpDownCenter)}></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
