"use client";

import React from 'react';
import Image from 'next/image';
import { Star, LocalOffer } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const similarHotels = [
    {
        id: 1,
        title: "هتل استقلال تهران",
        location: "تهران، تقاطع بزرگراه چمران",
        stars: 5,
        rating: 3.8,
        price: 8550000,
        oldPrice: 9000000,
        discount: 5,
        image: "/images/hotel_1.png"
    },
    {
        id: 2,
        title: "هتل اسپیناس بلوار",
        location: "تهران، بلوار کشاورز",
        stars: 5,
        rating: 4.3,
        price: 8550000,
        oldPrice: 9500000,
        discount: 10,
        image: "/images/hotel_2.png"
    },
    {
        id: 3,
        title: "هتل آتانا تهران",
        location: "تهران، میدان فلسطین",
        stars: 4,
        rating: 4.4,
        price: 8500000,
        oldPrice: null, 
        discount: 16,
        image: "/images/hotel_3.png"
    },
    {
        id: 4,
        title: "هتل ویستریا",
        location: "تهران، میدان قدس",
        stars: 5,
        rating: 3.8,
        price: 8110300,
        oldPrice: 11100000,
        discount: 27,
        image: "/images/hotel_1.png"
    }
];

export default function SimilarHotels() {
    return (
        <section className="bg-gray-100 rounded-3xl border border-gray-200 p-6 md:p-8 mt-10 " id="similar-hotels">
            
            {/* هدر جذاب‌تر */}
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
                <LocalOffer className="text-blue-600" />
                <h2 className="text-lg md:text-xl font-black text-slate-800">
                    پیشنهادهای جایگزین؛ هتل‌های مشابه
                </h2>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1.3} // در موبایل کمی از کارت بعدی دیده شود
                breakpoints={{
                    640: { slidesPerView: 2.2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 }
                }}
                className="w-full !pb-4 px-1"
            >
                {similarHotels.map((hotel) => (
                    <SwiperSlide key={hotel.id} className="h-auto"> {/* h-auto برای هم‌ارتفاع شدن */}
                        <div className="h-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1">
                            
                            {/* تصویر (نسبت تصویر ثابت) */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <Image 
                                    src={hotel.image} 
                                    alt={hotel.title} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                {/* بج تخفیف روی عکس (مینیمال) */}
                                {hotel.discount > 0 && (
                                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                                        {hotel.discount}٪
                                    </div>
                                )}
                            </div>

                            {/* محتوا */}
                            <div className="p-4 flex-1 flex flex-col">
                                
                                {/* تایتل و ستاره */}
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-800 text-sm truncate w-2/3" title={hotel.title}>
                                        {hotel.title}
                                    </h3>
                                    <div className="flex items-center text-yellow-400 text-[10px]">
                                        <Star sx={{ fontSize: 14 }} />
                                        <span className="text-gray-400 mr-0.5">{hotel.stars}</span>
                                    </div>
                                </div>

                                {/* آدرس کوتاه */}
                                <p className="text-gray-400 text-[11px] truncate mb-4">
                                    {hotel.location}
                                </p>

                                {/* بخش قیمت و امتیاز (چسبیده به پایین) */}
                                <div className="mt-auto flex items-end justify-between border-t border-dashed border-gray-100 pt-3">
                                    
                                    {/* امتیاز */}
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] text-gray-400 mb-0.5">امتیاز کاربران</span>
                                        <div className="bg-blue-50 text-blue-600 text-xs font-black px-2 py-1 rounded-md">
                                            {hotel.rating}
                                        </div>
                                    </div>

                                    {/* قیمت */}
                                    <div className="text-left">
                                        {hotel.oldPrice && (
                                            <span className="text-gray-300 text-[10px] line-through block">
                                                {hotel.oldPrice.toLocaleString()}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-1 text-slate-800">
                                            <span className="text-base font-black">
                                                {hotel.price.toLocaleString()}
                                            </span>
                                            <span className="text-[9px] text-gray-400 font-light">تومان</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}