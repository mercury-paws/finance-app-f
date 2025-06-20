import css from "./Edit.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateWater } from "../../../redux/water/operations";
import { fetchWaterDay, fetchWaterMonth } from "../../../redux/water/operations";
import { AiOutlineClose } from "react-icons/ai";
import { selectUser } from "../../../redux/auth/selectors";
// import { noteOptions } from "../../../constants/constants";

Modal.setAppElement("#root");

const FeedbackSchema = Yup.object().shape({
  time: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Must be a valid time in the format HH:MM"
    )
    .required("Required"),
  note: Yup.string()
    .matches(
      /^[a-zA-Z]/,
      "Must be a valid spent desitnation"
    )
    .required("Required"),
  spent: Yup.string()
    .min(0, "Too Small!")
    .max(2000, "Too Much!")
    .required("Required"),
    details: Yup.string()
    .min(0, "Too Small!")
    .max(2000, "Too Much!"),
});

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

  const handleSubmit = (values, actions) => {
    const formattedValues = {
      ...values,
      spent: values.spent.toString(),
      note: values.note.toString(),
      details: values.details.toString(),
    };

    const queryDayParams = {
      id,
    };

    console.log(queryDayParams, values.spent, values.note, time);

   
    dispatch(
      updateWater({
        updateWater: formattedValues,
        queryDayParams,
      })
    ).then(() => {
      // Refresh the water data for the selected day after adding
      dispatch(
        fetchWaterDay({
          day: chosenDay,
          month: currentMonth,
          year: currentYear,
        })
      );
      }).then(() => {
        // Refresh the water data for the selected day after adding
        dispatch(
          fetchWaterMonth({
         
            month: currentMonth,
            year: currentYear,
          })
        )
    });

    actions.resetForm();
    onRequestClose();
  };

  const timeFieldId = useId();
  const spentFieldId = useId();
  const noteFieldId = useId();
  const detailsFieldId = useId();
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="delete"
      overlayClassName={css.overlay}
      className={css.modalContent}
    >
      <div className={css.editContainer}>
        <div className={css.closeIcon}>
          <AiOutlineClose onClick={onRequestClose} />
        </div>
        <h4 className={css.header}>Edit the entered amount of water</h4>
        <p className={css.doSmth}>Correct entered data:</p>
        {/* <p className={css.amount}>Amount of water:</p>
        <div className={css.addWaterBlock}>
          {<FaMinusCircle className={css.minus} onClick={decreaseValue} />}
          <p className={css.ml}>50 ml</p>
          {<FaPlusCircle className={css.plus} onClick={addValue} />}
        </div> */}

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

              <ErrorMessage className={css.error} name="spent" component="span" />
            </div>
            <div className={css.valueBlock}>
                          <label htmlFor={noteFieldId} className={css.value}>
                            Amend the note:
                          </label>
                          <Field
                            className={css.field}
                            as="select"
                            name="note"
                            id={noteFieldId}
                          >
                              <option value="">-- Select a note --</option>
                {noteOptions.map((note, index) => (
                  <option key={index} value={note}>{ note}</option>
                )) }
            
              
                          </Field>
              <ErrorMessage className={css.error} name="note" component="span" />
              <Field
                                                        className={css.field}
                                                        type="text"
                                                        name="details"
                                                        id={detailsFieldId}
                                                      />
                                                          
                                        
                                          
                                                      
                            <ErrorMessage className={css.error} name="note" component="span" />
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

export default Edit;
