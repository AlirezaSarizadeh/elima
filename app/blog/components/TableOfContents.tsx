"use client";

import React from "react";
import { List, ArticleOutlined } from "@mui/icons-material";
import Link from "next/link";

// تعریف ساختار آیتم‌های فهرست
interface TocItem {
  id: string;
  title: string;
  level: 1 | 2 | 3; // برای ایجاد تورفتگی
}

export default function TableOfContents({ headings }: { headings: TocItem[] }) {
  return (
    // ✅ تغییر: اضافه کردن z-20 برای قرار گرفتن روی سایر المان‌ها هنگام اسکرول
    <div className="bg-white rounded-3xl border border-gray-200 p-6   sticky top-4 z-20 transition-all hover:shadow-md">
      
      {/* هدر */}
      <div className="flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
        <List className="text-blue-600" />
        <h4 className="font-bold text-gray-800 text-lg">آنچه در این مطلب می‌خوانید</h4>
      </div>

      {/* لیست لینک‌ها */}
      <nav>
        <ul className="space-y-0 relative border-r-2 border-gray-200 mr-2">
          {headings.map((item, index) => (
            <li key={index} className="relative">
              {/* نقطه اتصال به خط */}
              <span 
                className={`absolute -right-[7px] top-3 w-3 h-3 rounded-full border-2 bg-white transition-colors duration-300
                    ${index === 0 ? "border-blue-600 bg-blue-600" : "border-gray-300 hover:border-blue-400"}
                `}
              ></span>
              
              <Link 
                href={`#${item.id}`}
                className={`block py-2 pr-6 text-sm transition-all duration-200 hover:text-blue-600
                    ${item.level === 1 ? "font-bold text-gray-800" : ""}
                    ${item.level === 2 ? "font-medium text-gray-600 pr-8 text-xs" : ""}
                    ${index === 0 ? "text-blue-600" : ""}
                `}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* دکمه دعوت به اقدام کوچک (اختیاری) */}
      <div className="mt-6 bg-blue-50 rounded-xl p-4 flex items-start gap-3">
        <ArticleOutlined className="text-blue-500 mt-1" fontSize="small" />
        <div>
            <p className="text-xs text-blue-800 font-bold mb-1">محتوای مفید بود؟</p>
            <p className="text-[10px] text-blue-600/80">با اشتراک‌گذاری این مطلب به دوستانتان کمک کنید.</p>
        </div>
      </div>

    </div>
  );
}