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
import { selectWater } from "../../../../../../redux/water/selectors";
import { useMemo } from "react";
import { selectUser } from "../../../../../../redux/auth/selectors";
import css from "./Chart.module.css";

function Chart({ days }) {
  const foundWaterData = useSelector(selectWater);
  const user = useSelector(selectUser);


  const waterDataByDay = useMemo(() => {
    const waterData = foundWaterData || [];
    const waterMap = {};

    waterData.forEach((item) => {
      if (waterMap[item.day]) {
        waterMap[item.day] = Number(waterMap[item.day]) + Number(item.spent);
      } else {
        waterMap[item.day] = Number(item.spent);
      }
    });

 

    console.log("foundWaterData", foundWaterData);

    return waterMap;
  }, [foundWaterData, user.waterVolume]);

  const dataChart = (days, foundWaterData) => {
    return days.map((day) => {
      const totalMlForDay = foundWaterData.reduce((acc, el) => {
        if (Number(el.day) === Number(day)) {
          acc += parseInt(el.spent, 10);
        }
        return acc;
      }, 0);
      return {
        name: `${day}`,
        spent: totalMlForDay,
      };
    });
  };
  const data = dataChart(days, foundWaterData);

  console.log(data);

  return (
    <div className={css.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={620}
          height={300}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9be1a0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#9be1a0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => `${value}`}
            ticks={[1000, 5000, 10000, 15000]}
          />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="spent"
            stroke="#9be1a0"
            fillOpacity={1}
            fill="url(#colorl)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
