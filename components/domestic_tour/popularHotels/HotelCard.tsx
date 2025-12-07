"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";

interface HotelCardProps {
    title: string;
    image: string;
    rating: number;
    location: string;
    remaining?: number; // Made optional
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
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full">
            {/* Image */}
            <div className="relative h-64">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
                {/* Meta Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    {/* Title */}
                    <h3 className="text-ls font-bold text-gray-800">{title}</h3>

                    <div className="flex items-center justify-between gap-2">
                        {/* Rating */}
                        <span className="bg-blue-100 text-gray-700 text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge">
                            <Image src={'/images/Star.svg'} alt="Rating" width={12} height={12} />
                            {rating}
                        </span>

                        {/* Location */}
                        <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge">
                            <Image src={'/images/Location.svg'} alt="Location" width={12} height={12} />
                            {location}
                        </span>

                        {/* Remaining - Uncomment if needed */}
                        {remaining && (
                            <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge">
                                <Image src={'/images/Location.svg'} alt="Remaining" width={12} height={12} />
                                {remaining} نفر باقیمانده
                            </span>
                        )}
                    </div>
                </div>

                {/* Nights & Days */}
                <p className="text-gray-600 text-sm">
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

                {/* Button */}
                <Link href={'#!'} className="block w-full">
                    {/* <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl text-center font-medium">
                        مشاهده جزئیات و رزرو
                    </button> */}
                    <Button variant="contained" className="w-full" sx={{
                        padding:'10px',
                        borderRadius:'10px'
                    }}>رزرو و مشاهده جزییات</Button>
                </Link>
                
            </div>
        </div>
    );
};

export default HotelCard;