import { useDispatch, useSelector } from "react-redux";
import css from "./HappyCustomers.module.css";
import { useEffect } from "react";
import { findPhotos } from "../../../../redux/auth/operations";
import { selectFindPhotos } from "../../../../redux/auth/selectors";

function HappyCustomers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findPhotos());
  }, [dispatch]);
  const photos = useSelector(selectFindPhotos);

  // Fisher-Yates shuffle
  // function shuffleArray(array) {
  //   const shuffled = array.slice(); // Create a copy of the array to avoid modifying the original
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  //   }
  //   return shuffled;
  // }

  return (
    <div className={css.customersContainer}>
      <div className={css.customers}>
        {photos && photos.length > 0 ? (
          <ul className={css.customerImgList}>
            {/* {shuffleArray(photos).slice(0, 3).map((photo) => ( вместо 1 строчки ниже*/}
            {photos.map((photo) => (
              <li key={photo._id}>
                <img
                  src={photo.photo}
                  alt={`Customer ${photo._id}`}
                  className={css.customerImgItem}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
        <h4 className={css.header}>
          Our <span className={css.stroke}>happy</span> customers
        </h4>
      </div>
    </div>
  );
}

export default HappyCustomers;

{
  /* <ul className={css.yearList}>
        {days.map((day) => {
          const waterAmount = waterDataByDay[day] || 0;

          return (
            <li key={day}>
              <CalendarItem
                day={day}
                chosenDate={chosenDate}
                waterAmount={waterAmount}
                currentMonthYear={currentMonthYear}
              />
            </li> */
}
