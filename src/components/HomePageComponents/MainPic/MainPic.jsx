import AddInfo from "./AddInfo/AddInfo";
import HappyCustomers from "./HappyCustomers/HappyCustomers";
import css from "./MainPic.module.css";
function MainPic() {
  return (
    <div className={css.mainPic}>
      <div>
        <HappyCustomers />
        <AddInfo />
      </div>
    </div>
  );
}

export default MainPic;
