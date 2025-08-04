import css from "./Income.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useState, useEffect, useId } from "react";
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
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FeedbackInSchema as FeedbackSchema } from "../../../validation/Schemas";

Modal.setAppElement("#root");

function Income({
  isOpen,
  onRequestClose,
  currentMonth,
  currentYear,
  incomes = [], // array of income objects passed from parent
}) {
  const dispatch = useDispatch();
  const baseId = useId();

  // Local state to allow adding new empty forms
  const [forms, setForms] = useState(
    incomes.length > 0 ? incomes : [{ income: "", note: "", _id: null }] // at least one empty form
  );
  useEffect(() => {
    if (isOpen) {
      setForms(
        incomes.length > 0 ? incomes : [{ income: "", note: "", _id: null }]
      );
    }
  }, [incomes, isOpen]);
  const addNewForm = () => {
    setForms((prev) => [...prev, { income: "", note: "", _id: null }]);
  };

  const handleSubmit = async (values, actions, formIndex) => {
    const formattedValues = {
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

      toast.success(`Form ${formIndex + 1}: Added successfully`);
      actions.resetForm();

      // Refresh forms after add
      // You may want to refetch incomes from redux or server here
    } catch (error) {
      toast.error(`Form ${formIndex + 1}: Error occurred`);
    }
  };

  const handleAmend = async (values, actions, formIndex, id) => {
    if (!id) {
      toast.error(`Form ${formIndex + 1}: Cannot amend unsaved entry`);
      return;
    }

    const formattedValues = {
      income: values.income.toString(),
      note: values.note.toString(),
    };

    const queryDayParams = { id };

    try {
      await dispatch(
        updateIn({
          updateIn: formattedValues,
          queryDayParams,
        })
      ).unwrap();

      await dispatch(
        fetchInMonth({
          month: currentMonth,
          year: currentYear,
        })
      ).unwrap();

      toast.success(`Form ${formIndex + 1}: Amended successfully`);
      actions.resetForm();
    } catch (error) {
      toast.error(`Form ${formIndex + 1}: Amendment failed`);
    }
  };

  const handleDelete = async (formIndex, id) => {
    if (!id) {
      toast.error(`Form ${formIndex + 1}: Cannot delete unsaved entry`);
      return;
    }
    try {
      await dispatch(deleteIn(id)).unwrap();

      await dispatch(
        fetchInMonth({
          month: currentMonth,
          year: currentYear,
        })
      ).unwrap();

      toast.success(`Form ${formIndex + 1}: Deleted`);
      // Optionally remove deleted form from UI:
      setForms((prev) => prev.filter((_, i) => i !== formIndex));
    } catch {
      toast.error(`Form ${formIndex + 1}: Delete failed`);
    }
  };

  let totalIncome =
    incomes?.reduce((total, item) => total + Number(item.income), 0) ?? 0;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Income Modal"
      overlayClassName={css.overlay}
      className={css.modalContent}
    >
      <div className={css.addContainer}>
        <div className={css.closeIcon}>
          <AiOutlineClose onClick={onRequestClose} />
        </div>
        <div className={css.headerBlock}>
          <h4 className={css.header}>
            Income in {currentMonth}: {totalIncome}
          </h4>
        </div>

        {forms.map((incomeItem, index) => {
          const incomeFieldId = `${baseId}-income-${index}`;
          const noteFieldId = `${baseId}-note-${index}`;

          return (
            <Formik
              key={index}
              initialValues={{
                income: incomeItem.income || "",
                note: incomeItem.note || "",
              }}
              enableReinitialize={true}
              validationSchema={FeedbackSchema}
              onSubmit={(values, actions) =>
                handleSubmit(values, actions, index)
              }
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
                      onClick={() =>
                        handleAmend(
                          values,
                          { resetForm },
                          index,
                          incomeItem._id
                        )
                      }
                    >
                      Amend
                    </button>
                    <button
                      className={css.btn}
                      type="button"
                      onClick={() => handleDelete(index, incomeItem._id)}
                    >
                      Delete
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          );
        })}
        <button className={css.addIcon} onClick={addNewForm}>
          <AiOutlinePlus size={20} />
        </button>
        <Toaster />
      </div>
    </Modal>
  );
}

export default Income;
