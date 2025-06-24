import css from "./Income.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useId, useState } from "react";
import { getMonthNameByIndex } from "../../../constants/constants";
import { fetchInMonth } from "../../../redux/income/operations";
import Modal from "react-modal";
import { addIn } from "../../../redux/income/operations";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { getCurrentTimeString } from "../../../constants/constants";
import { selectUser } from "../../../redux/auth/selectors";
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

export default Income;
