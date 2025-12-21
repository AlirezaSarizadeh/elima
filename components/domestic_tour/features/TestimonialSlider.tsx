"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight, FormatQuoteRounded } from "@mui/icons-material";

export default function TestimonialSlider() {
    const testimonials = [
        {
            name: "رضا عسگری",
            avatar: "https://i.pravatar.cc/80?img=66",
            stars: 5,
            text: `ممنون از امدادگشت، خیلی به سفر کمک کردید و تجربه خوبی برام رقم زد. روند دریافت ویزا برای سفر خیلی جزئی برنامه‌ریزی شده بود و بدون دغدغه انجام شد.`,
            date: "۱۹-۰۲-۱۴۰۳",
        },
        {
            name: "سارا محمدی",
            avatar: "https://i.pravatar.cc/80?img=12",
            stars: 5,
            text: `پشتیبانی خیلی سریع و مودبانه بود. خیلی راضی هستم از روند هماهنگی ویزا و خدمات.`,
            date: "۰۱-۰۴-۱۴۰۳",
        },
        {
            name: "احمد رستمی",
            avatar: "https://i.pravatar.cc/80?img=20",
            stars: 4,
            text: `به موقع و دقیق همه چیز هماهنگ شد. تجربه بسیار خوبی بود.`,
            date: "۲۵-۰۵-۱۴۰۳",
        },
    ];

    return (
        <section className="w-full bg-gray-50 py-5 md:py-16 relative overflow-hidden" dir="rtl">

            {/* absolute object - ریسپانسیو شده: در موبایل کمرنگ‌تر و کوچکتر */}
            <img 
                src={'/images/testimonial-object.png'} 
                className="absolute -right-10 md:right-0 top-0 bottom-0 m-auto opacity-10 lg:opacity-100 max-w-[200px] md:max-w-none pointer-events-none"
                alt="decoration"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">

                {/* RIGHT – TITLE + DESCRIPTION + NAVIGATION */}
                {/* تغییر: در موبایل وسط‌چین، در دسکتاپ راست‌چین */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-right order-1">
                    
                    <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold mb-3">
                        نظرات شما
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-4xl font-black text-gray-800 mb-4 leading-tight">
                        تجربه همسفران <span className="text-blue-600">الیما</span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 leading-7 md:leading-8 mb-8 max-w-md lg:max-w-lg text-sm md:text-base">
                        در الیماگشت، رضایت شما اولویت اصلی ماست. معتقدیم که توانسته‌ایم
                        لحظات خاطره‌انگیز و سفری بی‌دغدغه را برای مسافران رقم بزنیم. در این بخش
                        می‌توانید تجربیات واقعی و نظرات ارزشمند مشتریان ما را مشاهده کنید.
                    </p>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-4">
                        <button className="test-prev-btn w-12 h-12 rounded-full border border-gray-300 text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 flex items-center justify-center">
                            <ArrowRight />
                        </button>

                        <button className="test-next-btn w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center">
                            <ArrowLeft />
                        </button>
                    </div>
                </div>

                {/* LEFT – SLIDER */}
                <div className="w-full order-2">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: ".test-prev-btn",
                            nextEl: ".test-next-btn",
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={20}
                        loop={true}
                        speed={800}
                        className="w-full py-4 px-2" // پدینگ برای سایه‌ها
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                {/* CARD */}
                                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-200 relative mx-auto  w-[85%]">
                                    
                                    {/* آیکون نقل قول تزیینی */}
                                    <FormatQuoteRounded className="absolute top-6 left-6 text-gray-100 text-6xl rotate-180" />

                                    <div className="flex items-center gap-4 relative z-10">
                                        {/* Avatar */}
                                        <div className="relative">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-md"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-800 text-sm md:text-base">{item.name}</h3>
                                            <p className="text-xs text-gray-400 mt-1">مسافر ترکیه</p>
                                        </div>
                                    </div>

                                    {/* Stars */}
                                    <div className="text-yellow-400 text-sm md:text-base flex items-center mt-4 mb-3">
                                        {"★".repeat(item.stars)}
                                        <span className="text-gray-200">{"★".repeat(5 - item.stars)}</span>
                                    </div>

                                    {/* Text */}
                                    <p className="text-gray-600 text-sm md:text-base leading-7 relative z-10 min-h-[80px]">
                                        {item.text}
                                    </p>

                                    {/* Date separator */}
                                    <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center text-xs text-gray-400 font-medium">
                                        <span>تاریخ ثبت نظر:</span>
                                        <span className="bg-gray-50 px-3 py-1 rounded-lg text-gray-600">{item.date}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    );
}