import { useId } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./SignIn.module.css";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();

  return (
    <>
      <h3>Sign In</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <div>
            <label htmlFor={emailFieldId}>Email</label>
            <Field
              className={css.field}
              type="email"
              name="email"
              id={emailFieldId}
            />

            <ErrorMessage name="email" component="span" />
          </div>
          <div>
            <label htmlFor={passwordFieldId}>Password</label>
            <Field
              className={css.field}
              type={showPassword ? "text" : "password"}
              name="password"
              id={passwordFieldId}
            />
            <div onClick={toggleShowPassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <ErrorMessage name="password" component="span" />
          </div>
          <button className={css.btn} type="submit">
            Sign In
          </button>
        </Form>
      </Formik>
      <p>Don't have an account? Sing Up</p>
    </>
  );
}

export default SignIn;
