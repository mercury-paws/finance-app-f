import css from "./Income.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useId, useState } from "react";
import { getMonthNameByIndex } from "../../../constants/constants";
import Modal from "react-modal";
import {
  addIn,
  updateIn,
  deleteIn,
  fetchInMonth,
} from "../../../redux/income/operations";

import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { FeedbackInSchema as FeedbackSchema } from "../../../validation/Schemas";

Modal.setAppElement("#root");

const now = new Date();
const month = now.getMonth();
const year = now.getFullYear();
let monthName = getMonthNameByIndex(month);

const currentDayQuery = {
  month: monthName,
  year,
};

function Income({
  isOpen,
  onRequestClose,
  currentMonth,
  currentYear,
  inc,
  description,
  id,
}) {
  const dispatch = useDispatch();
  const [income, setIncome] = useState("");
  const [note, setNote] = useState("");

  const initialValues = {
    income: inc || "",
    note: description || "",
  };

  const incomeFieldId = useId();
  const noteFieldId = useId();

  const handleSubmit = async (values, actions) => {
    const formattedValues = {
      ...values,
      income: values.income.toString(),
      note: values.note.toString(),
    };

    const queryDayParams = {
      month: currentMonth,
      year: currentYear,
    };
    try {
      await dispatch(
        addIn({
          newAddIn: formattedValues,
          queryDayParams,
        })
      ).unwrap();

      await dispatch(fetchInMonth(queryDayParams)).unwrap();

      toast.success("Information was added");
      actions.resetForm();
      onRequestClose();
    } catch (error) {
      toast.error("Error. Please try again later");
    }
  };

  const handleAmend = async (values, actions) => {
    const formattedValues = {
      income: values.income.toString(),
      note: values.note.toString(),
    };

    const queryDayParams = {
      id,
    };

    try {
      const result = await dispatch(
        updateIn({
          updateIn: formattedValues,
          queryDayParams,
        })
      ).unwrap();
      console.log(result);
      await dispatch(
        fetchInMonth({
          month: currentMonth,
          year: currentYear,
        })
      ).unwrap();

      toast.success("Income was amended");
      actions.resetForm();
      onRequestClose();
    } catch (error) {
      toast.error("Amend failed");
    }
  };

  let handleDelete = () => {
    dispatch(deleteIn(id));
    onRequestClose();
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
        <h4 className={css.header}>Income in {currentMonth}</h4>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          {({ values, resetForm }) => (
            <Form className={css.form}>
              <div className={css.valueBlock}>
                <label htmlFor={incomeFieldId} className={css.value}>
                  Enter the income:
                </label>
                <Field
                  className={css.field}
                  type="text"
                  name="income"
                  id={incomeFieldId}
                />

                <ErrorMessage
                  className={css.error}
                  name="income"
                  component="span"
                />
                <label htmlFor={noteFieldId} className={css.value}>
                  Enter the note:
                </label>
                <Field
                  className={css.field}
                  type="text"
                  name="note"
                  id={noteFieldId}
                />

                <ErrorMessage
                  className={css.error}
                  name="note"
                  component="span"
                />
              </div>
              <div className={css.btnBlock}>
                <button className={css.btn} type="submit">
                  Save
                </button>
                <button
                  className={css.btn}
                  type="button"
                  onClick={() => handleAmend(values, { resetForm })}
                >
                  Amend
                </button>
                <button
                  className={css.btn}
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>

              <Toaster />
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default Income;
