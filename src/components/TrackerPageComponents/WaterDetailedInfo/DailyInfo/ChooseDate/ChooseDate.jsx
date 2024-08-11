import { useEffect, useState } from "react";
import { calculateFormattedDate } from "../../../../../constants/constants";

function ChooseDate() {
  const [currentDate, setCurrentdate] = useState("");

  useEffect(() => {
    let date = calculateFormattedDate();
    setCurrentdate(`${date.day} ${date.month}`);
  }, []);

  return (
    <>
      <p>{currentDate}</p>
    </>
  );
}

export default ChooseDate;
