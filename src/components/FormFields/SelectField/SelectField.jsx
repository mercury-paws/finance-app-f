import { Formik, Form, ErrorMessage, Field } from "formik";
import css from "./SelectField.module.css";

function SelectField({ id, label, options, name }) {
  return (
    <>
      <label htmlFor={id} className={css.value}>
        {label}
      </label>
      <Field className={css.field} as="select" name={name} id={id}>
        <option value="">-- Select a {label} --</option>
        {options.map((el, index) => (
          <option key={index} value={el}>
            {el}
          </option>
        ))}
      </Field>

      <ErrorMessage className={css.error} name={name} component="span" />
    </>
  );
}

export default SelectField;
