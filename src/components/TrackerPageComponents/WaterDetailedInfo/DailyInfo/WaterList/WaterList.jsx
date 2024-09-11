import WaterItem from "../WaterItem/WaterItem";
import { useEffect } from "react";
import css from "./WaterList.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { selectDayWater } from "../../../../../redux/water/selectors";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWaterDay } from "../../../../../redux/water/operations";

function WaterList({ currentMonth, chosenDay, currentYear, chosenDate }) {
  // added {} dunno why was working earlier
  const foundWaterDayData = useSelector(selectDayWater);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chosenDay && currentMonth && currentYear) {
      dispatch(
        fetchWaterDay({
          day: chosenDay,
          month: currentMonth,
          year: currentYear,
        })
      ).unwrap();
    }
  }, [chosenDay, currentMonth, currentYear, dispatch]);

  return (
    <div className={css.containerDay}>
      {foundWaterDayData.length > 0 ? (
        <div className={css.swiperContainer}>
          <Swiper
            spaceBetween={10}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            modules={[Scrollbar]}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {foundWaterDayData.map((data) => (
              <SwiperSlide key={data._id}>
                <WaterItem
                  ml={data.ml}
                  time={data.time}
                  id={data._id}
                  currentMonth={currentMonth}
                  chosenDay={chosenDay}
                  currentYear={currentYear}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className={css.noData}>No data yet</p>
      )}
    </div>
  );
}

export default WaterList;
