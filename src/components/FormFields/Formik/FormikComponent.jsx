import { Formik, Form, ErrorMessage, Field } from "formik";
import SelectField from "../../FormFields/SelectField/SelectField";
import { selectYear } from "../../../constants/constants";
import { FeedbackChartSchema } from "../../../validation/Schemas";
import css from "./FormikComponent.module.css";

function FormikComponent({
  handleSubmit,
  initialValues,
  noteFieldId,
  yearFieldId,
  options,
  labelYear,
  labelDestination,
  nameYear,
  nameNote,
}) {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={FeedbackChartSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.timeBlock}>
          <SelectField
            id={yearFieldId}
            label={labelYear}
            options={selectYear}
            name={nameYear}
          />
        </div>
        <div className={css.valueBlock}>
          <SelectField
            id={noteFieldId}
            label={labelDestination}
            options={options}
            name={nameNote}
          />
        </div>
        <button className={css.btn} type="submit">
          Build
        </button>
      </Form>
    </Formik>
  );
}

export default FormikComponent;
