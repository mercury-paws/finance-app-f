import { useState } from "react";
import css from "./WaterListItem.module.css";
import { useSelector } from "react-redux";
import { selectDayWater } from "../../../../../redux/water/selectors.js";

function WaterListItem({ spent, note, day, details}) {

  return (
    <div className={css.waterItem}>
      <svg className={css.cupIcon} width="32" height="36">
        <use href="/symbol-defs.svg#cup"></use>
      </svg>
      <div className={css.mlTime}>
        <p className={css.ml}>{spent} czk</p>
        <p className={css.time}>{details}</p>
        <p className={css.time}>Day: {day}</p>
      </div>
    </div>
  );
}

export default WaterListItem;



