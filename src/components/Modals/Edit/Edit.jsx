import css from "./Edit.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useId, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateWater } from "../../../redux/spent/operations";
import {
  fetchSpentDay,
  fetchSpentMonth,
} from "../../../redux/spent/operations";
import { AiOutlineClose } from "react-icons/ai";
import { selectUser } from "../../../redux/auth/selectors";
import { FeedbackSchema } from "../../../validation/Schemas";
// import { noteOptions } from "../../../constants/constants";

Modal.setAppElement("#root");

function Edit({
  isOpen,
  onRequestClose,
  id,
  currentMonth,
  chosenDay,
  currentYear,
  time,
  spent,
  note,
  details,
}) {
  let dispatch = useDispatch();
  const user = useSelector(selectUser);
  const noteOptions = Object.keys(user.note);

  const [spentVal, setSpent] = useState(Number(spent));
  const [noteVal, setNote] = useState(note);
  const [detailsVal, setDetailsNote] = useState(details);

  const initialValues = {
    time: time,
    spent: spentVal,
    note: noteVal,
    details: detailsVal,
  };

  const handleSubmit = async (values, actions) => {
    const formattedValues = {
      ...values,
      spent: values.spent.toString(),
      note: values.note.toString(),
      details: values.details.toString(),
    };

    const queryDayParams = {
      id,
    };

    try {
      await dispatch(
        updateWater({
          updateWater: formattedValues,
          queryDayParams,
        })
      ).unwrap();

      await dispatch(
        fetchSpentDay({
          day: chosenDay,
          month: currentMonth,
          year: currentYear,
        })
      ).unwrap();

      await dispatch(
        fetchSpentMonth({
          month: currentMonth,
          year: currentYear,
        })
      ).unwrap();

      toast.success("Information was added");
      actions.resetForm();
      onRequestClose();
    } catch (error) {
      toast.error("Error. Please try again later");
    }
  };

  const timeFieldId = useId();
  const spentFieldId = useId();
  const noteFieldId = useId();
  const detailsFieldId = useId();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="edit info"
      overlayClassName={css.overlay}
      className={css.modalContent}
    >
      <div className={css.editContainer}>
        <div className={css.closeIcon}>
          <AiOutlineClose onClick={onRequestClose} />
        </div>
        <h4 className={css.header}>Modify Expense Entry</h4>

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
                Amend the amount spent:
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
                Amend the destination:
              </label>
              <Field
                className={css.field}
                as="select"
                name="note"
                id={noteFieldId}
              >
                <option value="">-- Select a destination --</option>
                {noteOptions.map((note, index) => (
                  <option key={index} value={note}>
                    {note}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className={css.error}
                name="note"
                component="span"
              />
              <label htmlFor={detailsFieldId} className={css.value}>
                Amend the note:
              </label>
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

export default Edit;
