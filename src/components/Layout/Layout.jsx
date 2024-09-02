import Logo from "../Logo/Logo.jsx";
import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      {/* <div className={css.logo}>
        <Logo />
      </div> */}
      <div className={css.children}>{children}</div>
    </div>
  );
}
