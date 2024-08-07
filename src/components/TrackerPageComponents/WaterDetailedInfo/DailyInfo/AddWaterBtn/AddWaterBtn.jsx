import css from "./AddWaterBtn.module.css";
import { FaPlus } from "react-icons/fa";
function AddWaterBtn() {
  return (
    <div className={css.AddWaterBtn}>
      <button className={css.btn}>
        <FaPlus className={css.plusIcon} /> Add water
      </button>
    </div>
  );
}

export default AddWaterBtn;
