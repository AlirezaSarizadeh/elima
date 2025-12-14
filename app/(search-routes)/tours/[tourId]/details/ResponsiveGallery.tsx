"use client";

import React from "react";
import Image from "next/image";

// ایمپورت‌های مربوط به Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// داده‌های نمونه (لینک عکس‌ها را با عکس‌های واقعی خود جایگزین کنید)
const images = [
  // عکس‌های کوچک (سمت چپ در دسکتاپ)
  { id: 1, src: "/images/img1.png", alt: "White Building" },
  { id: 2, src: "/images/img2.png", alt: "Qutub Minar" },
  { id: 3, src: "/images/img3.png", alt: "India Gate" },
  { id: 4, src: "/images/img4.png", alt: "Red Fort" },
  // عکس بزرگ اصلی (سمت راست در دسکتاپ - تاج محل)
  { id: 5, src: "/images/img1.png", alt: "Taj Mahal", isMain: true },
];

export default function ResponsiveGallery() {
  // جدا کردن عکس اصلی از بقیه برای چیدمان دسکتاپ
  const mainImage = images.find((img) => img.isMain);
  const gridImages = images.filter((img) => !img.isMain);

  return (
    <div className="w-full max-w-7xl mx-auto px-0 py-6" dir="rtl">
      
      {/* ------------------------------------------- */}
      {/* نمای دسکتاپ (Hidden on Mobile) */}
      {/* ------------------------------------------- */}
      <div className="hidden md:flex h-[500px] gap-4">
        
        {/* سمت چپ: گرید 4 تایی */}
        <div className="w-1/2 grid grid-cols-2 gap-4">
          {gridImages.map((img) => (
            <div key={img.id} className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* سمت راست: عکس بزرگ */}
        {mainImage && (
          <div className="w-1/2 relative rounded-3xl overflow-hidden group">
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority // چون بزرگترین عکس است بهتر است زود لود شود
            />
             {/* سایه روی عکس (اختیاری برای زیبایی) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
          </div>
        )}
      </div>

      {/* ------------------------------------------- */}
      {/* نمای موبایل (Swiper - Visible on Mobile Only) */}
      {/* ------------------------------------------- */}
      <div className="md:hidden block w-full h-[300px]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={15}
          slidesPerView={1.2} // قسمتی از اسلاید بعدی دیده شود
          centeredSlides={true}
          loop={true}
          pagination={{ clickable: true }}
          className="w-full h-full rounded-2xl"
        >
          {/* برای موبایل همه عکس‌ها را در اسلایدر می‌گذاریم */}
          {[mainImage, ...gridImages].filter(Boolean).map((img: any) => (
            <SwiperSlide key={img.id} className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}