import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectYearWater } from "../../../redux/water/selectors";
// import { useMemo } from "react";

import css from "./ChartModal.module.css";
import Settings from "../../TrackerPageComponents/WaterDetailedInfo/Settings/Settings";
import { useDispatch } from "react-redux";
import { fetchWaterYear } from "../../../redux/water/operations";
import { useEffect } from "react";
import { monthDays } from "../../../constants/constants";

Modal.setAppElement("#root");

function ChartModal({ isOpen, onRequestClose, year, note }) {
  const dispatch = useDispatch();
  const foundWaterYearData = useSelector(selectYearWater);

  useEffect(() => {
    if (!year) return;
    const fetchYearWater = async () => {
      try {
        const yearData = await dispatch(fetchWaterYear({ year })).unwrap();
      } catch (error) {
        console.error("Failed to fetch water data:", error);
      }
    };
    fetchYearWater();
  }, [dispatch, year]);

  console.log("water", foundWaterYearData);

  // const waterDataByYear = useMemo(() => {
  //   const waterData = foundWaterYearData || [];
  //   const waterMap = {};

  //   // filter per note
  //   // sum up spent per month of left note

  //   const dataNote = waterData.filter((el) => el.note === note);

  //   dataNote.forEach((item) => {
  //     if (waterMap[item.month]) {
  //       waterMap[item.month] += Number(item.spent);
  //     } else {
  //       waterMap[item.month] = Number(item.spent);
  //     }
  //   });

  //   console.log("foundWaterData per current month", foundWaterYearData);
  //   console.log("year", year);
  //   console.log("note", note);

  //   return waterMap;
  // }, [note, year, foundWaterYearData]);

  const dataChart = (monthDays, foundWaterYearData) => {
    const filteredDataByNote = foundWaterYearData.filter(
      (el) => el.note === note
    );

    return monthDays.map((month) => {
      const totalSpentForMonth = filteredDataByNote.reduce((acc, el) => {
        if (el.month === month) {
          acc += parseInt(el.spent, 10);
        }
        return acc;
      }, 0);
      return {
        month: `${month}`,
        spent: totalSpentForMonth,
      };
    });
  };
  const data = dataChart(Object.keys(monthDays), foundWaterYearData || []);

  console.log(data);

  return (
    <>
      {foundWaterYearData ? (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="All"
          overlayClassName={css.overlay}
          className={css.modalContent}
        >
          <div className={css.chartContainer}>
            <div className={css.closeIcon}>
              <AiOutlineClose onClick={onRequestClose} />
            </div>
            <div>
              <Settings year={year} note={note} />
            </div>

            <div className={css.chart}>
              <p> hello</p>
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
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) => `${value}`}
                    // ticks={[500, 1000, 50000, 10000]}
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
          </div>
        </Modal>
      ) : (
        <p>Loading chart...</p>
      )}
    </>
  );
}

export default ChartModal;
