import { useState, useEffect } from "react";
import MainPic from "../../components/HomePageComponents/MainPic/MainPic.jsx";
import WorkSheet from "../../components/HomePageComponents/WorkSheet/WorkSheet.jsx";
import css from "./HomePage.module.css";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../../components/Logo/Logo.jsx";
function HomePage() {
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1380);
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1380);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div className={css.startPage}>
      <div className={css.logo}>
        <Logo />
      </div>
      <div>
        {!isAuthPage && <WorkSheet />}
        <Outlet />
      </div>

      {location.pathname === "/" ? <MainPic /> : <div></div>}
      {isVisible && location.pathname !== "/" && <MainPic />}
    </div>
  );
}

export default HomePage;
