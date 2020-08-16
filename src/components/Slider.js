import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from "swiper";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import Axios from "axios";

// install Swiper components
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

function Slider() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs?featured=true`
      );
      setFeaturedPosts(res.data);
    };
    fetchData();
  }, []);

  const renderSwiperSlide = featuredPosts.map(
    ({ thumbnail, title, description, id }, i) => {
      return (
        <SwiperSlide key={i}>
          <div className="slider__item">
            <div
              className="slider__item__image"
              style={{
                backgroundImage: `url(${thumbnail.url})`,
              }}
            ></div>
            <h1 className="heading-lg">{title}</h1>
            <p>{description}</p>
            <Link href="/blog/[id]" as={`/blog/${id}`}>
              <a className="btn-secondary btn-secondary--purple">Read More</a>
            </Link>
          </div>
        </SwiperSlide>
      );
    }
  );
  return (
    <Swiper
      spaceBetween={40}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: "2500",
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true, dynamicBullets: true }}
      scrollbar={{ draggable: true }}
      className="slider"
      loop={true}
    >
      {renderSwiperSlide}
    </Swiper>
  );
}

export default Slider;
