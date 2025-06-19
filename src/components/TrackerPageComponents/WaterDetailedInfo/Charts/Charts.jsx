// import {
//     AreaChart,
//     Area,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//   } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
  import css from "./Charts.module.css";
import { fetchWaterDay } from "../../../../redux/water/operations";
import { selectWater } from "../../../../redux/water/selectors";
  
function Charts() {
    console.log("Charts component rendered");

      let dispatch = useDispatch();
      const water = useSelector(selectWater);
    

    useEffect(() => {console.log("Dispatching fetchWaterDay")
        dispatch(
            
        fetchWaterDay({ year: "2025" })
      );
    }, [dispatch]);
      

    useEffect(() => {
        if (water) {
          console.log("Water data:", water);
        }
      }, [water]);
    
      
      return (
          <>
      <p>year+total - fetch the sum for every month</p>
      <p>year+spent destination</p>
      <p>chart4</p>
      </>);

  }
  
  export default Charts;
  