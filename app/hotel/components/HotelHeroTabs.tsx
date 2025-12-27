"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, LocationOn } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Title from "../../../components/ui/Title/Title";
import { Button } from "@mui/material";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";

// داده‌های نمونه (در واقعیت از API می‌گیرید)
const hotelsData = {
  mashhad: [
    {
      id: 1,
      name: "هتل درویشی",
      stars: 5,
      location: "مشهد، خیابان امام رضا",
      image: "/images/h-1.webp",
      price: "۳,۵۰۰,۰۰۰",
    },
    {
      id: 2,
      name: "هتل قصر طلایی",
      stars: 5,
      location: "مشهد، میدان بسیج",
      image: "/images/h-2.webp",
      price: "۴,۲۰۰,۰۰۰",
    },
    {
      id: 3,
      name: "هتل الماس ۲",
      stars: 5,
      location: "مشهد، خیابان امام رضا",
      image: "/images/h-3.webp",
      price: "۳,۸۰۰,۰۰۰",
    },
    {
      id: 4,
      name: "هتل جواد",
      stars: 4,
      location: "مشهد، خیابان طبرسی",
      image: "/images/h-4.webp",
      price: "۲,۱۰۰,۰۰۰",
    },
    {
      id: 5,
      name: "هتل جواد",
      stars: 4,
      location: "مشهد، خیابان طبرسی",
      image: "/images/h-4.webp",
      price: "۲,۱۰۰,۰۰۰",
    },
    {
      id: 6,
      name: "هتل جواد",
      stars: 4,
      location: "مشهد، خیابان طبرسی",
      image: "/images/h-4.webp",
      price: "۲,۱۰۰,۰۰۰",
    },
  ],
  kish: [
    {
      id: 7,
      name: "هتل داریوش",
      stars: 5,
      location: "کیش، میدان داریوش",
      image: "/images/h-5.webp",
      price: "۵,۵۰۰,۰۰۰",
    },
    {
      id: 8,
      name: "هتل مارینا پارک",
      stars: 5,
      location: "کیش، بلوار مرجان",
      image: "/images/h-6.webp",
      price: "۶,۲۰۰,۰۰۰",
    },
    {
      id: 9,
      name: "هتل ویدا",
      stars: 5,
      location: "کیش، میدان سنایی",
      image: "/images/h-1.webp",
      price: "۴,۸۰۰,۰۰۰",
    },
  ],
  tehran: [
    {
      id: 10,
      name: "هتل اسپیناس پالاس",
      stars: 5,
      location: "تهران، سعادت آباد",
      image: "/images/h-2.webp",
      price: "۸,۵۰۰,۰۰۰",
    },
    {
      id: 11,
      name: "هتل آزادی",
      stars: 5,
      location: "تهران، بزرگراه چمران",
      image: "/images/h-3.webp",
      price: "۵,۱۰۰,۰۰۰",
    },
  ],
};

const cities = [
  { id: "mashhad", label: "هتل‌های مشهد" },
  { id: "kish", label: "هتل‌های کیش" },
  { id: "tehran", label: "هتل‌های تهران" },
  { id: "shiraz", label: "هتل‌های شیراز" },
];

export default function HotelHeroTabs() {
  const [activeTab, setActiveTab] = useState<"mashhad" | "kish" | "tehran">(
    "mashhad"
  );

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section className="py-10 max-w-7xl px-0 mx-auto">
      {/* هدر بالا */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-1 max-w-7xl px-4 mx-auto">
        <Title
          title="بهترین هتل های استان ها"
          icon={<img src="/images/textalign-right.png" alt="icon" />}
        />

        {/* مشاهده همه */}
        <Link href="#" className="text-sm ms-auto md:me-4 text-blue-500">
          مشاهده همه
        </Link>

        {/* Navigation Buttons - فقط از md به بالا */}
        <div className="hidden md:flex items-center gap-2">
          <button
            ref={(node) => setNextEl(node)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <img src="/images/arrow-right.png" className="w-5" alt="next" />
          </button>

          <button
            ref={(node) => setPrevEl(node)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <img src="/images/arrow-left.png" className="w-5" alt="prev" />
          </button>
        </div>
      </div>

      {/* تب‌ها */}
      <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide mb-4 px-4">
        {cities.map((city) => (
          <Button
            key={city.id}
            onClick={() => setActiveTab(city.id as any)}
            variant="text"
            disableRipple
            className="!shrink-0"
            sx={{
              minWidth: "auto",                  // ✅ جلوگیری از دکمه‌های خیلی عریض
              px: { xs: 1.75, sm: 2.5 },         // ✅ پدینگ کمتر روی موبایل
              py: { xs: 0.75, sm: 1 },
              fontWeight: 500,
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              whiteSpace: "nowrap",
              borderRadius: "12px",
              border: "1px solid",
              transition: "all 0.2s ease-in-out",
              ...(activeTab === city.id
                ? {
                    bgcolor: "#dbeafe",
                    color: "#2563eb",
                    borderColor: "#dbeafe",
                    "&:hover": {
                      bgcolor: "#bfdbfe",
                      borderColor: "#bfdbfe",
                    },
                  }
                : {
                    bgcolor: "#fff",
                    color: "#374151",
                    borderColor: "#e5e7eb",
                    "&:hover": {
                      bgcolor: "#f9fafb",
                      borderColor: "#d1d5db",
                    },
                  }),
            }}
          >
            {city.label}
          </Button>
        ))}
      </div>

      {/* --- Slider Section --- */}
      <div className="bg-white px-4">
        <Swiper
          key={activeTab}
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.5 },
          }}
          navigation={{
            prevEl,
            nextEl,
          }}
          className="pt-2"
        >
          {(hotelsData[activeTab] || []).map((hotel) => (
            <SwiperSlide key={hotel.id}>
              <div className="group relative h-64 md:h-[380px] rounded-3xl overflow-hidden cursor-pointer border border-gray-200">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 flex flex-col items-center">
                  <span className="text-[10px] text-gray-400">شروع از</span>
                  <span className="text-blue-600">{hotel.price}</span>
                </div>
                <div className="absolute bottom-0 right-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex mb-2 text-yellow-400">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} fontSize="small" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-gray-300 text-sm mb-4">
                    <LocationOn fontSize="small" />
                    <span className="truncate">{hotel.location}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
