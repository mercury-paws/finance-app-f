import css from "./Settings.module.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useId, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/auth/selectors";
import ChartModal from "../../../Modals/ChartModal/ChartModal";
import FormikComponent from "../../../FormFields/Formik/FormikComponent";
import { selectWater } from "../../../../redux/water/selectors";

const now = new Date();

function Settings({ year, note }) {
  const user = useSelector(selectUser);

  const noteOptions = user.note ? [...Object.keys(user.note), "total"] : [];

  const [selectedData, setSelectedData] = useState(null);
  const [showChartModal, setShowChartModal] = useState(false);

  const initialValues = {
    year: year || "",
    note: note || "",
  };

  const handleSubmit = async (values, actions) => {
    const formattedValues = {
      ...values,
      year: values.year.toString(),
      note: values.note.toString(),
    };

    try {
      setSelectedData(formattedValues);
      setShowChartModal(true);
    } catch (error) {
      error("Error. Please try again later");
    }
  };

  const yearFieldId = useId();
  const noteFieldId = useId();

  return (
    <>
      <FormikComponent
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        yearFieldId={yearFieldId}
        noteFieldId={noteFieldId}
        options={noteOptions}
        labelYear={"Year:"}
        labelDestination={"Destination:"}
        nameYear={"year"}
        nameNote={"note"}
      />

      {showChartModal && (
        <ChartModal
          year={selectedData.year}
          note={selectedData.note}
          isOpen={showChartModal}
          onRequestClose={() => setShowChartModal(false)}
        />
      )}
    </>
  );
}

export default Settings;
