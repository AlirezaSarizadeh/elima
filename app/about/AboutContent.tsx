"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { 
    FlightTakeoff, Groups, EmojiEvents, VerifiedUser, Public 
} from '@mui/icons-material';

// --- تنظیمات انیمیشن (رفع خطای Variants) ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut" } 
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

export default function AboutContent() {
    return (
        <main className="bg-[#f8fafc] min-h-screen py-10 overflow-hidden" dir="rtl">
            <div className="container mx-auto max-w-7xl px-4 space-y-24">

                {/* --- Hero Section --- */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                    
                    {/* آیکون پس‌زمینه متحرک */}
                    <motion.div 
                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-10 text-orange-100/50 hidden lg:block -z-0"
                    >
                        <FlightTakeoff sx={{ fontSize: 200 }} />
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8 relative z-10"
                    >
                        <motion.span variants={fadeInUp} className="text-orange-600 font-bold text-sm tracking-wider bg-orange-50 px-4 py-1.5 rounded-full w-fit border border-orange-100 inline-block">
                            ✨ داستان سفرهای رویایی
                        </motion.span>
                        
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-[#1a3454] leading-tight">
                            ما خالق <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-600 to-amber-400">
                                خاطرات بی‌پایان
                            </span> هستیم
                        </motion.h1>
                        
                        <motion.p variants={fadeInUp} className="text-slate-500 leading-9 text-lg text-justify border-r-4 border-orange-400 pr-6">
                            الیماگشت پاسارگاد، ترکیبی از تجربه سنتی و نوآوری مدرن است. ما باور داریم که سفر، تنها جابجایی بین دو نقطه نیست؛ بلکه مسیری برای کشف خود و جهان است. تیم ما با وسواس فراوان، تک‌تک جزئیات سفر شما را برنامه‌ریزی می‌کند.
                        </motion.p>
                        
                        {/* آمار */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-6">
                            <StatBox number="۵۰+" label="مقصد جهانی" delay={0.2} />
                            <StatBox number="۱۰K" label="مسافر خوشحال" delay={0.4} />
                            <StatBox number="۹۸٪" label="رضایت" delay={0.6} />
                        </motion.div>
                    </motion.div>

                    {/* کلاژ تصاویر */}
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full hidden lg:block"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                            className="absolute top-10 right-10 w-72 h-96 rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white rotate-6 z-10 cursor-pointer"
                        >
                            {/* عکس جایگزین */}
                            <div className="w-full h-full bg-slate-200 relative">
                                <Image src="/images/blog-1.webp" alt="Travel" fill className="object-cover" />
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                            className="absolute bottom-10 left-10 w-64 h-80 rounded-[3rem] overflow-hidden shadow-xl border-[6px] border-white -rotate-6 z-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                        >
                             <div className="w-full h-full bg-slate-300 relative">
                                <Image src="/images/blog-1.webp" alt="Team" fill className="object-cover" />
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-orange-50 z-30"
                        >
                            <span className="text-3xl font-black text-[#1a3454]">۱۲</span>
                            <span className="text-[10px] text-orange-500 font-bold">سال تجربه</span>
                        </motion.div>
                    </motion.div>
                </section>

                {/* --- Timeline --- */}
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#1a3454]">مسیر رشد الیما</h2>
                        <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
                    </div>
                    
                    <div className="relative border-r-2 border-slate-200 mr-4 md:mr-auto md:mx-auto md:w-2/3 space-y-12 pr-8">
                        <TimelineItem year="۱۳۹۰" title="آغاز سفر" desc="تاسیس دفتر کوچک در قلب تهران با رویای بزرگ." />
                        <TimelineItem year="۱۳۹۵" title="گسترش مرزها" desc="شروع برگزاری تورهای اروپایی و اخذ نمایندگی‌های رسمی." />
                        <TimelineItem year="۱۴۰۰" title="دیجیتالی شدن" desc="راه‌اندازی پلتفرم آنلاین رزرو تور و هتل." />
                        <TimelineItem year="۱۴۰۳" title="باشگاه مشتریان" desc="ارائه خدمات VIP به بیش از ۱۰ هزار کاربر فعال." />
                    </div>
                </section>

                {/* --- Values --- */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    variants={staggerContainer}
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10"
                >
                    <ValueCard icon={<VerifiedUser fontSize="large" />} title="تضمین کیفیت" desc="ما کیفیت خدمات را فدای قیمت نمی‌کنیم." color="blue" />
                    <ValueCard icon={<Public fontSize="large" />} title="پوشش جهانی" desc="از قطب شمال تا جنگل‌های آمازون." color="orange" />
                    <ValueCard icon={<EmojiEvents fontSize="large" />} title="خدمات لوکس" desc="تجربه‌ای شاهانه در برترین هتل‌های دنیا." color="purple" />
                    <ValueCard icon={<Groups fontSize="large" />} title="خانواده بزرگ" desc="شما مشتری نیستید، عضوی از خانواده مایید." color="green" />
                </motion.section>

            </div>
        </main>
    );
}

// --- کامپوننت‌های داخلی ---

function StatBox({ number, label, delay }: { number: string, label: string, delay: number }) {
    return (
        <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: "spring" }}
            className="flex flex-col bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
        >
            <span className="text-2xl md:text-3xl font-black text-[#1a3454]">{number}</span>
            <span className="text-xs text-slate-400 font-bold mt-1">{label}</span>
        </motion.div>
    );
}

function TimelineItem({ year, title, desc }: { year: string, title: string, desc: string }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
        >
            <div className="absolute top-1 -right-[41px] w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-md z-10"></div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow hover:border-orange-200">
                <span className="text-orange-500 font-black text-xl block mb-2">{year}</span>
                <h3 className="font-bold text-lg text-[#1a3454] mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-7">{desc}</p>
            </div>
        </motion.div>
    );
}

function ValueCard({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
    const colors: Record<string, string> = {
        blue: "hover:bg-blue-50",
        orange: "hover:bg-orange-50",
        purple: "hover:bg-purple-50",
        green: "hover:bg-emerald-50",
    };

    return (
        <motion.div 
            variants={fadeInUp}
            className={`group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-default ${colors[color]}`}
        >
            <div className="w-16 h-16 rounded-2xl bg-gray-50 text-[#1a3454] group-hover:bg-white group-hover:text-orange-500 flex items-center justify-center mb-6 transition-colors duration-500 shadow-sm">
                {icon}
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-3">{title}</h3>
            <p className="text-sm text-slate-500 leading-6">{desc}</p>
        </motion.div>
    );
}