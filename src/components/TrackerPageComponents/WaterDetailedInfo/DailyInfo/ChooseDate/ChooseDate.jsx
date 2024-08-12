import { useEffect, useState } from "react";
import { calculateFormattedDate } from "../../../../../constants/constants";

function ChooseDate() {
  const [currentDate, setCurrentdate] = useState("");

  useEffect(() => {
    let date = calculateFormattedDate();
    if (date !== new Date()) {
      setCurrentdate(`${date.day} ${date.month}`);
    }
    setCurrentdate("Today");
  }, []);

  return (
    <>
      <p>{currentDate}</p>
    </>
  );
}

export default ChooseDate;
