"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Email, LocationOn, KeyboardArrowDown, Send, Instagram, Telegram, WhatsApp } from '@mui/icons-material';

export default function ContactContent() {
    return (
        <main className="bg-[#f8fafc] min-h-screen py-12 flex flex-col items-center justify-center" dir="rtl">
            <div className="container mx-auto max-w-6xl px-4 space-y-16">
                
                {/* --- Section 1: Split Layout --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col lg:flex-row min-h-[650px]"
                >
                    
                    {/* ستون تیره (اطلاعات تماس) - راست */}
                    <div className="lg:w-5/12 bg-[#1a3454] p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        
                        {/* انیمیشن پس‌زمینه */}
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                            transition={{ duration: 20, repeat: Infinity }}
                            className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-[80px]"
                        ></motion.div>
                        <motion.div 
                            animate={{ scale: [1, 1.5, 1], rotate: [0, -45, 0] }}
                            transition={{ duration: 15, repeat: Infinity }}
                            className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px]"
                        ></motion.div>

                        <div className="relative z-10 space-y-8">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black mb-4">تماس با ما</h1>
                                <p className="text-slate-300 text-sm leading-7 text-justify">
                                    تیم پشتیبانی الیماگشت، ۲۴ ساعت شبانه‌روز آماده پاسخگویی به شماست. 
                                </p>
                            </div>

                            <div className="space-y-5">
                                <ContactCard icon={<Phone />} title="تلفن پشتیبانی" value="021-428040101" href="tel:021428040101" />
                                <ContactCard icon={<Email />} title="ایمیل" value="info@elimagasht.com" href="mailto:info@elimagasht.com" />
                                <ContactCard icon={<LocationOn />} title="آدرس" value="تهران، سعادت‌آباد، خیابان کاج، پلاک ۱۶" href="#" />
                            </div>
                            
                            {/* شبکه اجتماعی */}
                            <div className="pt-4">
                                <p className="text-xs text-slate-400 mb-3 font-bold">ما را دنبال کنید:</p>
                                <div className="flex gap-3">
                                    <SocialBtn icon={<Instagram />} />
                                    <SocialBtn icon={<Telegram />} />
                                    <SocialBtn icon={<WhatsApp />} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ستون روشن (فرم) - چپ */}
                    <div className="lg:w-7/12 p-10 md:p-12 bg-white relative">
                        <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-orange-500 rounded-full inline-block"></span>
                            ارسال پیام مستقیم
                        </h2>
                        
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FloatingInput label="نام و نام خانوادگی" />
                                <FloatingInput label="شماره تماس" />
                            </div>
                            
                            <FloatingInput label="موضوع پیام" />
                            
                            <div className="relative">
                                <textarea 
                                    rows={5} 
                                    className="peer w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-5 outline-none focus:border-orange-500 focus:bg-white transition-all resize-none placeholder-transparent text-sm"
                                    placeholder="پیام"
                                    id="message"
                                ></textarea>
                                <label htmlFor="message" className="absolute right-5 top-5 text-slate-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-500">
                                    متن پیام شما...
                                </label>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full md:w-auto bg-[#1a3454] hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 transition-colors float-left"
                            >
                                <Send sx={{ fontSize: 20 }} className="rotate-180" />
                                ثبت و ارسال
                            </motion.button>
                        </form>
                    </div>

                </motion.div>

            </div>
        </main>
    );
}

// --- کامپوننت‌های داخلی ---

function ContactCard({ icon, title, value, href }: { icon: any, title: string, value: string, href: string }) {
    return (
        <a href={href} className="block">
            <motion.div 
                whileHover={{ x: -5 }}
                className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 shrink-0">
                    {icon}
                </div>
                <div>
                    <p className="text-xs text-slate-300 mb-1">{title}</p>
                    <p className="font-bold text-base md:text-lg dir-ltr text-right">{value}</p>
                </div>
            </motion.div>
        </a>
    );
}

function SocialBtn({ icon }: { icon: any }) {
    return (
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1a3454] transition-all cursor-pointer">
            {icon}
        </div>
    );
}

function FloatingInput({ label }: { label: string }) {
    return (
        <div className="relative">
            <input 
                type="text" 
                className="peer w-full bg-slate-50 border-2 border-slate-100 rounded-2xl h-14 px-5 outline-none focus:border-orange-500 focus:bg-white transition-all placeholder-transparent text-sm"
                placeholder={label}
                id={label}
            />
            <label 
                htmlFor={label} 
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-slate-400 peer-focus:top-4 peer-focus:text-xs peer-focus:text-orange-500 pointer-events-none"
            >
                {label}
            </label>
        </div>
    );
}