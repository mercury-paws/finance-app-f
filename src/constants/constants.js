export const monthDays = {
  January: 31,
  February: 28,
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

export const getMaxDaysInMonth = (month, year) => {
  if (month === "February") {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }

  return monthDays[month] || 0;
};

const monthNames = Object.keys(monthDays);

export const getMonthNameByIndex = (index) => {
  if (index < 0 || index >= monthNames.length) {
    return null;
  }
  return monthNames[index];
};

export function getMonthIndex(monthName) {
  // Convert the object keys to an array
  const monthNames = Object.keys(monthDays);
  // Find the index of the month name
  return monthNames.indexOf(monthName);
}

export const calculateFormattedDate = (monthIndex, year) => {
  const date = new Date();

  const month =
    typeof monthIndex !== "undefined" && monthIndex !== date.getMonth()
      ? monthIndex
      : date.getMonth();

  if (typeof year === "undefined") {
    year = date.getFullYear();
  }

  if (typeof monthIndex === "undefined") {
    monthIndex = date.getMonth();
  }

  date.setFullYear(year);
  date.setMonth(month);

  const options = { year: "numeric", day: "numeric", month: "long" };
  const dateParts = date.toLocaleDateString("en-US", options).split(" ");

  let formattedDate = {
    day: `${dateParts[1].replace(",", "")}`,
    month: `${dateParts[0]}`,
    year: `${dateParts[2]}`,
  };

  return formattedDate;
};

export function getCurrentTimeString() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
}

export const selectYear = [
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
];

export const ICON_COLOR = "green";
