"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Close, ArrowForwardIos, ArrowBackIos, GridView } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Zoom, Keyboard, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/thumbs";

// تایپ برای سواپر (جهت جلوگیری از ارورهای تایپ‌اسکریپت)
import type { Swiper as SwiperType } from 'swiper';

const images = [
  { id: 1, src: "/images/img1.png", alt: "White Building" },
  { id: 2, src: "/images/img2.png", alt: "Qutub Minar" },
  { id: 3, src: "/images/img3.png", alt: "India Gate" },
  { id: 4, src: "/images/img4.png", alt: "Red Fort" },
  { id: 5, src: "/images/img1.png", alt: "Taj Mahal", isMain: true },
];

export default function ResponsiveGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  
  // ✅ اصلاح 1: استیت‌های سواپر تامبنیل
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // ✅ اصلاح 2: استفاده از State برای دکمه‌های نویگیشن به جای کلاس CSS
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  const mainImage = images.find((img) => img.isMain);
  const gridImages = images.filter((img) => !img.isMain);
  const allGalleryImages = mainImage ? [mainImage, ...gridImages] : images;

  const openGallery = (imgId: number) => {
    const index = allGalleryImages.findIndex(img => img.id === imgId);
    setInitialSlide(index >= 0 ? index : 0);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    // ریست کردن استیت‌ها هنگام بسته شدن
    setThumbsSwiper(null);
    setPrevEl(null);
    setNextEl(null);
  };

  return (
    <div className="w-full max-w-7xl px-4 mx-auto px-0 py-6" dir="rtl">
      
      {/* ... (بخش گرید دسکتاپ و اسلایدر موبایل بدون تغییر باقی می‌ماند) ... */}
      <div className="hidden md:flex h-[500px] gap-4">
        <div className="w-1/2 grid grid-cols-2 gap-4">
          {gridImages.map((img, index) => (
            <div 
                key={img.id} 
                className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => openGallery(img.id)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              {index === 3 && (
                 <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-100 hover:bg-black/60 transition-all">
                    <GridView fontSize="large" className="mb-2" />
                    <span className="font-bold text-lg">مشاهده همه</span>
                    <span className="text-sm mt-1">({images.length} تصویر)</span>
                 </div>
              )}
            </div>
          ))}
        </div>
        {mainImage && (
          <div className="w-1/2 relative rounded-3xl overflow-hidden group cursor-pointer" onClick={() => openGallery(mainImage.id)}>
            <Image src={mainImage.src} alt={mainImage.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
          </div>
        )}
      </div>

      <div className="md:hidden block w-full h-[300px]">
        <Swiper modules={[Pagination]} spaceBetween={15} slidesPerView={1.2} centeredSlides={true} loop={true} pagination={{ clickable: true }} className="w-full h-full rounded-2xl">
          {allGalleryImages.map((img) => (
            <SwiperSlide key={img.id} className="relative w-full h-full rounded-2xl overflow-hidden" onClick={() => openGallery(img.id)}>
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- مودال گالری --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn">
            
            <button onClick={closeGallery} className="absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all">
                <Close fontSize="large" />
            </button>

            <div className="w-full h-[75vh] md:h-[80vh] relative">
                <Swiper
                    initialSlide={initialSlide}
                    modules={[Navigation, Zoom, Keyboard, Thumbs]}
                    // ✅ اصلاح 3: پاس دادن رفرنس مستقیم دکمه‌ها به جای کلاس CSS
                    navigation={{
                        prevEl,
                        nextEl,
                    }}
                    zoom={true}
                    keyboard={{ enabled: true }}
                    // ✅ اصلاح 4: بررسی ایمنی برای Thumbs (جلوگیری از کرش وقتی null است)
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    spaceBetween={30}
                    slidesPerView={1}
                    className="w-full h-full"
                >
                    {allGalleryImages.map((img) => (
                        <SwiperSlide key={img.id} className="flex items-center justify-center">
                            <div className="swiper-zoom-container w-full h-full flex items-center justify-center p-4">
                                <div className="relative w-full h-full max-w-5xl max-h-full">
                                    <Image src={img.src} alt={img.alt} fill className="object-contain" quality={100} />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* ✅ اصلاح 5: استفاده از ref برای دکمه‌ها */}
                <button ref={(node) => setNextEl(node)} className="absolute top-1/2 left-4 md:left-8 z-50 text-white/50 hover:text-white -translate-y-1/2 p-2">
                    <ArrowBackIos fontSize="large" />
                </button>
                <button ref={(node) => setPrevEl(node)} className="absolute top-1/2 right-4 md:right-8 z-50 text-white/50 hover:text-white -translate-y-1/2 p-2">
                    <ArrowForwardIos fontSize="large" />
                </button>
            </div>

            <div className="w-full h-20 md:h-24 mt-4 px-4 hidden md:block">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Thumbs, FreeMode]}
                    spaceBetween={10}
                    slidesPerView={"auto"}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="gallery-thumbs h-full w-full max-w-3xl"
                >
                     {allGalleryImages.map((img) => (
                        <SwiperSlide key={img.id} className="!w-20 md:!w-32 h-full opacity-40 hover:opacity-100 [&.swiper-slide-thumb-active]:opacity-100 cursor-pointer transition-opacity rounded-lg overflow-hidden border-2 border-transparent [&.swiper-slide-thumb-active]:border-blue-500">
                             <Image src={img.src} alt={img.alt} fill className="object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            <style jsx global>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
            `}</style>
        </div>
      )}
    </div>
  );
}