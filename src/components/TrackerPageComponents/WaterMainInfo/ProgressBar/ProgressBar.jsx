import { useSelector } from "react-redux";
import { selectWater } from "../../../../redux/water/selectors";
import { selectUser } from "../../../../redux/auth/selectors";
import css from "./ProgressBar.module.css";
// import { useEffect } from "react";
// import { fetchWaterMonth } from "../../../../redux/water/operations";

function ProgressBar({ note }) {
  // let dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("Dispatching fetchWaterDay")
  //       dispatch(
       
  //       fetchWaterMonth("May")
  //     );
  //   }, [dispatch]);
  const foundWaterData = useSelector(selectWater);
  const user = useSelector(selectUser);

    const totalSpent = foundWaterData
      .filter((day) => day.note === note)
      .reduce((sum, day) => sum + Number(day.spent), 0);
  
  const noteValues = user.note[note];
  
  let progressBar = Math.round(
    (Number(totalSpent) / (Number(noteValues))) * 100
  );

  let difference = noteValues - totalSpent
  
  return (

    <div className={css.progressBar}>
      <div className={css.today}>
        <p>{note}: {totalSpent}</p>
        <p>{difference >= 0 ? "left: " : "over: "}
          {difference}
        </p>
      </div>
     
      <div className={css.progressBarContainerNum}>
      <div className={css.progressBarContainer}>
        <div
          className={css.progressBarLine}
          
            style={ difference >= 0 ?
              { width: `${progressBar}%` } : { width: "100%", backgroundColor:"#ff0000" }
            }
        >
          
        </div>
      </div>
      <p className={css.progressNumbers}>
        <span>0%</span> <span>50%</span> <span>{noteValues}</span>
        </p>
        </div>
    </div>
    
  );
}

export default ProgressBar;
