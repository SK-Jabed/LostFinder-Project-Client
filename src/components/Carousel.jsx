// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

// Import Carousel Images
import bgimg2 from "../assets/slider-images/2147635443.jpg";
import bgimg4 from "../assets/slider-images/slider3.jpg";
import bgimg1 from "../assets/slider-images/2148256061.jpg";
import bgimg3 from "../assets/slider-images/2148232319.jpg";

export default function Carousel() {
  return (
    <div className="w-11/12 container pb-10 pt-4 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-md"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text="Lost something? Let’s help you find it quickly!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text="Found an item? Help reunite it with its owner!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text="Your trusted platform for lost and found connections!"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg4}
            text="Discover, report, and reunite lost belongings effortlessly!"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}