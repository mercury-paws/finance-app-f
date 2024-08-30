import css from "./Add.module.css";
import { FaPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import { getMonthNameByIndex } from "../../../constants/constants";
import { fetchWaterDay } from "../../../redux/water/operations";
import Modal from "react-modal";
import { addWater } from "../../../redux/water/operations";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root");

const FeedbackSchema = Yup.object().shape({
  time: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Must be a valid time in the format HH:MM"
    )
    .required("Required"),
  ml: Yup.string()
    .min(0, "Too Small!")
    .max(2000, "Too Much!")
    .required("Required"),
});

const now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
hours = hours < 10 ? `0${hours}` : hours;
minutes = minutes < 10 ? `0${minutes}` : minutes;
const time = `${hours}:${minutes}`;

const day = now.getDate();
const month = now.getMonth();
const year = now.getFullYear();
let monthName = getMonthNameByIndex(month);
const currentDayQuery = {
  day,
  month: monthName,
  year,
};

function Add({ isOpen, onRequestClose, chosenDay, currentMonth, currentYear }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(50);

  const initialValues = {
    time: `${time}`,
    ml: value,
  };

  const timeFieldId = useId();
  const valueFieldId = useId();

  const handleSubmit = (values, actions) => {
    const formattedValues = {
      ...values,
      ml: values.ml.toString(),
    };

    const queryDayParams = {
      day: chosenDay,
      month: currentMonth,
      year: currentYear,
    };

    console.log(queryDayParams, chosenDay);

    dispatch(
      addWater({
        newAddWater: formattedValues,
        queryDayParams,
      })
    ).then(() => {
      // Refresh the water data for the selected day after adding
      dispatch(fetchWaterDay(queryDayParams)); // currentDayQuery
    });

    actions.resetForm();
    onRequestClose();
  };

  let difference = 50;
  const decreaseValue = () => {
    let decreasedValue = value - difference;
    setValue(decreasedValue);
  };

  const addValue = () => {
    let addedValue = value + difference;
    setValue(addedValue);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="All"
      overlayClassName={css.overlay}
      className={css.modalContent}
    >
      <div className={css.addContainer}>
        <h4 className={css.header}>Add water</h4>
        <p className={css.doSmth}>Choose a value:</p>
        <p className={css.amount}>Amount of water:</p>
        <div className={css.addWaterBlock}>
          {<FaMinusCircle className={css.minus} onClick={decreaseValue} />}
          <p className={css.ml}>50 ml</p>
          {<FaPlusCircle className={css.plus} onClick={addValue} />}
        </div>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form className={css.form}>
            <div className={css.timeBlock}>
              <label className={css.time} htmlFor={timeFieldId}>
                Recording time:
              </label>
              <Field
                className={css.field}
                type="text"
                name="time"
                id={timeFieldId}
              />

              <ErrorMessage
                className={css.error}
                name="time"
                component="span"
              />
            </div>
            <div className={css.valueBlock}>
              <label htmlFor={valueFieldId} className={css.value}>
                Enter the value of the water used:
              </label>
              <Field
                className={css.field}
                type="text"
                name="ml"
                id={valueFieldId}
                value={value}
              />

              <ErrorMessage className={css.error} name="ml" component="span" />
            </div>
            <button className={css.btn} type="submit">
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}

export default Add;
