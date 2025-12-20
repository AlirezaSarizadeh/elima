"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";

interface HotelCardProps {
    title: string;
    image: string;
    rating: number;
    location: string;
    remaining?: number;
    nights: number;
    days: number;
    price: number;
}

const HotelCard = ({
    title,
    image,
    rating,
    location,
    remaining,
    nights,
    days,
    price
}: HotelCardProps) => {
    return (
        // *** تغییر ۱: اضافه کردن h-full و flex flex-col به نگهدارنده اصلی
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full h-full flex flex-col transition-all hover:shadow-lg">

            {/* Image */}
            <div className="relative h-64 shrink-0"> {/* *** اضافه کردن shrink-0 برای جلوگیری از له شدن عکس */}
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Card Content */}
            {/* *** تغییر ۲: اضافه کردن flex-1 و flex flex-col برای مدیریت فضا */}
            <div className="p-4 space-y-3 flex flex-col flex-1">

                {/* بخش بالای محتوا (تایتل و بج‌ها) */}
                <div>
                    {/* Title */}
                    {/* پیشنهاد: محدود کردن تایتل به ۱ خط برای نظم بیشتر (اختیاری) */}
                    <h3 className="text-ls font-bold text-gray-800 mb-2 truncate">{title}</h3>

                    {/* Meta Badges */}
                    {/* *** پیشنهاد: یک حداقل ارتفاع (min-h) به این بخش بدهید تا پرش layout کمتر شود */}
                    <div className="flex items-center justify-start gap-2 flex-wrap min-h-[32px]">
                        {/* Rating */}
                        <span className="bg-blue-100 text-gray-700 text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge whitespace-nowrap">
                            <Image src={'/images/Star.svg'} alt="Rating" width={12} height={12} />
                            {rating}
                        </span>

                        {/* Location */}
                        <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge whitespace-nowrap">
                            <Image src={'/images/Location.svg'} alt="Location" width={12} height={12} />
                            {location}
                        </span>

                        {/* Remaining */}
                        {remaining && (
                            <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge whitespace-nowrap">
                                <Image src={'/images/Location.svg'} alt="Remaining" width={12} height={12} />
                                {remaining} نفر
                            </span>
                        )}
                    </div>
                </div>

                {/* Nights & Days */}
                <p className="text-gray-600 text-sm mt-2">
                    {nights} شب و {days} روز
                </p>

                {/* Price */}
                <div className="flex items-center justify-start gap-2">
                    <span className="text-gray-500 text-sm">شروع قیمت برای هر نفر</span>
                    <div className="text-blue-600 font-normal text-lg flex items-center justify-center gap-1">
                        {price.toLocaleString()}
                        <Image src={'/images/Price.svg'} alt="تومان" width={16} height={16} />
                    </div>
                </div>

                {/* Button Wrapper */}
                {/* *** تغییر ۳: استفاده از mt-auto برای هل دادن دکمه به پایین‌ترین نقطه */}
                <div className="mt-auto pt-4">
                    <Link href={'#!'} className="block w-full">
                        <Button variant="contained" className="w-full" sx={{
                            padding: '10px',
                            borderRadius: '10px',
                            fontFamily: 'inherit' // برای اطمینان از فونت فارسی
                        }}>
                            رزرو و مشاهده جزییات
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default HotelCard;