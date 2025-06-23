import css from "./Setting.module.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useState, useId } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/auth/operations";
import { selectUser } from "../../../redux/auth/selectors";
import { FaUpload } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { FeedbackSettingSchema as FeedbackSchema } from "../../../validation/Schemas";

Modal.setAppElement("#root");

function Setting({ isOpen, onRequestClose }) {
  const [waterToDrink, setWaterToDrink] = useState();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    note: user.note
      ? Object.entries(user.note).map(([key, value]) => ({
          key,
          value,
        }))
      : [{ key: "", value: "" }],
    photo: user.photo || "",
    planToSpend: user.planToSpend || "",
  };

  const handleSubmit = (values) => {
    const formattedNote = Object.fromEntries(
      values.note.map(({ key, value }) => [key, Number(value)])
    );
    const formattedValues = {
      name: values.name,
      email: values.email,
      note: formattedNote,
      photo: values.photo,
      planToSpend: values.planToSpend,
    };
    dispatch(
      updateUser({
        email: values.email,
        formattedValues,
      })
    );
    onRequestClose();
  };

  const nameFieldId = useId();
  const emailFieldId = useId();
  const planToSpendFieldId = useId();
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
                  }}
                />
              </div>
              <div className={css.flexContainer}>
                <div className={css.leftPart}>
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
                    <label htmlFor={planToSpendFieldId} className={css.label}>
                      Plan to Spend
                    </label>
                    <Field
                      className={css.field}
                      type="number"
                      name="planToSpend"
                      id={planToSpendFieldId}
                    />
                    <ErrorMessage name="planToSpend" component="span" />
                  </div>
                </div>
                <div className={css.rightPart}>
                  <FieldArray name="note">
                    {({ push, remove, form }) => (
                      <div className={css.spentDestinationForm}>
                        <label className={css.label}>Spent destinations:</label>
                        {form.values.note.map((item, index) => (
                          <div className={css.fillInFormC} key={index}>
                            <Field
                              className={css.fieldC}
                              name={`note[${index}].key`}
                              placeholder="Category"
                            />
                            <ErrorMessage
                              name={`note[${index}].key`}
                              component="span"
                            />

                            <Field
                              className={css.fieldC}
                              name={`note[${index}].value`}
                              placeholder="Amount"
                              type="number"
                            />
                            <ErrorMessage
                              name={`note[${index}].value`}
                              component="span"
                            />

                            <button
                              type="button"
                              className={css.btnC}
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className={css.btnC}
                          onClick={() => push({ key: "", value: "" })}
                        >
                          Add More
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>

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
