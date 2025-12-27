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
  price,
}: HotelCardProps) => {
  return (
    // کارت: فلکس ستونی + پر کردن ارتفاع والد
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full h-full flex flex-col transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 shrink-0">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 md:p-5 space-y-3 flex flex-col flex-1">
        {/* بالای محتوا: عنوان + بج‌ها */}
        <div>
          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 truncate">
            {title}
          </h3>

          {/* Meta Badges */}
          <div className="flex items-center justify-start gap-2 flex-wrap min-h-[32px]">
            {/* Rating */}
            <span className="bg-blue-100 text-gray-700 text-[10px] sm:text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge whitespace-nowrap">
              <Image
                src={"/images/Star.svg"}
                alt="Rating"
                width={12}
                height={12}
              />
              {rating}
            </span>

            {/* Location */}
            <span className="bg-blue-100 text-blue-500 text-[10px] sm:text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge whitespace-nowrap">
              <Image
                src={"/images/Location.svg"}
                alt="Location"
                width={12}
                height={12}
              />
              {location}
            </span>

            {/* Remaining */}
            {typeof remaining === "number" && remaining > 0 && (
              <span className="bg-blue-100 text-blue-500 text-[10px] sm:text-xs px-2 py-1 rounded-xl flex items-center gap-1 c-badge whitespace-nowrap">
                <Image
                  src={"/images/Location.svg"}
                  alt="Remaining"
                  width={12}
                  height={12}
                />
                {remaining} نفر
              </span>
            )}
          </div>
        </div>

        {/* Nights & Days */}
        <p className="text-gray-600 text-xs sm:text-sm mt-1.5">
          {nights} شب و {days} روز
        </p>

        {/* Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-1">
          <span className="text-gray-500 text-[11px] sm:text-sm">
            شروع قیمت برای هر نفر
          </span>
          <div className="text-blue-600 font-normal text-base sm:text-lg flex items-center gap-1">
            {price.toLocaleString()}
            <Image
              src={"/images/Price.svg"}
              alt="تومان"
              width={16}
              height={16}
            />
          </div>
        </div>

        {/* Button Wrapper */}
        <div className="mt-auto pt-3 sm:pt-4">
          <Link href={"#!"} className="block w-full">
            <Button
              variant="contained"
              className="w-full"
              sx={{
                padding: "10px",
                borderRadius: "10px",
                fontFamily: "inherit", // برای فونت فارسی
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
              }}
            >
              رزرو و مشاهده جزییات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
