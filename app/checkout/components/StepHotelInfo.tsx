"use client";

import React from "react";
import { 
    HotelOutlined, 
    CalendarMonthOutlined, 
    BedOutlined, 
    ApartmentOutlined,
    LoginOutlined,
    LogoutOutlined
} from "@mui/icons-material";
import Title from "../../../components/ui/Title/Title";

export default function StepHotelInfo() {
  return (
    <div className="flex flex-col gap-4 mt-6 ">
      
      {/* هدر بخش */}
      <div className="flex justify-start items-center gap-2">
      <Title icon={<img src='/images/hotel-icon.svg'/>} title="مشخصات هتل" />
      </div>

      {/* کارت اطلاعات */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* تاریخ ورود */}
            <InfoBox 
                label="تاریخ ورود" 
                value="۱۴۰۳/۰۷/۱۸" 
                subValue="ساعت ۰۰:۳۰"
                icon={<LoginOutlined fontSize="small" />}
            />

            {/* تاریخ خروج */}
            <InfoBox 
                label="تاریخ خروج" 
                value="۱۴۰۳/۰۷/۲۱" 
                subValue="ساعت ۱۲:۳۰"
                icon={<LogoutOutlined fontSize="small" />}
            />

            {/* محل اقامت */}
            <InfoBox 
                label="محل اقامت" 
                value="هتل ۴ ستاره میکلو" 
                icon={<HotelOutlined fontSize="small" />}
            />

            {/* نوع اتاق */}
            <InfoBox 
                label="نوع اتاق" 
                value="اتاق دو تخته استاندارد" 
                icon={<BedOutlined fontSize="small" />}
            />

         </div>
      </div>
    </div>
  );
}

// کامپوننت کمکی برای نمایش هر آیتم
function InfoBox({ label, value, subValue, icon }: { label: string, value: string, subValue?: string, icon: React.ReactNode }) {
    return (
        <div className="flex flex-col items-start gap-1 text-right">
            <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                <span>{label}</span>
                {icon}
            </div>
            <span className="font-bold text-gray-800 text-base">{value}</span>
            {subValue && (
                <span className="text-sm text-gray-500 font-medium">{subValue}</span>
            )}
        </div>
    )
}