import css from "./Add.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import { getMonthNameByIndex } from "../../../constants/constants";
import { fetchWaterDay } from "../../../redux/water/operations";
import Modal from "react-modal";
import { addWater } from "../../../redux/water/operations";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { getCurrentTimeString } from "../../../constants/constants";
import { selectUser } from "../../../redux/auth/selectors";
import { FeedbackSchema } from "../../../validation/Schemas";

Modal.setAppElement("#root");

const now = new Date();
// let hours = now.getHours();
// let minutes = now.getMinutes();
// hours = hours < 10 ? `0${hours}` : hours;
// minutes = minutes < 10 ? `0${minutes}` : minutes;
// const time = `${hours}:${minutes}`;

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
  const [spent, setSpent] = useState(50);
  const user = useSelector(selectUser);

  const noteOptions = Object.keys(user.note);

  const initialValues = {
    time: getCurrentTimeString(),
    spent: spent,
    note: "",
    details: "",
  };

  const timeFieldId = useId();
  const spentFieldId = useId();
  const noteFieldId = useId();
  const detailsFieldId = useId();

  const handleSubmit = async (values, actions) => {
    const formattedValues = {
      ...values,
      spent: values.spent.toString(),
      note: values.note.toString(),
      details: values.details.toString(),
    };

    const queryDayParams = {
      day: chosenDay,
      month: currentMonth,
      year: currentYear,
    };
    try {
      await dispatch(
        addWater({
          newAddWater: formattedValues,
          queryDayParams,
        })
      ).unwrap();
      await dispatch(fetchWaterDay(queryDayParams)).unwrap();

      toast.success("Information was added");
      actions.resetForm();
      onRequestClose();
    } catch (error) {
      toast.error("Error. Please try again later");
    }
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
        <div className={css.closeIcon}>
          <AiOutlineClose onClick={onRequestClose} />
        </div>
        <h4 className={css.header}>Add number</h4>
        <p className={css.doSmth}>Choose a value:</p>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          <Form className={css.form}>
            <div className={css.timeBlock}>
              <label className={css.time} htmlFor={timeFieldId}>
                Time:
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
              <label htmlFor={spentFieldId} className={css.value}>
                Enter the vamount spent:
              </label>
              <Field
                className={css.field}
                type="text"
                name="spent"
                id={spentFieldId}
              />

              <ErrorMessage
                className={css.error}
                name="spent"
                component="span"
              />
            </div>
            <div className={css.valueBlock}>
              <label htmlFor={noteFieldId} className={css.value}>
                Enter the note:
              </label>
              <Field
                className={css.field}
                as="select"
                name="note"
                id={noteFieldId}
              >
                <option value="">-- Select a note --</option>
                {noteOptions.map((note, index) => (
                  <option key={index} value={note}>
                    {note}
                  </option>
                ))}
              </Field>
              <Field
                className={css.field}
                type="text"
                name="details"
                id={detailsFieldId}
              />

              <ErrorMessage
                className={css.error}
                name="note"
                component="span"
              />
            </div>
            <button className={css.btn} type="submit">
              Save
            </button>
            <Toaster />
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}

export default Add;
