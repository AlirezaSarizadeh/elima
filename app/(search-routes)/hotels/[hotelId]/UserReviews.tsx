"use client";

import React, { useState } from 'react';
import { 
    KeyboardArrowLeft, 
    PersonOutline,
    WorkOutline,
    FavoriteBorder
} from '@mui/icons-material';

// داده‌های نمونه نظرات
const reviewsData = {
    rating: 4.4,
    ratingText: "بسیار خوب",
    totalReviews: 379,
    reviews: [
        {
            id: 1,
            user: "ellie namdar",
            rating: 3,
            ratingText: "خوب",
            type: "سفر کاری",
            title: "سفر کاری",
            comment: "صرفا این هتل رو به خاطر موقعیت مکانی انتخاب میکنم کیفیت غذا ها واقعا بسیار پایین هست و به عنوان یه هتل ۵ ستاره امکانات خاصی ندارد",
            date: "۱۴۰۴/۹/۱۷"
        },
        {
            id: 2,
            user: "hassan rafhid 354",
            rating: 5,
            ratingText: "عالی",
            type: "سفر خانوادگی",
            title: "بهترین هتل",
            comment: "همه چی در حد خوب و عالی بود",
            date: "۱۴۰۴/۸/۲۹"
        },
        {
            id: 3,
            user: "عارف رجبی",
            rating: 5,
            ratingText: "عالی",
            type: "سفر تفریحی",
            title: "خوب",
            comment: "خوب",
            date: "۱۴۰۴/۸/۸"
        }
    ]
};

export default function UserReviews() {
    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8" id="reviews-section">
            
            {/* هدر بخش نظرات */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                
                {/* عنوان و امتیاز کلی */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                    <h2 className="text-xl font-black text-slate-800">
                        نظرات کاربران هتل پارسیان آزادی تهران
                    </h2>
                </div>

                {/* باکس امتیاز سمت چپ هدر */}
                <div className="flex flex-row-reverse md:flex-col items-center md:items-end gap-3 md:gap-1 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                        <span className="block font-bold text-slate-800 text-sm">{reviewsData.ratingText}</span>
                        <span className="text-xs text-gray-400">{reviewsData.totalReviews} نظر</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 font-black text-2xl dir-ltr">
                        <span>{reviewsData.rating}</span>
                        <span className="text-sm text-gray-400 font-medium">/۵</span>
                    </div>
                </div>
            </div>

            {/* لینک مشاهده همه (در موبایل پایین هدر، در دسکتاپ بالا سمت چپ بود که الان جابجا کردیم برای تطابق بهتر با طرح) */}
            {/* اما طبق عکس شما، دکمه "مشاهده همه نظرات" سمت چپ عنوان است. بیایید ساختار را دقیق کنیم */}
            
            {/* اصلاحیه هدر برای تطابق دقیق با عکس */}
            <div className="absolute top-8 left-8 hidden md:flex items-center gap-1 text-blue-600 text-xs font-bold cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                 {/* این دکمه را می‌توانیم با پوزیشن ابسولوت یا فلکس مدیریت کنیم. روش فلکس بهتر است. */}
            </div>


            {/* لیست نظرات */}
            <div className="flex flex-col gap-0">
                {reviewsData.reviews.map((review, index) => (
                    <div key={review.id} className={`py-6 ${index !== reviewsData.reviews.length - 1 ? 'border-b border-dashed border-gray-100' : ''}`}>
                        
                        <div className="flex justify-between items-start mb-3">
                            {/* مشخصات کاربر و امتیاز */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600 font-bold text-sm">{review.rating}</span>
                                    <span className="text-slate-700 font-bold text-sm">{review.ratingText}</span>
                                </div>
                                <span className="text-xs text-gray-400">{review.user}</span>
                            </div>
                        </div>

                        {/* نوع سفر و تاریخ */}
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-slate-800 text-sm">{review.title}</h3>
                            <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">{review.date}</span>
                        </div>

                        {/* متن نظر */}
                        <p className="text-gray-500 text-sm leading-7 text-justify">
                            {review.comment}
                        </p>

                    </div>
                ))}
            </div>

            {/* دکمه مشاهده همه در پایین لیست (برای دسترسی راحت‌تر) */}
            <div className="mt-6 border-t border-gray-100 pt-6 flex justify-start">
                <div className="flex items-center gap-1 text-blue-600 text-xs md:text-sm font-bold cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                    <span>مشاهده {reviewsData.totalReviews} نظر</span>
                    <KeyboardArrowLeft fontSize="small" />
                </div>
            </div>

        </section>
    );
}