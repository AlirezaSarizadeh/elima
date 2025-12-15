"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogSidebar from "../components/BlogSidebar";
import TableOfContents from "../components/TableOfContents"; // ✅ کامپوننت اضافه شده
import { CalendarMonth, Person, AccessTime, Share, FavoriteBorder, ArrowBack } from "@mui/icons-material";

// داده‌های نمونه برای فهرست مطالب
const tocItems = [
    { id: "intro", title: "مقدمه", level: 1 as const },
    { id: "time", title: "۱. زمان مناسب سفر", level: 1 as const },
    { id: "weather", title: "بررسی آب و هوا", level: 2 as const },
    { id: "food", title: "۲. غذاهای خیابانی ارزان", level: 1 as const },
    { id: "transport", title: "۳. حمل و نقل عمومی", level: 1 as const },
    { id: "conclusion", title: "جمع‌بندی", level: 1 as const },
];

export default function SingleBlogPost({ params }: { params: { slug: string } }) {
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
        
        {/* --- ۱. هدر مقاله (Minimal & Clean) --- */}
        <div className="bg-white border-b border-gray-200 pt-10 pb-14">
            <div className="container mx-auto px-0 max-w-4xl text-center">
                 <div className="flex justify-center gap-2 mb-6">
                    <span className="text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1 rounded-full border border-blue-100">راهنمای سفر</span>
                    <span className="text-gray-500 font-medium text-xs bg-gray-50 px-3 py-1 rounded-full border border-gray-200">استانبول</span>
                 </div>
                 
                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-8">
                     ۱۰ نکته طلایی برای سفر ارزان به استانبول که آژانس‌ها به شما نمی‌گویند
                 </h1>
                 
                 <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 font-medium">
                     <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                             <Image src="/images/avatar-1.png" width={32} height={32} alt="Author" />
                         </div>
                         <span>سارا امینی</span>
                     </div>
                     <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                     <div className="flex items-center gap-2">
                         <CalendarMonth sx={{ fontSize: 18 }} />
                         <span>۱۵ مهر ۱۴۰۳</span>
                     </div>
                     <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                     <div className="flex items-center gap-2">
                         <AccessTime sx={{ fontSize: 18 }} />
                         <span>خواندن: ۶ دقیقه</span>
                     </div>
                 </div>
            </div>
        </div>

        {/* --- ۲. بدنه اصلی --- */}
        <div className="container mx-auto px-0 max-w-7xl px-4 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* ستون محتوا (۸ واحد) */}
                <main className="lg:col-span-8 lg:col-start-1">
                    
                    <div className="bg-white rounded-[32px] p-6 md:p-10 border border-gray-200   mb-10">
                        
                        {/* تصویر شاخص */}
                        <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-10 shadow-md">
                            <Image src="/images/blog-111.webp" alt="Istanbul" fill className="object-cover" priority />
                        </div>

                        {/* متن مقاله */}
                        <article className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-p:leading-9 prose-p:text-justify prose-a:text-blue-600 prose-img:rounded-2xl max-w-none">
                            <p className="font-medium text-xl text-gray-800 mb-6 leading-9" id="intro">
                                استانبول شهری است که هر بار به آن سفر کنید، چیزی جدید برای کشف کردن دارد. اما هزینه‌های سفر می‌تواند چالش‌برانگیز باشد. در این مقاله قصد داریم تجربیات واقعی مسافران را بررسی کنیم.
                            </p>
                            
                            <h2 id="time" className="scroll-mt-24">۱. زمان مناسب را انتخاب کنید</h2>
                            <p>
                                فصل‌های شلوغ مثل تابستان و نوروز، گران‌ترین زمان برای سفر هستند. اگر در پاییز یا اواخر زمستان سفر کنید، قیمت هتل‌ها گاهی تا نصف کاهش می‌یابد.
                            </p>
                            
                            {/* باکس نقل قول / نکته */}
                            <div className="bg-blue-50 border-r-4 border-blue-600 p-6 rounded-2xl my-8">
                                <h4 className="font-bold text-blue-800 text-lg mb-2 flex items-center gap-2">
                                    💡 نکته حرفه‌ای:
                                </h4>
                                <p className="text-blue-900/80 text-sm m-0 leading-7">
                                    پروازهای وسط هفته (دوشنبه و سه شنبه) معمولاً ارزان‌تر از پروازهای آخر هفته هستند. سعی کنید بلیط خود را حداقل ۳ هفته زودتر رزرو کنید.
                                </p>
                            </div>

                            <h3 id="weather" className="scroll-mt-24">بررسی آب و هوا</h3>
                            <p>
                                قبل از رزرو حتما آب و هوا را چک کنید. استانبول بادهای شدیدی دارد و در زمستان ممکن است بارندگی زیاد باشد.
                            </p>

                            <h2 id="food" className="scroll-mt-24">۲. غذاهای خیابانی را دست کم نگیرید</h2>
                            <p>
                                رستوران‌های لوکس تکسیم را فراموش کنید. بهترین دونر کباب‌ها و سیمیت‌ها را می‌توانید در دکه‌های خیابانی با قیمت بسیار مناسب پیدا کنید.
                            </p>
                        </article>

                        {/* تگ‌ها و تعامل */}
                        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-wrap gap-2">
                                {['استانبول', 'سفر ارزان', 'ترکیه', 'بلیط هواپیما'].map(tag => (
                                    <span key={tag} className="bg-gray-50 text-gray-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">#{tag}</span>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                                    <FavoriteBorder />
                                    <span className="text-sm font-bold">پسندیدم</span>
                                </button>
                                <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                                    <Share />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* مقالات مرتبط (خلاقیت اضافه شده) */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            شاید این مطالب را هم دوست داشته باشید
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {[1, 2].map((i) => (
                                 <Link key={i} href="#" className="bg-white rounded-2xl border border-gray-200 p-4 flex gap-4 hover:shadow-md transition-shadow group">
                                     <div className="w-24 h-24 bg-gray-200 rounded-xl shrink-0 overflow-hidden relative">
                                         <Image src={'/images/blog-1.webp'} className="w-full h-full" width={50} height={50} alt="pic" />
                                         <div className="w-full h-full bg-gray-300 group-hover:scale-110 transition-transform"></div>
                                     </div>
                                     <div className="flex flex-col justify-center">
                                         <span className="text-xs text-blue-600 font-bold mb-1">راهنمای سفر</span>
                                         <h4 className="font-bold text-gray-800 text-sm leading-6 mb-2 group-hover:text-blue-600 transition-colors">بهترین مراکز خرید وان ترکیه کجاست؟</h4>
                                         <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                             <AccessTime sx={{ fontSize: 12 }} />
                                             <span>۴ دقیقه مطالعه</span>
                                         </div>
                                     </div>
                                 </Link>
                             ))}
                        </div>
                    </div>

                </main>

                {/* ستون سایدبار (۴ واحد) */}
                <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-4">
                    
                    {/* فهرست مطالب (Sticky Component) */}
                    {/* ✅ استفاده از کامپوننت TableOfContents */}
                    {/* <TableOfContents headings={tocItems} />  */}

                    <BlogSidebar />
                </aside>

            </div>
        </div>
    </div>
  );
}