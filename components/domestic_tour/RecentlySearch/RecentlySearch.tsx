'use client'

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import Title from '../../ui/Title/Title';
import Link from 'next/link';
import { ChevronLeft } from '@mui/icons-material';

const RecentlySearch = () => {
    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);

    return (

        <>
            <div className="relative max-w-7xl mx-auto px-0 flex items-center justify-between">
                <Title title='جستجو های اخیر' icon={<img src='/images/textalign-right.png' />} />
                <Link href={'dxs'} className='text-xs text-blue-500'>
                    جستجوگر شو
                    <ChevronLeft className='font-extralight' />
                </Link>
            </div>
            <div className="relative max-w-7xl mx-auto px-0"></div>
            <div className="relative max-w-7xl mx-auto px-0">


                {/* دکمه قبل */}
                <div
                    ref={prevRef}
                    className="
                    text-gray-500 flex items-center justify-center gap-1
                    border border-gray-200 px-2 py-2 rounded-xl
                    absolute left-0 top-1/2 -translate-y-1/2 z-10
                    bg-white cursor-pointer
                "
                >
                    <img src="/images/arrow-left.png" className="w-5" />
                </div>

                {/* دکمه بعد */}
                <div
                    ref={nextRef}
                    className="
                    text-gray-500 flex items-center justify-center gap-1
                    border border-gray-200 px-2 py-2 rounded-xl
                    absolute right-0 top-1/2 -translate-y-1/2 z-10
                    bg-white cursor-pointer
                "
                >
                    <img src="/images/arrow-right.png" className="w-5" />
                </div>

                <Swiper
                    slidesOffsetBefore={50}  // فاصله از راست
                    slidesPerView={7}
                    spaceBetween={10}
                    grabCursor={true}
                    modules={[Navigation]}
                    navigation={false}
                    onInit={(swiper) => {

                        // اجباراً cast کردن نوع navigation
                        const nav = swiper.params.navigation as any;

                        nav.prevEl = prevRef.current;
                        nav.nextEl = nextRef.current;

                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                >
                    {Array.from({ length: 10 }).map((_, i) => (
                        <SwiperSlide key={i}>
                            <button className="text-gray-500 flex items-center text-sm justify-center gap-1.5 cursor-pointer border border-gray-200 px-4 font-light py-2 rounded-xl">
                                تهران
                                <img src="/images/arrow-swap-horizontal.png" />
                                اهواز
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>

    );
};

export default RecentlySearch;
