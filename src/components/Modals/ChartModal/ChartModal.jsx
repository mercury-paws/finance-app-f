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
import { selectYearWater } from "../../../redux/spent/selectors";
import { useId, useState } from "react";
import css from "./ChartModal.module.css";
import { useDispatch } from "react-redux";
import { fetchSpentYear } from "../../../redux/spent/operations";
import { useEffect } from "react";
import { monthDays } from "../../../constants/constants";
import { selectUser } from "../../../redux/auth/selectors";
import FormikComponent from "../../FormFields/Formik/FormikComponent";
import { selectWater } from "../../../redux/spent/selectors";

Modal.setAppElement("#root");

function ChartModal({ isOpen, onRequestClose, year, note }) {
  const dispatch = useDispatch();
  const foundWaterYearData = useSelector(selectYearWater);
  const user = useSelector(selectUser);

  const noteOptions = user.note ? [...Object.keys(user.note), "total"] : [];

  const foundWaterData = useSelector(selectWater);

  let progress = foundWaterData
    .map((day) => day.spent)
    .reduce((total, num) => total + Number(num), 0);

  const [selectedData, setSelectedData] = useState({
    year: year || "",
    note: note || "",
  });

  useEffect(() => {
    if (!selectedData.year) return;
    const fetchYearWater = async () => {
      try {
        await dispatch(fetchSpentYear({ year: selectedData.year })).unwrap();
      } catch (error) {
        console.error("Failed to fetch water data:", error);
      }
    };
    fetchYearWater();
  }, [dispatch, selectedData.year]);

  const dataChart = (monthDays, foundWaterYearData) => {
    const filteredDataByNote =
      selectedData.note === "total"
        ? foundWaterYearData
        : foundWaterYearData.filter((el) => el.note === selectedData.note);

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

  const yearFieldId = useId();
  const noteFieldId = useId();

  const initialValues = {
    year: selectedData.year,
    note: selectedData.note,
  };

  const handleSubmit = async (values, actions) => {
    const formattedValues = {
      year: values.year.toString(),
      note: values.note.toString(),
    };
    try {
      setSelectedData(formattedValues);
    } catch (error) {
      error("Error. Please try again later");
    }
  };

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

            <FormikComponent
              handleSubmit={handleSubmit}
              initialValues={initialValues}
              yearFieldId={yearFieldId}
              noteFieldId={noteFieldId}
              options={noteOptions}
              labelYear={"Year:"}
              labelDestination={"Destination:"}
              nameYear={"year"}
              nameNote={"note"}
            />

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
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value}`} />
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
