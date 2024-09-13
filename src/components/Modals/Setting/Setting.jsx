import css from "./Setting.module.css";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useId } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";
import { selectUser } from "../../../redux/auth/selectors";
import { FaUpload } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

Modal.setAppElement("#root");

const FeedbackSchema = Yup.object().shape({
  picked: Yup.string().required("Required"),
  name: Yup.string()
    .min(4, "Too short")
    .max(20, "Too long")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  weight: Yup.number("Must be a valid number!")
    .min(25, "Too short")
    .max(250, "Too long")
    .required("Required"),
  time: Yup.number()
    .min(0, "Must be a valid time from 0 to 24 hours")
    .max(24, "Must be a valid time from 0 to 24 hours")
    .required("Required"),
  howMuch: Yup.number("Must be a valid number!")
    .min(0.5, "Too little")
    .max(5, "Must be a valid time from 0 to 24 hours")
    .required("Required"),
  photo: Yup.mixed().required("Photo is required"),
});

function Setting({ isOpen, onRequestClose }) {
  const [waterToDrink, setWaterToDrink] = useState();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const initialValues = {
    picked: user.gender || "",
    name: user.name || "",
    email: user.email || "",
    weight: user.weight || "",
    time: user.sportTime || "",
    howMuch: user.waterVolume || "",
    photo: user.photo || "",
  };

  const FormValuesDisplay = () => {
    const { values } = useFormikContext();

    useEffect(() => {
      if (values.picked) {
        const timer = setTimeout(() => {
          let calculatedWater = 0;
          if (values.picked === "female") {
            calculatedWater =
              Number(values.weight) * 0.03 + Number(values.time) * 0.4;
          } else if (values.picked === "male") {
            calculatedWater =
              Number(values.weight) * 0.04 + Number(values.time) * 0.6;
          }
          setWaterToDrink(calculatedWater);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [values.picked, values.weight, values.time]); // Depend on values to recalculate
  };

  const handleSubmit = (values) => {
    const formattedValues = {
      gender: values.picked.toLowerCase(),
      name: values.name,
      email: values.email,
      weight: values.weight,
      sportTime: values.time,
      waterVolume: values.howMuch,
      photo: values.photo,
    };
    dispatch(
      updateUser({
        email: values.email,
        formattedValues,
      })
    );
    onRequestClose();
  };

  const pickedWomanFieldId = useId();
  const pickedManFieldId = useId();
  const nameFieldId = useId();
  const emailFieldId = useId();
  const weightFieldId = useId();
  const timeFieldId = useId();
  const howMuchFieldId = useId();
  const photoFieldId = useId();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="delete"
      overlayClassName={css.overlay}
      className={css.modalContent}
    >
      <div className={css.settingContainer}>
      <div className={css.closeIcon}>
            <AiOutlineClose onClick={onRequestClose} />
          </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={FeedbackSchema}
        >
          {({ setFieldValue }) => (
            <Form encType="multipart/form-data">
              <h1 className={css.settingsHeader}>Settings</h1>
              <div className={css.pic}>
                {user.photo ? (
                  <img
                    className={css.userPhoto}
                    src={user.photo}
                    alt={`Photo of ${user.name}`}
                  />
                ) : (
                  "No photo"
                )}
                <label htmlFor={photoFieldId} className={css.picLabel}>
                  {" "}
                  <FaUpload /> Upload the photo
                </label>
                <input
                  id={photoFieldId}
                  name="photo"
                  type="file"
                  className={css.visuallyHidden}
                  onChange={(event) => {
                    setFieldValue("photo", event.target.files[0]);
                    console.log(event.target.files[0]);
                  }}
                />
              </div>
              <div className={css.flexContainer}>
                <div className={css.leftPart}>
                  <div id="my-radio-group" className={css.label}>
                    Your gender identity
                  </div>
                  <div role="group" className={css.genderBlock}>
                    <label htmlFor={pickedWomanFieldId} className={css.value}>
                      <Field
                        id={pickedWomanFieldId}
                        type="radio"
                        name="picked"
                        value="female"
                        className={css.radio}
                      />
                      Woman
                    </label>
                    <label htmlFor={pickedManFieldId} className={css.value}>
                      <Field
                        id={pickedManFieldId}
                        type="radio"
                        name="picked"
                        value="male"
                        className={css.radio}
                      />
                      Man
                    </label>
                    <ErrorMessage name="picked" component="span" />
                  </div>
                  <div className={css.fillInForm}>
                    <label htmlFor={nameFieldId} className={css.label}>
                      Name
                    </label>
                    <Field
                      className={css.field}
                      type="text"
                      name="name"
                      id={nameFieldId}
                    />
                    <ErrorMessage name="name" component="span" />
                  </div>
                  <div className={css.fillInForm}>
                    <label htmlFor={emailFieldId} className={css.label}>
                      Email
                    </label>
                    <Field
                      className={css.field}
                      type="email"
                      name="email"
                      id={emailFieldId}
                      readOnly
                    />
                    <ErrorMessage name="email" component="span" />
                  </div>
                  <div className={css.fillInForm}>
                    <label htmlFor={weightFieldId} className={css.label}>
                      Your weight in kilograms:
                    </label>
                    <Field
                      className={css.field}
                      type="text"
                      name="weight"
                      id={weightFieldId}
                    />
                    <ErrorMessage name="weight" component="span" />
                  </div>
                  <div className={css.fillInForm}>
                    <label htmlFor={timeFieldId} className={css.label}>
                      The time of active participation in sports:
                    </label>
                    <Field
                      className={css.field}
                      type="text"
                      name="time"
                      id={timeFieldId}
                    />
                    <ErrorMessage name="time" component="span" />
                  </div>
                </div>
                <div className={css.addInfo}>
                  <h5 className={css.dailyNorma}>My daily norma</h5>
                  <p className={css.forWhom}>For woman:</p>
                  <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
                  <p className={css.forWhom}>For man:</p>
                  <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
                  <p className={css.calculationInfo}>
                    <span>*</span> V is the volume of the water norm in liters
                    per day, M is your body weight, T is the time of active
                    sports, or another type of activity commensurate in terms of
                    loads (in the absence of these, you must set 0)
                  </p>
                  <p className={css.requiredTime}>
                    The required amount of water in liters per day:{" "}
                    {waterToDrink ? (
                      <span style={{ color: "#9be1a0", fontWeight: "700" }}>
                        {Math.round(waterToDrink * 10) / 10}
                      </span>
                    ) : (
                      "__"
                    )}
                  </p>
                  <div className={css.howMuchBlock}>
                    <label className={css.howMuchWill} htmlFor={howMuchFieldId}>
                      Write down how much water you will drink:
                    </label>
                    <Field
                      className={css.field}
                      type="text"
                      name="howMuch"
                      id={howMuchFieldId}
                    />
                    <ErrorMessage name="howMuch" component="span" />
                  </div>
                </div>
              </div>
              <FormValuesDisplay />
              <button className={css.btn} type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

export default Setting;
