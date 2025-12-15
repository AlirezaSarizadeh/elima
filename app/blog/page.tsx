"use client";

import React from "react";
import BlogCard from "./components/BlogCard";
import BlogSidebar from "./components/BlogSidebar";
import FeaturedPost from "./components/FeaturedPost"; // ✅ کامپوننت اضافه شده
import { EmailOutlined } from "@mui/icons-material";

// --- داده‌های نمونه ---
const heroPost = {
  title: "سفر به ناشناخته‌ها: راهنمای جامع طبیعت‌گردی در جنوب ایران",
  summary: "سواحل مکران، جزایر بکر و کوه‌های مریخی. در این مقاله به بررسی جاذبه‌های کمتر دیده شده جنوب ایران می‌پردازیم که هر گردشگری باید یک بار ببیند. اگر به دنبال هیجان هستید، این مطلب برای شماست.",
  image: "/images/blog-1.webp",
  date: "۱۸ مهر ۱۴۰۳",
  readTime: "۸ دقیقه",
  category: "پیشنهاد سردبیر",
  slug: "south-iran-nature"
};

const posts = [
  { id: 1, title: "۱۰ نکته طلایی برای سفر ارزان به استانبول", excerpt: "اگر قصد سفر به استانبول را دارید و می‌خواهید هزینه‌های خود را مدیریت کنید، این مقاله را از دست ندهید...", image: "/images/blog-1.webp", category: "راهنمای سفر", date: "۱۴۰۳/۰۷/۱۵", author: "سارا امینی", slug: "istanbul-cheap-travel" },
  { id: 2, title: "مدارک لازم برای ویزای شینگن در سال ۲۰۲۴", excerpt: "جدیدترین تغییرات قوانین سفارت‌خانه‌ها برای صدور ویزای شینگن و مدارکی که نباید فراموش کنید.", image: "/images/blog-1.webp", category: "ویزا", date: "۱۴۰۳/۰۷/۱۰", author: "علی رضایی", slug: "schengen-visa-docs" },
  { id: 3, title: "معرفی بهترین هتل‌های دبی برای خانواده‌ها", excerpt: "بررسی هتل‌هایی که امکانات ویژه کودکان و خانواده دارند همراه با قیمت و دسترسی.", image: "/images/blog-1.webp", category: "معرفی هتل", date: "۱۴۰۳/۰۷/۰۵", author: "مریم کمالی", slug: "dubai-family-hotels" },
  { id: 4, title: "چگونه در سفرهای طولانی خسته نشویم؟", excerpt: "تکنیک‌هایی برای لذت بردن از پروازهای طولانی مدت و جلوگیری از جت‌لگ.", image: "/images/blog-1.webp", category: "دانستنی‌ها", date: "۱۴۰۳/۰۶/۳۰", author: "کوروش صفایی", slug: "long-flight-tips" },
];

export default function BlogHome() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20" dir="rtl">
      
      {/* --- ۱. بخش هدر و پست ویژه --- */}
      <section className="bg-white border-b border-gray-200 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl px-4">
             {/* استفاده از کامپوننت FeaturedPost */}
             <FeaturedPost post={heroPost} />
        </div>
      </section>

      {/* --- ۲. محتوای اصلی --- */}
      <div className="container mx-auto px-0 max-w-7xl px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* ستون پست‌ها (۳ واحد) */}
              <main className="lg:col-span-3">
                  
                  {/* عنوان بخش */}
                  <div className="flex justify-between items-end mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 relative inline-block">
                          آخرین مطالب مجله
                          <span className="absolute -bottom-3 right-0 w-2/3 h-1 bg-blue-600 rounded-full   shadow-blue-200"></span>
                      </h2>
                  </div>

                  {/* گرید کارت‌ها */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                      {posts.map((post) => (
                          <BlogCard key={post.id} post={post} />
                      ))}
                  </div>

              </main>

              {/* ستون سایدبار (۱ واحد) */}
              <aside className="hidden lg:block lg:col-span-1 h-full">
                  <BlogSidebar />
              </aside>

          </div>
      </div>
    </div>
  );
}