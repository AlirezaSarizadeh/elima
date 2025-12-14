"use client";

import React from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { ChatBubbleOutlineRounded, Star, StarBorder } from "@mui/icons-material";

// ایمپورت‌های Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Navigation را اگر استفاده نمی‌کنید پاک کنید
import "swiper/css";
import "swiper/css/pagination";

type ReviewItem = {
    id: number;
    name: string;
    avatar?: string;
    date?: string;
    rating?: number;
    comment: string;
};

const reviewsData: ReviewItem[] = [
    {
        id: 1,
        name: "علی کمالی",
        avatar: "/images/avatar-1.png",
        date: "۱۴۰۳/۰۴/۱۶",
        rating: 4,
        comment: "هتل اصلاً کیفیت مناسبی نداشت و با عکس‌های سایت کاملاً متفاوت بود. راهنمای تور بی‌حوصله و بی‌نظم بود و برنامه‌ها طبق زمان‌بندی پیش نرفت."
    },
    {
        id: 2,
        name: "سعید رضایی",
        avatar: "/images/avatar-1.png",
        date: "۱۴۰۲/۱۲/۱۰",
        rating: 5,
        // این متن طولانی باعث می‌شود کارت بلندتر شود
        comment: "سلام و درود. من و خانواده‌ام سال گذشته در تور مثلث طلایی هند شرکت کردیم و واقعاً تجربه بسیار حرفه‌ای و خوش‌برخورد بودند و اطلاعات جامعی درباره منطقه و جاذبه‌های گردشگری داشتند. واقعا پیشنهاد میکنم حتما یک بار هم شده تجربه کنید."
    },
    {
        id: 3,
        name: "مریم احمدی",
        date: "۱۴۰۳/۰۱/۲۰",
        rating: 3,
        comment: "تور بدی نبود اما انتظار هتل بهتری داشتم."
    },
];

export default function TourReviews() {
    return (
        <div className="w-full py-8" dir="rtl">

            {/* ---------------- Header ---------------- */}
            <div className="flex justify-start items-center gap-2 mb-6">
                <div className="text-blue-600">
                    <Image src={'/images/Comments icon.svg'} alt="icon" width={24} height={24} />
                </div>
                <h3 className="font-bold text-xl text-gray-800">نظرات</h3>
            </div>

            {/* ---------------- Swiper Slider ---------------- */}
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                // 👇 1. این ویژگی باعث می‌شود ارتفاع کانتینر اسلایدر با محتوا تنظیم شود
                autoHeight={true}
                pagination={{ clickable: true, dynamicBullets: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1.5 },
                    1024: { slidesPerView: 2 },
                }}
                className="w-full pb-12"
            >
                {reviewsData.map((review) => (
                    // 👇 نکته: height auto برای اسلاید مهم است
                    <SwiperSlide key={review.id} className="h-auto">
                        <ReviewCard review={review} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

// ----------------------------------------------------------------------
// کامپوننت کارت نظر
// ----------------------------------------------------------------------
function ReviewCard({ review }: { review: ReviewItem }) {
    return (
        // 👇 2. تغییر مهم: h-full حذف شد و h-fit اضافه شد
        // همچنین justify-between را حذف کردیم چون ارتفاع متغیر است و نیازی به چسباندن محتوا نیست
        <div className="bg-white rounded-8 border border-gray-200 p-6  h-fit flex flex-col hover:shadow-md transition-shadow">

            {/* Header کارت */}
            <div className="flex justify-between items-start mb-4">

                {/* سمت راست: آواتار و نام */}
                <div className="flex items-center gap-3 flex-row-reverse">
                    <span className="font-bold text-gray-800 text-sm md:text-base">
                        {review.name}
                    </span>
                    {review.avatar ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                            <Image
                                src={review.avatar}
                                alt={review.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <Avatar sx={{ bgcolor: '#eff6ff', color: '#3b82f6', fontWeight: 'bold' }}>
                            {review.name.charAt(0)}
                        </Avatar>
                    )}

                </div>
                {/* سمت چپ: امتیاز و تاریخ */}
                <div className="flex flex-col items-start gap-1 justify-end">
                    {review.rating && (
                        <div className="flex text-amber-400 ms-auto flex-row-reverse">
                            {[...Array(5)].map((_, i) => (
                                <span key={i}>
                                    {i < review.rating! ? <Star fontSize="small" /> : <StarBorder fontSize="small" className="text-gray-300" />}
                                </span>
                            ))}
                        </div>
                    )}
                    {review.date && (
                        <span className="text-xs text-gray-400 font-medium">
                            تاریخ سفر: {review.date}
                        </span>
                    )}
                </div>


            </div>

            {/* متن نظر */}
            <div className="text-gray-600 text-sm leading-7 text-justify font-medium">
                {review.comment}
            </div>

        </div>
    );
}