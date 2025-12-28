"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";

const sortOptions = [
  { id: "luxury", label: "لوکس‌ترین" },
  { id: "special", label: "تورهای ویژه" },
  { id: "date", label: "نزدیک‌ترین تاریخ" },
  { id: "cheap", label: "ارزان‌ترین" },
];

export default function SortBar() {
  const [activeSort, setActiveSort] = useState("luxury");

  return (
    <div className="flex items-center gap-3 w-full overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
      {/* متن ثابت (مخفی در موبایل) */}
      <span className="font-semibold text-gray-800 text-sm whitespace-nowrap hidden md:flex items-center gap-2 ml-2">
        <Image
          alt="sort-icon"
          src={"/images/sort-icon.svg"}
          width={24}
          height={24}
        />
        مرتب‌سازی بر اساس
      </span>

      {/* گزینه‌های مرتب‌سازی */}
      <div className="flex gap-2 min-w-max">
        {sortOptions.map((item) => {
          const isActive = activeSort === item.id;

          return (
            <Button
              key={item.id}
              onClick={() => setActiveSort(item.id)}
              variant="text"
              disableElevation
              size="small"
              sx={{
                textTransform: "none",
                fontFamily: "inherit",
              }}
              className={`!rounded-xl !px-4 !py-2 !text-[13px] whitespace-nowrap transition-all
                ${
                  isActive
                    ? "bg-blue-100 border border-transparent text-blue-500 cursor-pointer font-medium"
                    : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-200 cursor-pointer"
                }`}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
