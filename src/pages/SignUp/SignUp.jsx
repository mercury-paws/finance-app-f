import { useId } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./SignUp.module.css";
import { ErrorMessage } from "formik";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
import VerifyEmail from "../../components/Modals/Verify/VerifyEmail";

// import MainPic from "../../components/StartPageComponents/MainPic/MainPic";

const FeedbackSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email!")
    .required("Email is required"),
  password: Yup.string().min(6, "Too Short!").required("Password is required"),
  repeatPassword: Yup.string()
    .min(6, "Too Short!")
    .required("Repeat the password"),
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
  const [modalVerifyOpen, setModalVerifyOpen] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    if (values.password !== values.repeatPassword) {
      setError("Passwords do not match");
      setSubmitted("");
    } else {
      setError("");
      setSubmitted("Passwords match");
      let newUser = {
        email: values.email,
        password: values.password,
      };
      // console.log(newUser);
      dispatch(register(newUser))
        .unwrap()
        .then((data) => {
          actions.resetForm();
          setModalVerifyOpen(true);
          setSubmitted("");
          setError("");
        })
        .catch((error) => {
          toast.error("Login failed!");
          console.error("Login failed:", error);
          // actions.resetForm();
        });

      // actions.resetForm();
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
      <h2 className={css.signUp}>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form className={css.form}>
          <div className={css.passField}>
            <label htmlFor={emailFieldId} className={css.label}>
              Email
            </label>
            <Field
              className={css.field}
              type="email"
              name="email"
              id={emailFieldId}
            />
            <ErrorMessage
              className={css.errorMessage}
              name="email"
              component="span"
            />
          </div>
          <div className={css.passField}>
            <label htmlFor={passwordFieldId} className={css.label}>
              Password
            </label>
            <Field
              className={css.field}
              type={showPassword ? "text" : "password"}
              name="password"
              id={passwordFieldId}
            />
            <div onClick={toggleShowPassword}>
              {showPassword ? (
                <FaEye className={css.faIcon} />
              ) : (
                <FaEyeSlash className={css.faIcon} />
              )}
            </div>

            <ErrorMessage
              name="password"
              component="span"
              className={css.errorMessage}
            />
          </div>
          <div className={css.passField}>
            <label htmlFor={repeatPasswordFieldId} className={css.label}>
              Repeat password
            </label>
            <Field
              className={css.field}
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              id={repeatPasswordFieldId}
            />
            <div onClick={toggleShowRepeatPassword}>
              {showRepeatPassword ? (
                <FaEye className={css.faIcon} />
              ) : (
                <FaEyeSlash className={css.faIcon} />
              )}
            </div>
            <ErrorMessage
              className={css.errorMessage}
              name="repeatPassword"
              component="span"
            />
          </div>
          <div
            style={{
              position: "relative",
            }}
          >
            {error ? (
              <div
                style={{
                  color: "red",
                  position: "absolute",
                  top: "0px",
                  left: "10px",
                }}
              >
                {error}
              </div>
            ) : (
              <div
                style={{
                  color: "green",
                  position: "absolute",
                  top: "0px",
                  left: "10px",
                }}
              >
                {submitted}
              </div>
            )}
          </div>
          <button className={css.btn} type="submit">
            Sign Up
          </button>

          <Toaster />
        </Form>
      </Formik>
      <p className={css.offer}>
        Already have an account?{" "}
        <NavLink to="/signin" className={css.signIn}>
          Sign In
        </NavLink>
      </p>
      {modalVerifyOpen && (
        <VerifyEmail isOpen={modalVerifyOpen} setIsOpen={setModalVerifyOpen} />
      )}
    </div>
  );
}

export default SignUp;
