import { useId } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./SignUp.module.css";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
// import MainPic from "../../components/StartPageComponents/MainPic/MainPic";

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  repeatPassword: Yup.string().min(6, "Too Short!").required("Required"),
});

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

function SignUp() {
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  let dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    if (values.password !== values.repeatPassword) {
      setError("Passwords do not match");
      setSubmitted("");
    } else {
      setError("");
      setSubmitted("Passwords match, form submitted");
      let newUser = {
        email: values.email,
        password: values.password,
      };
      // console.log(newUser);
      dispatch(register(newUser));
      actions.resetForm();
    }
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPasswordFieldId = useId();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div className={css.signUpForm}>
      <h2>Sign Up</h2>
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
          <div>
            <label htmlFor={repeatPasswordFieldId}>Repeat password</label>
            <Field
              className={css.field}
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              id={repeatPasswordFieldId}
            />
            <div onClick={toggleShowRepeatPassword}>
              {showRepeatPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <ErrorMessage name="repeatPassword" component="span" />
          </div>
          <button className={css.btn} type="submit">
            Sign Up
          </button>
          {error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : (
            <div style={{ color: "green" }}>{submitted}</div>
          )}
        </Form>
      </Formik>
      <p>
        Already have an account? <NavLink to="/signin">Sing In</NavLink>{" "}
      </p>
    </div>
  );
}

export default SignUp;
