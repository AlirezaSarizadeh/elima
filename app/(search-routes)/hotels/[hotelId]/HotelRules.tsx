"use client";

import React from 'react';
import { 
    RuleOutlined, 
    AccessTime, 
    ChildCare, 
    InfoOutlined, 
    Gavel 
} from '@mui/icons-material';

const rulesData = {
    checkIn: "۱۴:۰۰",
    checkOut: "۱۲:۰۰",
    childRules: [
        "در صورتی که سن مهمان از ۷ سال بیشتر باشد، مهمان بزرگسال محسوب می‌شود.",
        "هزینه خردسال بین سن ۰ تا ۲ سال (در صورت عدم استفاده از سرویس اضافه) به‌صورت رایگان محاسبه می‌شود.",
        "هزینه خردسال بین سن ۲ تا ۷ سال (در صورت عدم استفاده از سرویس اضافه) ۵۰٪ از نرخ برد محاسبه می‌شود."
    ],
    generalRules: [
        "بانوان و آقایان نمی‌توانند با تبعه خارجی نامحرم در یک اتاق اقامت کنند و مسئولیتی متوجه هتل نخواهد بود.",
        "وارد کردن خسارت به اتاق یا اموال مجموعه مشمول جریمه خواهد بود و هرگونه آسیب یا خرابی وسایل توسط پرسنل بررسی می‌شود.",
        "استعمال دخانیات ممنوع می‌باشد و شامل جریمه می‌شود.",
        "ورود حیوانات خانگی ممنوع می‌باشد."
    ],
    receptionRules: [
        "پذیرش مهمان بدون همراه داشتن شناسنامه و یا کارت ملی جدید به هیچ عنوان امکان‌پذیر نیست.",
        "پذیرش زوج‌های ایرانی فقط با همراه داشتن شناسنامه عکس‌دار زوجین امکان‌پذیر است.",
        "در صورتی که مدرک شناسایی معتبر ارائه نشود، پذیرش مسافر به هیچ عنوان صورت نمی‌گیرد. اصل شناسنامه و کارت ملی یا پاسپورت، شرط اولیه پذیرش مسافر است.",
        "هیچ‌گونه تضمینی برای پذیرش و تحویل اتاق زودتر از ساعت ورود وجود ندارد.",
        "پذیرش آقا و خانم تنها، فقط با ارائه‌ی کارت ملی و شناسنامه عکس‌دار فرد امکان‌پذیر است.",
        "پذیرش صیغه‌نامه رسمی به صورت دفترچه‌ای با مهر برجسته، به همراه ارائه‌ی کارت ملی و شناسنامه عکس‌دار زوجین، امکان‌پذیر است."
    ]
};

export default function HotelRules() {
    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 mt-10" id="rules-section">
            
            {/* هدر */}
            <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                <RuleOutlined className="text-blue-600" sx={{ fontSize: 28 }} />
                <h2 className="text-xl font-black text-slate-800">
                    قوانین و مقررات هتل پارسیان آزادی تهران
                </h2>
            </div>

            <div className="flex flex-col gap-10">

                {/* ۱. ساعت ورود و خروج */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <AccessTime sx={{ fontSize: 20 }} className="text-slate-500" />
                        ساعت ورود و خروج
                    </h3>
                    <div className="flex gap-4 md:gap-8 max-w-lg">
                        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
                            <span className="text-gray-400 text-xs font-bold">ساعت ورود</span>
                            <span className="text-xl font-black text-slate-800 dir-ltr">{rulesData.checkIn}</span>
                        </div>
                        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-1">
                            <span className="text-gray-400 text-xs font-bold">ساعت خروج</span>
                            <span className="text-xl font-black text-slate-800 dir-ltr">{rulesData.checkOut}</span>
                        </div>
                    </div>
                </div>

                {/* ۲. قانون خردسال */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <ChildCare sx={{ fontSize: 22 }} className="text-slate-500" />
                        قانون خردسال
                    </h3>
                    <ul className="space-y-3 pr-4 border-r-2 border-gray-100">
                        {rulesData.childRules.map((rule, idx) => (
                            <li key={idx} className="text-sm text-gray-500 leading-7 text-justify pl-2 relative">
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    
                    {/* ۳. اطلاعات مهم دیگر (عمومی) */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <InfoOutlined sx={{ fontSize: 20 }} className="text-slate-500" />
                            اطلاعات مهم دیگر
                        </h3>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                            <h4 className="text-sm font-bold text-slate-700 mb-3">قوانین عمومی</h4>
                            <ul className="space-y-3 list-disc list-inside marker:text-blue-400">
                                {rulesData.generalRules.map((rule, idx) => (
                                    <li key={idx} className="text-sm text-gray-500 leading-7 text-justify">
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ۴. قوانین پذیرش */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Gavel sx={{ fontSize: 20 }} className="text-slate-500" />
                            قوانین پذیرش
                        </h3>
                        <ul className="space-y-3 list-disc list-inside marker:text-orange-400">
                            {rulesData.receptionRules.map((rule, idx) => (
                                <li key={idx} className="text-sm text-gray-500 leading-7 text-justify">
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>
        </section>
    );
}