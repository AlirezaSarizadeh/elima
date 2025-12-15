"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AccessTime, CalendarMonth } from "@mui/icons-material";

// تعریف تایپ برای ورودی
interface FeaturedPostProps {
  title: string;
  summary: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export default function FeaturedPost({ post }: { post: FeaturedPostProps }) {
  return (
    <div className="relative w-full h-[450px] md:h-[500px] rounded-3xl overflow-hidden group shadow-xl shadow-blue-100/50">
      
      {/* 1. تصویر پس‌زمینه با افکت زوم */}
      <Image 
        src={post.image} 
        alt={post.title} 
        fill 
        priority
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
      />
      
      {/* 2. لایه گرادینت برای خوانایی متن */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* 3. محتوای متنی */}
      <div className="absolute bottom-0 right-0 w-full md:w-3/4 p-6 md:p-12 text-white z-10 flex flex-col items-start gap-4">
        
        {/* بج دسته‌بندی */}
        <span className="bg-blue-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold border border-blue-400/30">
          {post.category}
        </span>

        {/* عنوان */}
        <Link href={`/blog/${post.slug}`}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight hover:text-blue-300 transition-colors cursor-pointer">
            {post.title}
            </h1>
        </Link>

        {/* خلاصه کوتاه (فقط دسکتاپ) */}
        <p className="hidden md:block text-gray-200 text-sm md:text-base leading-7 max-w-2xl opacity-90">
            {post.summary}
        </p>

        {/* اطلاعات متا */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-300 font-medium mt-2">
            <div className="flex items-center gap-2">
                <CalendarMonth fontSize="small" />
                <span>{post.date}</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-2">
                <AccessTime fontSize="small" />
                <span>زمان مطالعه: {post.readTime}</span>
            </div>
        </div>

      </div>
    </div>
  );
}