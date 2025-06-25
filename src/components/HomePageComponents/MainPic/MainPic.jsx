import AddInfo from "./AddInfo/AddInfo";
import css from "./MainPic.module.css";
import useBackgroundSwiper from "../../../utils/Swiper";

function MainPic() {
  const backgroundStyle = useBackgroundSwiper();

  return (
    <div className={css.mainPic} style={backgroundStyle}>
      <div className={css.pic}>
        <AddInfo />
      </div>
    </div>
  );
}

export default MainPic;
