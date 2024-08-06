import MainPic from "../../components/HomePageComponents/MainPic/MainPic.jsx";
import WorkSheet from "../../components/HomePageComponents/WorkSheet/WorkSheet.jsx";
import css from "./HomePage.module.css";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div className={css.startPage}>
      <div>
        {!isAuthPage && <WorkSheet />}
        <Outlet />
      </div>

      <div>
        <MainPic />
      </div>
    </div>
  );
}

export default HomePage;
