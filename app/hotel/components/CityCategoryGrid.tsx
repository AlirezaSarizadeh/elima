"use client";

import React from "react";
import {
  Apartment,
  Mosque,
  BeachAccess,
  Landscape,
  FlashOnOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import Title from "../../../components/ui/Title/Title";

const categories = [
  {
    id: 1,
    title: "هتل‌های مشهد",
    count: "۱۲۴ هتل",
    icon: <Mosque fontSize="large" />,
    color: "bg-blue-50 text-blue-600",
    link: "#",
  },
  {
    id: 2,
    title: "هتل‌های کیش",
    count: "۸۵ هتل",
    icon: <BeachAccess fontSize="large" />,
    color: "bg-orange-50 text-orange-500",
    link: "#",
  },
  {
    id: 3,
    title: "هتل‌های تهران",
    count: "۲۱۰ هتل",
    icon: <Apartment fontSize="large" />,
    color: "bg-purple-50 text-purple-600",
    link: "#",
  },
  {
    id: 4,
    title: "هتل‌های شمال",
    count: "۱۵۰ هتل",
    icon: <Landscape fontSize="large" />,
    color: "bg-green-50 text-green-600",
    link: "#",
  },
  {
    id: 5,
    title: "هتل‌های شیراز",
    count: "۶۵ هتل",
    icon: <Mosque fontSize="large" />,
    color: "bg-pink-50 text-pink-500",
    link: "#",
  },
  {
    id: 6,
    title: "هتل‌های اصفهان",
    count: "۹۰ هتل",
    icon: <Apartment fontSize="large" />,
    color: "bg-cyan-50 text-cyan-600",
    link: "#",
  },
  {
    id: 7,
    title: "هتل‌های تبریز",
    count: "۵۵ هتل",
    icon: <Landscape fontSize="large" />,
    color: "bg-red-50 text-red-500",
    link: "#",
  },
  {
    id: 8,
    title: "هتل‌های یزد",
    count: "۴۰ هتل",
    icon: <Apartment fontSize="large" />,
    color: "bg-amber-50 text-amber-600",
    link: "#",
  },
];

export default function CityCategoryGrid() {
  return (
    <section className="py-0 md:py-10 lg:py-12">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        dir="rtl"
      >
        <Title
          title="دسترسی سریع به هتل ها"
          icon={<FlashOnOutlined className="text-blue-500" />}
        />

        <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="
                group bg-white border border-gray-200 
                rounded-2xl 
                p-3 sm:p-4 lg:p-5 
                flex flex-col sm:flex-row 
                items-start sm:items-center 
                gap-3 sm:gap-4
                transition-all duration-300
                hover:border-blue-100 hover:shadow-md hover:-translate-y-0.5
              "
            >
              <div
                className={`
                  flex items-center justify-center 
                  rounded-2xl 
                  ${cat.color} 
                  w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
                  shrink-0
                  transition-transform duration-300
                  group-hover:scale-105
                `}
              >
                {cat.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className="
                    font-bold text-gray-800 
                    text-xs sm:text-sm lg:text-base 
                    leading-6
                    truncate
                    group-hover:text-blue-600 
                    transition-colors
                  "
                  title={cat.title}
                >
                  {cat.title}
                </h4>
                <span className="text-[10px] sm:text-xs text-gray-400 mt-1 block">
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
