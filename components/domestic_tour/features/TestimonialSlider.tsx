"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

export default function TestimonialSlider() {
    const testimonials = [
        {
            name: "رضا عسگری",
            avatar: "https://i.pravatar.cc/80?img=66", // عکس تستی
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
        <section className="w-full bg-gray-100 py-14 relative">

            {/* absolute object */}
            <img src={'/images/testimonial-object.png'} className="absolute right-0 top-0 bottom-0 m-auto"/>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">


                {/* RIGHT – TITLE + DESCRIPTION + NAVIGATION */}
                <div>
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        نظرات همسفران الیما
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 leading-7 mb-8">
                        در الیماگشت، رضایت شما اولویت اصلی ماست. معتقدیم که توانسته‌ایم
                        لحظات خاطره‌انگیز و سفری بی‌دغدغه را برای مسافران رقم بزنیم. در این بخش
                        می‌توانید تجربیات واقعی و نظرات ارزشمند مشتریان ما را مشاهده کنید.
                    </p>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3">
                        <button className="test-prev-btn w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <ArrowRight />
                        </button>

                        <button className="test-next-btn w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                            <ArrowLeft />
                        </button>
                    </div>
                </div>

                {/* LEFT – SLIDER */}
                <div className="relative">

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: ".test-prev-btn",
                            nextEl: ".test-next-btn",
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        speed={700}
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                {/* CARD */}
                                <div className="bg-white p-3 rounded-2xl shadow-lg relative w-[90%] overflow-visible">

                                    {/* Avatar */}
                                    <img
                                        src={item.avatar}
                                        className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                                    />

                                    {/* Name + Stars */}
                                    <div className="flex items-center justify-start gap-3 mt-4">
                                        <h3 className="font-bold text-gray-800">{item.name}</h3>

                                        <div className="text-yellow-400 text-lg flex items-center ">
                                            {"★".repeat(item.stars)}
                                            {"☆".repeat(5 - item.stars)}
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <p className="text-gray-600 mt-3 leading-7">
                                        {item.text}
                                    </p>

                                    {/* Date */}
                                    <div className="flex items-start justify-center flex-col max-w-fit ms-auto" >
                                        <p className="text-xs text-gray-400 mt-1">سفر به ترکیه</p>
                                        <p className="text-xs text-gray-400 mt-1 flex items-center justify-center">
                                            تاریخ سفر  :
                                            {item.date}
                                        </p>
                                    </div>

                                    {/* Card drop shadow */}
                                    <div className="absolute w-full h-4 bg-gray-300/20 blur-xl -bottom-2 left-0 rounded-full"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


            </div>
        </section>
    );
}
