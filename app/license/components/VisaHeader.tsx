"use client";

import React from "react";
import Image from "next/image";
import { AccessTime, CalendarMonth, VerifiedUser } from "@mui/icons-material";
import { Chip } from "@mui/material";

export default function VisaHeader() {
  return (
    <div className="relative bg-gradient-to-r from-blue-950 to-blue-900 rounded-3xl p-8 mb-8 text-white shadow-2xl overflow-hidden">
      
      {/* پترن پس‌زمینه تزئینی */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* عنوان و پرچم */}
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden ">
             <Image src="/images/emirates-flag.svg" alt="UAE" fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">ویزای دبی</h1>
                <span className="text-blue-100 text-sm bg-white/10 px-2 py-0.5 rounded-lg">امارات متحده عربی</span>
            </div>
            <div className="flex items-center gap-1 text-blue-100 text-sm">
                <VerifiedUser fontSize="small" />
                <span>گارانتی بازگشت وجه در صورت عدم صدور (طبق قوانین)</span>
            </div>
          </div>
        </div>

        {/* چیپ‌های اطلاعاتی */}
        <div className="flex flex-wrap justify-center gap-3">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex items-center gap-3">
               <div className="bg-white text-blue-600 p-1.5 rounded-full flex items-center justify-center">
                   <CalendarMonth fontSize="small" />
               </div>
               <div className="flex flex-col">
                   <span className="text-xs text-blue-200">زمان پردازش</span>
                   <span className="font-bold text-sm">۱ تا ۳ روز کاری</span>
               </div>
           </div>

           <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex items-center gap-3">
               <div className="bg-white text-blue-600 p-1.5 rounded-full flex items-center justify-center">
                   <AccessTime fontSize="small" />
               </div>
               <div className="flex flex-col">
                   <span className="text-xs text-blue-200">مدت اعتبار</span>
                   <span className="font-bold text-sm">۵۸ روز</span>
               </div>
           </div>
        </div>

      </div>
    </div>
  );
}