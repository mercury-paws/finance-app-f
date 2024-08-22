import WaterItem from "../WaterItem/WaterItem";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./WaterList.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { selectDayWater } from "../../../../../redux/water/selectors";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { Scrollbar } from "swiper/modules";
// import "swiper/modules/scrollbar/scrollbar.min.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWaterDay } from "../../../../../redux/water/operations";
import { getMonthNameByIndex } from "../../../../../constants/constants";
import { useMemo } from "react";

function WaterList(currentMonth, chosenDay, currentYear, chosenDate) {
  // const foundWaterDayData = useSelector(selectDayWater);

  const foundWaterDayData = useSelector(selectDayWater);
  // const dispatch = useDispatch();

  // const currentDay = useMemo(
  //   () => ({
  //     day: currentMonth.chosenDay,
  //     month: currentMonth.currentMonth,
  //     // year: currentMonthYear.year,
  //   }),
  //   [currentMonth.chosenDay, currentMonth]
  // );

  // console.log("currentDay", currentDay);

  // Fetch data whenever currentDay changes
  // useEffect(() => {
  //   dispatch(fetchWaterDay());
  // }, [dispatch, chosenDate]);

  return (
    <>
      <Swiper
        spaceBetween={10}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        modules={[Scrollbar]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {foundWaterDayData.map((data) => (
          <SwiperSlide key={data._id}>
            <WaterItem ml={data.ml} time={data.time} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default WaterList;
