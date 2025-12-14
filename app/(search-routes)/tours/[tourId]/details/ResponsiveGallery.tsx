"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Close, ArrowForwardIos, ArrowBackIos, GridView } from "@mui/icons-material"; // آیکون‌ها

// ایمپورت‌های مربوط به Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Zoom, Keyboard, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/thumbs";

// داده‌های نمونه
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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // مرتب‌سازی آرایه برای اینکه عکس اصلی اول لیست گالری باشد (اختیاری)
  // ما اینجا همه عکس‌ها را در یک آرایه برای گالری مودال جمع می‌کنیم
  const mainImage = images.find((img) => img.isMain);
  const gridImages = images.filter((img) => !img.isMain);
  
  // آرایه نهایی برای نمایش در مودال (اول اصلی، بعد بقیه)
  const allGalleryImages = mainImage ? [mainImage, ...gridImages] : images;

  // تابع باز کردن مودال
  const openGallery = (imgId: number) => {
    // پیدا کردن ایندکس عکس کلیک شده در آرایه اصلی
    const index = allGalleryImages.findIndex(img => img.id === imgId);
    setInitialSlide(index >= 0 ? index : 0);
    setIsOpen(true);
    // قفل کردن اسکرول بادی وقتی مودال باز است
    document.body.style.overflow = "hidden";
  };

  // تابع بستن مودال
  const closeGallery = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-0 py-6" dir="rtl">
      
      {/* ------------------------------------------- */}
      {/* نمای دسکتاپ (Grid Layout) */}
      {/* ------------------------------------------- */}
      <div className="hidden md:flex h-[500px] gap-4">
        
        {/* سمت چپ: گرید 4 تایی */}
        <div className="w-1/2 grid grid-cols-2 gap-4">
          {gridImages.map((img, index) => (
            <div 
                key={img.id} 
                className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => openGallery(img.id)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* افکت هاور تیره */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

              {/* ابتکار: روی عکس آخر دکمه "مشاهده همه" را نمایش می‌دهیم */}
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

        {/* سمت راست: عکس بزرگ */}
        {mainImage && (
          <div 
            className="w-1/2 relative rounded-3xl overflow-hidden group cursor-pointer"
            onClick={() => openGallery(mainImage.id)}
          >
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
            {/* دکمه راهنما روی عکس اصلی */}
            <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <GridView fontSize="small" />
                <span className="text-sm font-bold">باز کردن گالری</span>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------- */}
      {/* نمای موبایل (Preview Swiper) */}
      {/* ------------------------------------------- */}
      <div className="md:hidden block w-full h-[300px]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={15}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          pagination={{ clickable: true }}
          className="w-full h-full rounded-2xl"
        >
          {allGalleryImages.map((img) => (
            <SwiperSlide 
                key={img.id} 
                className="relative w-full h-full rounded-2xl overflow-hidden"
                onClick={() => openGallery(img.id)} // کلیک در موبایل هم گالری را باز کند
            >
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

      {/* ------------------------------------------- */}
      {/* مودال گالری (Lightbox) */}
      {/* ------------------------------------------- */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn">
            
            {/* دکمه بستن */}
            <button 
                onClick={closeGallery} 
                className="absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            >
                <Close fontSize="large" />
            </button>

            {/* اسلایدر اصلی مودال */}
            <div className="w-full h-[75vh] md:h-[80vh] relative">
                <Swiper
                    initialSlide={initialSlide}
                    modules={[Navigation, Zoom, Keyboard, Thumbs]}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    zoom={true}
                    keyboard={{ enabled: true }}
                    thumbs={{ swiper: thumbsSwiper }}
                    spaceBetween={30}
                    slidesPerView={1}
                    className="w-full h-full"
                >
                    {allGalleryImages.map((img) => (
                        <SwiperSlide key={img.id} className="flex items-center justify-center">
                            <div className="swiper-zoom-container w-full h-full flex items-center justify-center p-4">
                                <div className="relative w-full h-full max-w-5xl max-h-full">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-contain"
                                        quality={100}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* دکمه‌های ناوبری سفارشی */}
                <button className="custom-next absolute top-1/2 left-4 md:left-8 z-50 text-white/50 hover:text-white -translate-y-1/2">
                    <ArrowBackIos fontSize="large" />
                </button>
                <button className="custom-prev absolute top-1/2 right-4 md:right-8 z-50 text-white/50 hover:text-white -translate-y-1/2">
                    <ArrowForwardIos fontSize="large" />
                </button>
            </div>

            {/* نوار تصاویر کوچک (Thumbnails) پایین */}
            <div className="w-full h-20 md:h-24 mt-4 px-4 hidden md:block">
                <Swiper
                    //@ts-ignore
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
            
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
      )}

    </div>
  );
}