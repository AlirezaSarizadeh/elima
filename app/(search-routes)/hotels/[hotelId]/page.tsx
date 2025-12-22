"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    LocationOn,
    Star,
    Wifi,
    FreeBreakfast,
    Pool,
    Spa,
    FitnessCenter,
    Restaurant,
    LocalParking,
    CheckCircleOutline,
    MapOutlined,
    DescriptionOutlined,
    RuleOutlined,
    VerifiedUserOutlined,
    ShareOutlined,
    FavoriteBorder,
    Hotel
} from '@mui/icons-material';
import ResponsiveGallery from '../../tours/[tourId]/details/ResponsiveGallery';
import BookingForm from '../../tours/[tourId]/details/BookingForm';
import Title from '../../../../components/ui/Title/Title';
import HotelMap from './HotelMap';
import RoomSelection from './RoomSelection';
import AccessAndDistances from './AccessAndDistances';
import UserReviews from './UserReviews';
import SimilarHotels from './SimilarHotels';
import MobileBookingBar from './MobileBookingBar';
import HotelRules from './HotelRules';

// رنگ‌های برند الیما گشت بر اساس لوگو
const BRAND_NAVY = "#1a3454";
const BRAND_ORANGE = "#f97316";

const hotelData = {
    name: "هتل پارسیان آزادی تهران",
    stars: 5,
    location: "تهران، بزرگراه شهید چمران، تقاطع اوین",
    rating: 4.6,
    reviews: 420,
    images: [
        "/images/hotel-main.jpg",
        "/images/hotel-1.jpg",
        "/images/hotel-2.jpg",
        "/images/hotel-3.jpg",
        "/images/hotel-4.jpg",
    ],
    rooms: [
        { id: 1, name: "اتاق دو تخته دبل (ویو کوه)", capacity: 2, price: 4200000, discount: 3800000, features: ["صبحانه", "اینترنت رایگان", "لغو رایگان"] },
        { id: 2, name: "سوئیت جونیور (ویو شهر)", capacity: 3, price: 7500000, discount: null, features: ["صبحانه", "پارکینگ", "میوه رایگان"] },
    ]
};

export default function HotelDetailPage() {

    const hotelLocation = { lat: 35.7926, lng: 51.3934 };

    return (
        <main className="bg-[#f8fafc] min-h-screen py-0 pb-10" dir="rtl">
            <div className="container mx-auto max-w-7xl px-4">

                <ResponsiveGallery />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* --- ستون سمت راست: جزییات و اتاق‌ها (8 ستون) --- */}
                    <div className="lg:col-span-8 space-y-10">

                        {/* بخش انتخاب اتاق */}
                        <section className="space-y-6">


                            {/* --- بخش اول: هدر و اطلاعات کلی --- */}
                            <div className="flex flex-col md:flex-row justify-between items-start mb-0 gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h1 className="text-3xl font-black text-slate-800">{hotelData.name}</h1>
                                        <div className="flex text-yellow-400">
                                            {[...Array(hotelData.stars)].map((_, i) => <Star key={i} fontSize="small" />)}
                                        </div>
                                    </div>
                                    <p className="flex items-center text-slate-500 text-sm">
                                        <LocationOn sx={{ fontSize: 18 }} className="text-slate-400 ml-1" />
                                        {hotelData.location}
                                    </p>
                                </div>
                            </div>

                            <RoomSelection />
                        </section>

                        {/* بخش امکانات */}
                        <section className="bg-white rounded-3xl p-8 border border-gray-200">
                            <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
                                <VerifiedUserOutlined className="text-blue-600" /> امکانات هتل
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <FacilityItem icon={<Wifi />} label="اینترنت رایگان" />
                                <FacilityItem icon={<Pool />} label="استخر" />
                                <FacilityItem icon={<Spa />} label="اسپا" />
                                <FacilityItem icon={<FitnessCenter />} label="باشگاه ورزشی" />
                                <FacilityItem icon={<Restaurant />} label="رستوران" />
                                <FacilityItem icon={<LocalParking />} label="پارکینگ" />
                                <FacilityItem icon={<FreeBreakfast />} label="صبحانه رایگان" />
                            </div>
                        </section>

                        <AccessAndDistances />

                        <HotelRules />

                        <UserReviews />

                        <SimilarHotels />

                    </div>

                    {/* --- ستون سمت چپ: نقشه و اطلاعات ثابت (4 ستون) --- */}
                    <div className="lg:col-span-4 space-y-6 sticky top-25">
                        <div className='hidden lg:block'>

                            <BookingForm />
                        </div>
                        {/* کارت امتیاز */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 flex items-center justify-between">
                            <div>
                                <span className="text-3xl font-black text-blue-600">{hotelData.rating}</span>
                                <span className="text-xs font-bold text-slate-400 mr-2">از 5</span>
                            </div>
                            <div className="text-left">
                                <p className="font-black text-slate-700">عالی</p>
                                <p className="text-[10px] text-slate-400">{hotelData.reviews} نظر ثبت شده</p>
                            </div>
                        </div>

                        {/* نقشه */}
                        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm h-64 relative z-0">
                            {/* کامپوننت نقشه */}
                            <HotelMap
                                lat={hotelLocation.lat}
                                lng={hotelLocation.lng}
                                popupText="هتل پارسیان آزادی"
                            />

                            {/* دکمه شیشه‌ای روی نقشه برای لینک به گوگل مپ (اختیاری) */}
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${hotelLocation.lat},${hotelLocation.lng}`}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-blue-600 text-xs font-bold py-2 px-3 rounded-lg shadow-md transition-all z-[400] flex items-center gap-1 backdrop-blur-sm"
                            >
                                <MapOutlined fontSize="small" />
                                مسیریابی در گوگل
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            <MobileBookingBar price={hotelData.rooms[0].price} />
        </main>
    );
}

function FacilityItem({ icon, label }: { icon: any, label: string }) {
    return (
        <div className="flex flex-col items-center gap-2 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {icon}
            </div>
            <span className="text-[11px] font-bold text-slate-500 group-hover:text-blue-600">{label}</span>
        </div>
    );
}