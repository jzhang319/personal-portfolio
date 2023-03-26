import { useCallback, useRef, useState, useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Blog } from "../elements";
import { Spinner } from "../utils";

const BlogSection = ({ posts }) => {
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (!mounted)
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );
  if (!posts) return null;

  return (
    <div className="swiper-holder">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{
          delay: 5000,
        }}
        centerInsufficientSlides={true}
        ref={sliderRef}
        breakpoints={{
          320: {
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
        {posts &&
          posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className="slider-item">
                <Blog post={post} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <button className="swiper-button-prev" onClick={handlePrev}></button>
      <button className="swiper-button-next" onClick={handleNext}></button>
    </div>
  );
};

export default BlogSection;
