const getMaxDaysInMonth = (month, year) => {
  const monthIndex = {
    January: 31,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  if (month === "February") {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }

  return monthIndex[month] || 0; // Return 0 if the month is invalid
};

let days = Array.from(
  { length: getMaxDaysInMonth("February", 2025) },
  (_, i) => i + 1
);

export default days;
