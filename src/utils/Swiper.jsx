import { useEffect, useState } from "react";
import img1 from "../assets/img/comp/1.jpg";
import img2 from "../assets/img/comp/2.jpg";
import img3 from "../assets/img/comp/3.jpg";
import img4 from "../assets/img/comp/4.jpg";
import img5 from "../assets/img/comp/5.jpg";
import img6 from "../assets/img/comp/6.jpg";

const images = [
  `url(${img1})`,
  `url(${img2})`,
  `url(${img3})`,
  `url(${img4})`,
  `url(${img5})`,
  `url(${img6})`,
];

function useBackgroundSwiper() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    backgroundImage: images[bgIndex],
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 1s ease-in-out",
  };
}

export default useBackgroundSwiper;
