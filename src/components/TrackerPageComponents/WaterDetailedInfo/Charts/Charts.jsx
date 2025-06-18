import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import { useSelector } from "react-redux";
  import { selectWater } from "../../../../redux/water/selectors";
  import { useMemo } from "react";
  import { selectUser } from "../../../../redux/auth/selectors";
  import css from "./Charts.module.css";
  
  function Charts({ days }) {

  
      return (
          <>
      <p>chart1</p>
      <p>chart2</p>
      <p>chart3</p>
      </>);

  }
  
  export default Charts;
  