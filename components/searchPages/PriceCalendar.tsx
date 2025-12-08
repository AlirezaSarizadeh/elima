"use client";

import React, { useRef, useState } from "react";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// MUI Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// --- Mock Data ---
const calendarData = [
    { date: "چهارشنبه (۱۸ مرداد)", price: "۱۸,۰۰۰,۰۰۰ تومان", status: "normal" },
    { date: "پنج‌شنبه (۱۹ مرداد)", price: "۱۸,۰۰۰,۰۰۰ تومان", status: "cheapest" },
    { date: "جمعه (۲۰ مرداد)", price: "۱۹,۵۰۰,۰۰۰ تومان", status: "expensive" },
    { date: "شنبه (۲۱ مرداد)", price: "۱۸,۰۰۰,۰۰۰ تومان", status: "normal" },
    { date: "یک‌شنبه (۲۲ مرداد)", price: "۱۸,۰۰۰,۰۰۰ تومان", status: "normal" },
    { date: "دوشنبه (۲۳ مرداد)", price: "۱۸,۰۰۰,۰۰۰ تومان", status: "normal" },
    { date: "سه‌شنبه (۲۴ مرداد)", price: "۱۸,۰۰۰,۰۰۰ تومان", status: "cheapest" },
    { date: "چهارشنبه (۲۵ مرداد)", price: "۱۸,۰۰۰,۰۰۰ تومان", status: "normal" },
    { date: "پنج‌شنبه (۲۶ مرداد)", price: "۲۰,۰۰۰,۰۰۰ تومان", status: "expensive" },
    { date: "جمعه (۲۷ مرداد)", price: "۱۸,۰۰۰,۰۰۰ تومان", status: "normal" },
];

export default function PriceCalendar() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [_, setInit] = useState(false);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 relative group">

            {/* هدر تقویم */}
            <div className="text-right text-sm text-gray-700 mb-4 font-semibold border-b border-gray-100 pb-2">
                تقویم قیمتی: <span className="font-normal text-gray-500">ارزان‌ترین قیمت تورهای ۳ روزه، قبل و بعد از تاریخ جستجوی شما</span>
            </div>

            <div className="relative px-2">

                <Swiper
                    dir="rtl"
                    modules={[Navigation]}
                    spaceBetween={0}
                    slidesPerView={2}
                    onInit={() => setInit(true)}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                    }}
                    className="price-calendar-swiper"
                >
                    {calendarData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={`
                                flex flex-col items-center justify-center py-4 px-2 text-center cursor-pointer transition-colors duration-200 hover:bg-blue-50
                                h-full select-none
                                ${index !== calendarData.length - 1 ? "border-l border-gray-200" : ""} 
                            `}>
                                {/* توضیح تغییر بالا:
                                    به جای استفاده از last:border-l-0 در CSS، 
                                    با شرط جاوااسکریپت چک کردیم که اگر آیتم آخر نبود، بوردر سمت چپ اضافه شود.
                                    همچنین رنگ بوردر را کمی تیره‌تر (gray-200) کردم تا بهتر دیده شود.
                                */}
                                <span className="text-xs font-semibold text-gray-700 mb-2">{item.date}</span>

                                <span className={`text-[11px] font-medium 
                                    ${item.status === 'cheapest' ? 'text-green-600 bg-green-50 px-2 py-0.5 rounded-full' :
                                        item.status === 'expensive' ? 'text-red-500' : 'text-gray-400'}
                                `}>
                                    {item.price}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* دکمه‌های نویگیشن */}
                <div ref={prevRef} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <NavButton icon={<ChevronRightIcon fontSize="small" />} />
                </div>

                <div ref={nextRef} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <NavButton icon={<ChevronLeftIcon fontSize="small" />} />
                </div>

            </div>
        </div>
    );
}

function NavButton({ icon }: { icon: React.ReactNode }) {
    return (
        <div className="bg-white text-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-50 border border-gray-100 hover:text-blue-600 transition-colors">
            {icon}
        </div>
    )
}