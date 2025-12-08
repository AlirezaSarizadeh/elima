import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FlightIcon from "@mui/icons-material/Flight";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function TourCard({ data }: { data: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row gap-5 hover:shadow-md transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative w-full md:w-[320px] h-52 md:h-auto shrink-0 rounded-xl overflow-hidden group">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white text-gray-500 hover:text-red-500 transition">
          <FavoriteBorderIcon fontSize="small" />
        </button> */}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between py-1">
        {/* Top Part */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-normal text-gray-900 mb-2">{data.title}</h2>
            <div className="flex flex-col gap-2 font-light text-xs text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <CalendarTodayIcon fontSize="inherit" />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <AccessTimeIcon fontSize="inherit" />
                <span>{data.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <HotelIcon fontSize="inherit" />
                <span>هتل {data.hotelStars} ستاره</span>
              </div>
            </div>
          </div>
          {/* Price Desktop */}
          <div className="hidden md:flex flex-col items-end gap-1">
            {data.oldPrice && (
              <span className="text-gray-400 line-through text-sm">{data.oldPrice}</span>
            )}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">شروع قیمت از</span>
              <span className="text-xl font-normal text-blue-600">{data.price}</span>
              <span className="text-xs text-gray-500">
                <Image src={'/images/price.svg'} alt="تومان" width={18} height={18} />
              </span>
            </div>
          </div>
        </div>

        {/* Middle Icons Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 md:my-2">
          <FeatureItem icon={<HotelIcon fontSize="small" />} text={data.details.hotel} label="اقامت" />
          <FeatureItem icon={<RestaurantIcon fontSize="small" />} text={data.details.meals} label="وعده غذایی" />
          <FeatureItem icon={<FlightIcon fontSize="small" className="rotate-90" />} text={data.details.transport} label="حمل و نقل" />
          <FeatureItem icon={<GroupIcon fontSize="small" />} text={data.details.capacityLabel} label="ظرفیت تور" />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-4 mt-auto">
          <div className="flex items-center gap-2 w-full md:w-auto">
            {data.tags.map((tag: string, idx: number) => (
              <span key={idx} className="bg-amber-100 text-amber-700 text-[11px] font-normal px-2 py-1 rounded-md flex items-center gap-1">
                <AccessTimeIcon style={{ fontSize: 12 }} />
                {tag}
              </span>
            ))}
            {data.capacity < 5 && (
              <span className="bg-blue-50 text-blue-600 text-[11px] font-normal px-2 py-1 rounded-md flex items-center gap-0.5">
                <Image src={'/images/remaining-icon.svg'} alt="remaining-icon" width={12} height={12} />
                {data.capacity} نفر باقیمانده
              </span>
            )}
          </div>
          {/* Price Mobile */}
          <div className="flex md:hidden items-center justify-between w-full">
            <span className="text-lg font-normal text-blue-600">{data.price} <span className="text-xs font-normal text-gray-500">تومان</span></span>
          </div>
          <Button
            variant="contained"
            fullWidth
            className="md:!w-auto rounded-lg px-6 py-2 font-normal"
            disableElevation
            sx={{
              borderRadius: '10px'
            }}
          >
            مشاهده جزئیات و رزرو
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text, label }: any) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg bg-gray-50 border border-gray-200">
      <span className="text-gray-400 mb-1">{icon}</span>
      <span className="text-[10px] text-gray-400 mb-0.5">{label}</span>
      <span className="text-[11px] font-normal text-blue-800 line-clamp-1">{text}</span>
    </div>
  );
}