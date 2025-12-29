"use client";

import React from "react";
import Image from "next/image";
import { AccessTime, CalendarMonth, VerifiedUser } from "@mui/icons-material";

export default function LicenseHeader() {
  return (
    <div className="relative bg-gradient-to-r from-sky-950 to-sky-900 rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8 text-white overflow-hidden">
      {/* پترن پس‌زمینه */}
      <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-white opacity-5 rounded-full -mr-10 -mt-10 md:-mr-16 md:-mt-16" />
      <div className="absolute bottom-0 left-0 w-28 h-28 md:w-40 md:h-40 bg-white opacity-5 rounded-full -ml-6 -mb-6 md:-ml-10 md:-mb-10" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-5 md:gap-6">
        {/* عنوان و آیکون */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 flex-1">
          <div className="relative w-14 h-14 md:w-20 md:h-20 overflow-hidden rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Image
              src="/images/emirates-flag.svg"
              alt="international driving license"
              fill
              className="object-contain p-2 "
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug">
                گواهینامه بین‌المللی رانندگی
              </h1>
              <span className="text-[11px] sm:text-xs md:text-sm bg-white/10 px-2 py-0.5 rounded-lg">
                معتبر در بیش از ۱۵۰ کشور
              </span>
            </div>

            <div className="flex items-start sm:items-center gap-1 text-[11px] sm:text-sm text-sky-100/90 max-w-xl">
              <VerifiedUser fontSize="small" className="mt-[1px]" />
              <span>صدور رسمی و امکان پیگیری آنلاین وضعیت درخواست</span>
            </div>
          </div>
        </div>

        {/* کارت‌های اطلاعاتی */}
        <div className="w-full md:w-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:flex md:flex-wrap justify-stretch md:justify-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex items-center gap-3 w-full md:w-auto">
              <div className="bg-white text-sky-700 p-1.5 rounded-full flex items-center justify-center">
                <CalendarMonth fontSize="small" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-sky-100/80">زمان صدور</span>
                <span className="font-bold text-sm">۳ تا ۵ روز کاری</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex items-center gap-3 w-full md:w-auto">
              <div className="bg-white text-sky-700 p-1.5 rounded-full flex items-center justify-center">
                <AccessTime fontSize="small" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-sky-100/80">مدت اعتبار</span>
                <span className="font-bold text-sm">۱، ۳ یا ۵ سال</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex items-center gap-3 w-full md:w-auto">
              <div className="bg-white text-sky-700 p-1.5 rounded-full flex items-center justify-center">
                <VerifiedUser fontSize="small" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-sky-100/80">نوع مدرک</span>
                <span className="font-bold text-sm">دفترچه + کارت پلاستیکی</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
