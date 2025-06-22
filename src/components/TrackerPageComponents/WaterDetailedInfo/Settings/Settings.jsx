import css from "./Settings.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import {
  fetchWaterDay,
  fetchWaterMonth,
} from "../../../../redux/water/operations";

import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { selectUser } from "../../../../redux/auth/selectors";
import { selectWater } from "../../../../redux/water/selectors";
import { selectYear } from "../../../../constants/constants";
import ChartModal from "../../../Modals/ChartModal/ChartModal";

const FeedbackSchema = Yup.object().shape({
  year: Yup.string()
    .matches(/\b[12]\d{3}\b/, "Year must be a valid")
    .required("Required"),
  note: Yup.string()
    .matches(/^[a-zA-Z]/, "Must be a valid spent desitnation")
    .required("Required"),
});

const now = new Date();

function Settings({ year, note }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const noteOptions = Object.keys(user.note);

  const [selectedData, setSelectedData] = useState(null);
  const [showChartModal, setShowChartModal] = useState(false);

  const initialValues = {
    year: year || "",
    note: note || "",
  };

  const handleSubmit = async (values, actions) => {
    const formattedValues = {
      ...values,
      year: values.year.toString(),
      note: values.note.toString(),
    };

    const queryParams = {
      year: formattedValues.year,
    };

    try {
      setSelectedData(values);
      setShowChartModal(true);
      // await dispatch(fetchWaterMonth(queryParams)).unwrap();
    } catch (error) {
      toast.error("Error. Please try again later");
    }
  };

  const yearFieldId = useId();
  const noteFieldId = useId();

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.timeBlock}>
            <label className={css.time} htmlFor={yearFieldId}>
              Year:
            </label>
            <Field
              className={css.field}
              as="select"
              name="year"
              id={yearFieldId}
            >
              <option value="">-- Select a year --</option>
              {selectYear.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </Field>
            <ErrorMessage className={css.error} name="year" component="span" />
          </div>
          <div className={css.valueBlock}>
            <label htmlFor={noteFieldId} className={css.value}>
              Destination:
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

            <ErrorMessage className={css.error} name="note" component="span" />
          </div>
          <button className={css.btn} type="submit">
            Build
          </button>
          <Toaster />
        </Form>
      </Formik>

      {/* Modal opens after form submit */}
      {showChartModal && (
        <ChartModal
          year={selectedData.year}
          note={selectedData.note}
          isOpen={showChartModal}
          onRequestClose={() => setShowChartModal(false)}
        />
      )}
    </>
  );
}

export default Settings;
