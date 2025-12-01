"use client";

import Link from "next/link";

interface HotelCardProps {
    title: string;
    image: string;
    rating: number;
    location: string;
    remaining: number;
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
        <Link href={'#!'} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full block">

            {/* Image */}
            <img
                src={image}
                alt={title}
                className="w-full h-2/3 object-cover rounded-t-2xl"
            />

            {/* Card Content */}
            <div className="p-4 space-y-3 h-1/3">


                {/* Meta Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>

                    <div className="flex items-center justify-between gap-2">
                        {/* Rating */}
                        <span className="bg-blue-100 text-black-500 text-xs px-2 py-1 rounded-xl flex items-center gap-1">
                            <img src={'/images/Star.svg'} />
                            {rating}
                        </span>

                        {/* Location */}
                        <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-xl flex items-center gap-1">
                            <img src={'/images/Location.svg'} />
                            {location}
                        </span>

                        {/* Remaining */}
                        {/* <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-xl flex items-center gap-1">
                            <img src={'/images/Location.png'} />
                            {remaining} نفر باقیمانده
                        </span> */}
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
                        <img src={'/images/Price.svg'} alt="تومان" className="object-scale-down" />
                    </div>
                </div>

                {/* Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl text-center font-medium mt-3">
                    مشاهده جزئیات و رزرو
                </button>

            </div>
        </Link>
    );
};

export default HotelCard;
