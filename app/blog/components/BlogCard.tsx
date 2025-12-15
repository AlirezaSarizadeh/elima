"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AccessTime, PersonOutline, ArrowBack } from "@mui/icons-material";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  slug: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 flex flex-col h-full">
      
      {/* تصویر */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* بج دسته‌بندی */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600  ">
          {post.category}
        </div>
      </div>

      {/* محتوا */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* متا دیتا */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
           <div className="flex items-center gap-1">
              <CalendarMonthIcon className="text-gray-300 !text-[14px]" />
              <span>{post.date}</span>
           </div>
           <div className="flex items-center gap-1">
              <PersonOutline className="text-gray-300 !text-[16px]" />
              <span>{post.author}</span>
           </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        
        <p className="text-sm text-gray-500 leading-7 line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>

        {/* دکمه ادامه مطلب */}
        <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-blue-600 font-bold text-sm mt-auto group/btn">
            ادامه مطلب
            <ArrowBack fontSize="small" className="transition-transform group-hover/btn:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function CalendarMonthIcon({className}: {className?: string}) {
    return <AccessTime className={className} /> // آیکون جایگزین برای سادگی
}