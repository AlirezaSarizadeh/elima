"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// استفاده از آیکون‌های MUI
import { ChevronRight, ChevronLeft } from "@mui/icons-material";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from "@mui/material";

interface HotelCardProps {
    data: any;
    linkUrl: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ data, linkUrl }) => {
    // ✅ ایجاد شناسه‌های منحصربه‌فرد برای دکمه‌های نویگیشن هر کارت
    const nextBtnClass = `next-btn-${data.id}`;
    const prevBtnClass = `prev-btn-${data.id}`;

    return (
        <div className="flex p-2 flex-col md:flex-row bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group/card h-full md:h-64">

            {/* بخش اسلایدر تصویر */}
            <div className="relative w-full md:w-[320px] h-64 md:h-full shrink-0 overflow-hidden group/slider">

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        // ✅ اتصال به کلاس‌های اختصاصی همین کارت
                        nextEl: `.${nextBtnClass} `,
                        prevEl: `.${prevBtnClass} `,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    loop={data.images?.length > 1}
                    className="w-full h-full rounded-xl hotelCard_swiper"
                >
                    {data.images?.map((img: string, index: number) => (
                        <SwiperSlide className="rounded-xl" key={index}>
                            <Link href={linkUrl} className="block w-full h-full relative overflow-hidden">
                                <Image
                                    src={img}
                                    alt={data.title}
                                    fill
                                    className="object-cover transition-opacity duration-500 rounded-lg"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* ✅ فلش‌های نویگیشن با کلاس‌های اختصاصی و کرسر پوینتر */}
                {data.images?.length > 1 && (
                    <>
                        <button className={`${prevBtnClass} absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-gray-900 shadow-md opacity-0 group-hover/slider:opacity-100 cursor-pointer transition-opacity duration-300 hover:bg-white active:scale-90`}>
                            <ChevronRight fontSize="small" />
                        </button>
                        <button className={`${nextBtnClass} absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-gray-900 shadow-md opacity-0 group-hover/slider:opacity-100 cursor-pointer transition-opacity duration-300 hover:bg-white active:scale-90`}>
                            <ChevronLeft fontSize="small" />
                        </button>
                    </>
                )}

                <style jsx global>{`
                    .swiper-pagination-bullet {
                        background: #fff !important;
                        opacity: 0.7;
                    }
                    .swiper-pagination-bullet-active {
                        background: #fff !important;
                        opacity: 1;
                        width: 12px;
                        border-radius: 4px;
                    }
                    /* جلوگیری از نمایش فلش‌های پیش‌فرض خودِ سویپر */
                    .swiper-button-next, .swiper-button-prev {
                        display: none !important;
                    }
                `}</style>
            </div>

            {/* بخش محتوا */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        {data.tags?.length > 0 && (
                            <span className="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded-full w-fit mb-1  ">
                                🍉 {data.tags[0]}
                            </span>
                        )}
                        <h3 className="text-lg   text-gray-800 group-hover/card:text-blue-600 transition-colors cursor-pointer">
                            {data.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                            <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg key={i} className={`w-3.5 h-3.5 ${i < data.stars ? "fill-current" : "text-gray-200"}`} viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-gray-400 text-xs">{data.stars} ستاره</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center bg-blue-50 p-2 rounded-xl border border-blue-100 min-w-[60px]">
                        <span className="text-blue-700 font-black text-lg leading-none">{data.rating}</span>
                        <span className="text-blue-400 text-[10px] mt-1">بسیار خوب</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-3">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{data.location}</span>
                </div>

                <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                            <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded  ">{data.discount}٪ تخفیف</span>
                            <span className="text-gray-300 text-xs line-through">{Number(data.oldPrice).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs text-gray-500">شروع قیمت از</span>
                            <span className="text-xl   text-blue-600 tracking-tighter">{Number(data.price).toLocaleString()}</span>
                            <span className="text-xs text-gray-500">
                                <Image src={'/images/price.svg'} alt="تومان" width={18} height={18} />
                            </span>
                            <span className="text-xs font-light text-gray-500">/ {data.duration}</span>
                        </div>
                    </div>

                    <Link href={linkUrl}>
                        <Button
                            variant="contained"
                            className="md:!w-auto rounded-lg px-6 py-2   shadow-none"
                            disableElevation
                            sx={{
                                borderRadius: '10px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                cursor: 'pointer' // ✅ اطمینان از کرسر پوینتر
                            }}
                        >
                            انتخاب و رزرو
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;