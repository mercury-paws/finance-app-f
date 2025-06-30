// feedbackSchema.js
import * as Yup from "yup";

export const FeedbackSchema = Yup.object().shape({
  time: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Must be a valid time in the format HH:MM"
    )
    .required("Required"),
  note: Yup.string()
    .matches(/^[a-zA-Z0-9\s.,!?'"()-]*$/, "Must be a valid spent destination")
    .required("Required"),
  spent: Yup.string()
    .required("Required")
    .matches(/^\d+$/, "Must be a number")
    .test("minCheck", "Too small!", (value) => parseInt(value, 10) >= 1)
    .test("maxCheck", "Too much!", (value) => parseInt(value, 10) <= 50000),
  details: Yup.string()
    .max(150, "Too long! Max 150 characters.")
    .matches(/^[a-zA-Z0-9\s.,!?'"()-]*$/, "Invalid characters detected.")
    .notRequired(),
});

export const FeedbackChartSchema = Yup.object().shape({
  year: Yup.string()
    .matches(/^(19|20)\d{2}$/, "Year must be a valid")
    .required("Required"),
  note: Yup.string()
    .matches(/^[a-zA-Z0-9\s.,!?'"()-]*$/, "Must be a valid spent desitnation")
    .required("Required"),
});

export const FeedbackSettingSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Too short")
    .max(20, "Too long")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  photo: Yup.mixed().required("Photo is required"),
  planToSpend: Yup.number()
    .typeError("Must be a number")
    .min(1, "Too low")
    .max(55000, "Too high")
    .required("Required"),
  note: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("Required"),
      value: Yup.number()
        .typeError("Must be a number")
        .min(1, "Too low")
        .max(25000, "Too high")
        .required("Required"),
    })
  ),
});

export const FeedbackInSchema = Yup.object().shape({
  income: Yup.string()
    .required("Required")
    .matches(/^\d+$/, "Must be a number")
    .test("minCheck", "Too small!", (value) => parseInt(value, 10) >= 1)
    .test("maxCheck", "Too much!", (value) => parseInt(value, 10) <= 100000),
});
