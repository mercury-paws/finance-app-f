import { useEffect, useState } from "react";

function ChooseDate() {
  const [currentDate, setCurrentdate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = { year: "numeric", day: "numeric", month: "long" };
    const dateParts = date.toLocaleDateString("en-US", options).split(" ");

    // Manually insert the comma between the month and day
    const formattedDate = `${dateParts[1]} ${dateParts[0]}`;
    setCurrentdate(formattedDate);
  }, []);

  return (
    <>
      <p>{currentDate}</p>
    </>
  );
}

export default ChooseDate;
