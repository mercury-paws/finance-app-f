import css from "./CalendarPagination.module.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
function CalendarPagination() {
  return (
    <div className={css.pagination}>
      <button>
        <FaAngleLeft />
      </button>
      <p>Month Year</p>
      <button>
        <FaAngleRight />
      </button>
    </div>
  );
}

export default CalendarPagination;
