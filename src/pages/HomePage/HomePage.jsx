import { useState } from "react";
import MainPic from "../../components/HomePageComponents/MainPic/MainPic.jsx";
import WorkSheet from "../../components/HomePageComponents/WorkSheet/WorkSheet.jsx";
import css from "./HomePage.module.css";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../../components/Logo/Logo.jsx";
function HomePage() {
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

      <div>{location.pathname === "/" ? <MainPic /> : <div></div>}</div>
    </div>
  );
}

export default HomePage;
