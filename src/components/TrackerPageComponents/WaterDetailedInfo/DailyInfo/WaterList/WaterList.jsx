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

function WaterList() {
  const foundWaterDayData = useSelector(selectDayWater);

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
