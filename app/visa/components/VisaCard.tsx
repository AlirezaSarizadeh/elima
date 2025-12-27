"use client";

import { AccessTime, VerifiedUserOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

interface VisaCardProps {
  title: string;
  price: number;
  image: string;
  // این‌ها رو برای گواهینامه استفاده می‌کنیم:
  // processingTime = زمان صدور
  // visaType = نوع پکیج (مثلاً یک‌ساله، سه‌ساله و ...)
  processingTime?: string;
  visaType?: string;
}

const VisaCard = ({
  title,
  price,
  image,
  processingTime = "۳ تا ۵ روز کاری",
  visaType = "پکیج استاندارد ۱ ساله",
}: VisaCardProps) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-3 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* بخش تصویر */}
      <div className="relative h-48 w-full rounded-2xl overflow-hidden shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* روبان نوع پکیج روی تصویر */}
        <div className="absolute top-3 right-3 bg-blue-600/90 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <span>گواهینامه بین‌المللی</span>
          <span className="text-[9px] text-blue-100">· {visaType}</span>
        </div>
      </div>

      {/* بخش محتوا */}
      <div className="pt-4 px-1 flex flex-col flex-1 justify-between">
        {/* هدر: عنوان و بج اعتبار */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-6 line-clamp-2">
            {title}
          </h3>

          {/* بج اعتبار بین‌المللی */}
          <div className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 whitespace-nowrap">
            <VerifiedUserOutlined style={{ fontSize: 14 }} />
            <span>اعتبار بین‌المللی</span>
          </div>
        </div>

        {/* زمان صدور گواهینامه */}
        <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
          <AccessTime style={{ fontSize: 16 }} className="text-gray-400" />
          <span>زمان صدور: {processingTime}</span>
        </div>

        {/* قیمت */}
        <div className="flex flex-col items-end gap-1 mb-4">
          <span className="text-gray-400 text-[11px]">
            هزینه صدور برای هر نفر
          </span>
          <div className="flex items-center gap-1 text-blue-600 font-bold text-lg">
            {price.toLocaleString()}
            <span className="text-xs font-normal text-gray-400">تومان</span>
          </div>
        </div>

        {/* دکمه پایین */}
        <Link href={"/license/apply"} className="block w-full">
          <Button
            variant="contained"
            className="w-full"
            sx={{
              padding: "10px",
              borderRadius: "10px",
              fontFamily: "inherit",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
            }}
          >
            درخواست گواهینامه
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VisaCard;
