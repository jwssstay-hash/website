"use client";

import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export interface Carousel_006Props {
  images: { src: string; alt: string; title?: string }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

export const Carousel_006 = ({
  images,
  className = "",
  autoplay = false,
  loop = true,
  showPagination = true,
}: Carousel_006Props) => {
  return (
    <div className={`relative w-full ${className}`}>
      <style>{`
        .mobile-carousel .swiper-slide {
          width: 85%;
          height: 300px;
          transition: transform 0.3s ease;
        }
        @media (min-width: 640px) {
          .mobile-carousel .swiper-slide {
            width: 60%;
            height: 400px;
          }
        }
        .mobile-carousel .swiper-pagination-bullet {
          background-color: #2a3827 !important;
          opacity: 0.3;
          transition: all 0.3s ease;
        }
        .mobile-carousel .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
      <div className="w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          observer={true}
          observeParents={true}
          autoplay={
            autoplay
              ? { delay: 3000, disableOnInteraction: false }
              : false
          }
          pagination={
            showPagination
              ? { clickable: true }
              : false
          }
          className="mobile-carousel !pb-12"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-full overflow-hidden rounded-xl shadow-lg">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
