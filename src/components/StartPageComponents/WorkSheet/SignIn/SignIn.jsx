import { Formik, Form, Field } from "formik";
import css from "./SignIn.module.css";
function SignIn() {
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field className={css.field} type="email" name="email" />
          <Field className={css.field} type="text" name="password" />
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
