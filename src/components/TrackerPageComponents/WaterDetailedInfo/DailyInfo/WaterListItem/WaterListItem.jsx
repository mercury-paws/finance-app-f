import { useState } from "react";
import css from "./WaterListItem.module.css";
import { GrMoney } from "react-icons/gr";
import { ICON_COLOR } from "../../../../../constants/constants.js";

function WaterListItem({ spent, note, day, details }) {
  return (
    <div className={css.waterItem}>
      <GrMoney color={ICON_COLOR} size={28} />
      <div className={css.mlTime}>
        <p className={css.ml}>{spent} czk</p>
        <p className={css.time}>{details}</p>
        <p className={css.time}>Day: {day}</p>
      </div>
    </div>
  );
}

export default WaterListItem;
