function CalendarItem({ day, chosenDate }) {
  const chooseDate = () => {
    chosenDate(day);
  };

  return (
    <div onClick={chooseDate}>
      <p>{day}</p>
      <p>100%</p>
    </div>
  );
}

export default CalendarItem;
