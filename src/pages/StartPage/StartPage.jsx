import MainPic from "../../components/StartPageComponents/MainPic/MainPic.jsx";
import WorkSheet from "../../components/StartPageComponents/WorkSheet/WorkSheet.jsx";
import css from "./StartPage.module.css";

function StartPage() {
  return (
    <div className={css.startPage}>
      <WorkSheet />
      <MainPic />
    </div>
  );
}

export default StartPage;
