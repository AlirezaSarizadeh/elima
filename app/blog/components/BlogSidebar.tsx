"use client";
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search, LocalFireDepartment, Tag } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

export default function BlogSidebar() {
  return (
    <div className="flex flex-col gap-6 sticky top-4">
      
      {/* باکس جستجو */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200  ">
        <h4 className="font-bold text-gray-800 mb-4">جستجو در مجله</h4>
        <TextField 
            fullWidth 
            placeholder="دنبال چی میگردی؟" 
            variant="outlined" 
            size="small"
            InputProps={{
                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                style: { borderRadius: '12px', backgroundColor: '#f9fafb' }
            }}
        />
      </div>

      {/* دسته‌بندی‌ها */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200  ">
         <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            دسته‌بندی‌ها
         </h4>
         <div className="flex flex-col gap-1">
            {['راهنمای سفر', 'معرفی هتل‌ها', 'دانستنی‌های ویزا', 'اخبار گردشگری', 'جاذبه‌های دیدنی'].map((cat, i) => (
                <Link key={i} href="#" className="flex justify-between items-center py-2 px-2 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium group">
                    <span>{cat}</span>
                    <span className="bg-gray-200 text-gray-400 text-xs px-2 py-0.5 rounded-md group-hover:bg-white group-hover:text-blue-500 transition-colors">۱۲</span>
                </Link>
            ))}
         </div>
      </div>

      {/* پست‌های محبوب */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200  ">
         <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <LocalFireDepartment className="text-orange-500" />
            محبوب‌ترین‌ها
         </h4>
         <div className="flex flex-col gap-4">
             {[1, 2, 3].map((i) => (
                 <div key={i} className="flex gap-3 group cursor-pointer">
                     <div className="w-16 h-16 bg-gray-200 rounded-xl shrink-0 overflow-hidden relative">
                         <Image src={'/images/blog-2.webp'} width={48} height={48} alt="test" className="w-full h-full o" />
                         <div className="w-full h-full bg-gray-300 group-hover:scale-110 transition-transform duration-500"></div>
                     </div>
                     <div>
                         <h5 className="text-xs font-bold text-gray-800 leading-5 mb-1 group-hover:text-blue-600 transition-colors">راهنمای جامع سفر به دبی با کمترین هزینه</h5>
                         <span className="text-[10px] text-gray-400">۲ ساعت پیش</span>
                     </div>
                 </div>
             ))}
         </div>
      </div>

      {/* تگ‌ها */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200  ">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Tag className="text-gray-400" />
            برچسب‌ها
         </h4>
         <div className="flex flex-wrap gap-2">
             {['تور ارزان', 'ویزای شینگن', 'هتل ۵ ستاره', 'سفر نوروزی', 'بلیط چارتر'].map((tag, i) => (
                 <span key={i} className="bg-gray-50 text-gray-500 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                     #{tag}
                 </span>
             ))}
         </div>
      </div>

    </div>
  );
}