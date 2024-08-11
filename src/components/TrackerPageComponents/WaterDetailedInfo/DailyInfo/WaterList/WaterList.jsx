import WaterItem from "../WaterItem/WaterItem";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./WaterList.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/swiper-bundle.css";
import { Scrollbar } from "swiper/modules";
// import "swiper/modules/scrollbar/scrollbar.min.css";

function WaterList() {
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    async function fetchDayData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/water-app/water/?year=2024&day=1&month=February",
          {
            headers: {
              Authorization: `Bearer m0P5QVWcIlOutiIUU/Hk6R6q5aJNjmtEdfjNow+O`,
            },
          }
        );
        setDayData(response.data.data.items);
        console.log(response.data.data.items);
      } catch (error) {
        console.log("Error fetching day data:", error);
      }
    }

    fetchDayData();
  }, []);

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
        {dayData.map((data) => (
          <SwiperSlide key={data._id}>
            <WaterItem ml={data.ml} time={data.time} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default WaterList;
