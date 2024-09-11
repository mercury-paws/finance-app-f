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

function Chart({ days }) {
  const foundWaterData = useSelector(selectWater);
  const user = useSelector(selectUser);

  const waterDataByDay = useMemo(() => {
    const waterData = foundWaterData || [];
    const waterMap = {};

    waterData.forEach((item) => {
      if (waterMap[item.day]) {
        waterMap[item.day] = Number(waterMap[item.day]) + Number(item.ml);
      } else {
        waterMap[item.day] = Number(item.ml);
      }
    });

    Object.keys(waterMap).forEach((day) => {
      waterMap[day] = String(
        Math.round((waterMap[day] * 100) / (user.waterVolume * 1000))
      );
    });

    console.log("foundWaterData", foundWaterData);

    return waterMap;
  }, [foundWaterData, user.waterVolume]);

  //   const data = [
  //     {
  //       name: `1`,
  //       uv: 1,
  //     },
  //     {
  //       name: "2",
  //       uv: 0.5,
  //     },
  //     {
  //       name: "3",
  //       uv: 2,
  //     },
  //     {
  //       name: "4",
  //       uv: 1,
  //     },
  //     {
  //       name: "5",
  //       uv: 2,
  //     },
  //     {
  //       name: "6",
  //       uv: 2,
  //     },
  //     {
  //       name: "7",
  //       uv: 1,
  //     },
  //   ];

  const formatXAxis = (days) => {
    // Format the tick label based on your requirements
    // For example, you could format dates, numbers, etc.
    return `${days}`; // Customize this line
  };

  const dataChart = (days, foundWaterData) => {
    return days.map((day) => {
      // Sum up the ml for each day
      const totalMlForDay = foundWaterData.reduce((acc, el) => {
        // Check if the current element's day matches the current day
        if (Number(el.day) === Number(day)) {
          acc += parseInt(el.ml, 10); // Add ml to accumulator, converting it to number
        }
        return acc;
      }, 0); // Initial value of accumulator is 0

      // Return an object with day and total ml for chart data
      return {
        name: `${day}`, // You can customize the name here
        uv: totalMlForDay, // Total ml for that day
      };
    });
  };
  const data = dataChart(days, foundWaterData);

  console.log(data);

  return (
    <div>
      <AreaChart
        width={630}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9be1a0" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#9be1a0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tickFormatter={formatXAxis} />
        <YAxis
          tickFormatter={(value) => `${value} L`}
          ticks={[0, 100, 400, 600, 1000]}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#9be1a0"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
}

export default Chart;
