import AddInfo from "./AddInfo/AddInfo";
import HappyCustomers from "./HappyCustomers/HappyCustomers";
import css from "./MainPic.module.css";
function MainPic() {
  return (
    <div className={css.mainPic}>
      <p>hello, this is the MainPic</p>
      <HappyCustomers />
      <AddInfo />
    </div>
  );
}

export default MainPic;
