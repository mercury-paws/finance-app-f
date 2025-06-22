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
