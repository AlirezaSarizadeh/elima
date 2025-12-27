"use client";

import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

export default function LicenseInfoSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white rounded-3xl w-full relative" dir="rtl">
      {/* کانتینر متن با کنترل ارتفاع */}
      <div
        ref={contentRef}
        className="relative overflow-hidden transition-all duration-700 ease-in-out"
        style={{
          maxHeight: isExpanded
            ? `${contentRef.current?.scrollHeight || 0}px`
            : "300px",
          opacity: 1,
        }}
      >
        {/* محتوای متنی – نسخه مخصوص گواهینامه بین‌المللی */}
        <div className="text-gray-700 space-y-6 text-justify leading-8 p-0 sm:p-0">
          {/* بخش ۱: گواهینامه بین‌المللی چیست؟ */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              گواهینامه بین‌المللی چیست؟
            </h2>
            <p>
              گواهینامه بین‌المللی رانندگی یک مدرک رسمی است که بر اساس
              گواهینامه معتبر کشور محل صدور شما صادر می‌شود و به شما اجازه
              می‌دهد در بسیاری از کشورهای دنیا، قانونی و بدون دردسر رانندگی
              کنید. این مدرک جایگزین گواهینامه ایرانی نیست؛ بلکه ترجمه
              چندزبانه و مورد تأیید بین‌المللی آن است.
            </p>
            <p>
              با داشتن گواهینامه بین‌المللی، هنگام اجاره خودرو در خارج از کشور
              یا در مواجهه با پلیس راهنمایی‌ و رانندگی، می‌توانید خیلی سریع
              هویت رانندگی خود را اثبات کنید؛ بدون اینکه نیاز باشد هر بار
              گواهینامه داخلی و ترجمه‌های مختلف را همراه داشته باشید.
            </p>
          </div>

          {/* بخش ۲: چرا به گواهینامه بین‌المللی نیاز دارم؟ */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              چرا به گواهینامه بین‌المللی نیاز دارید؟
            </h2>
            <p>اگر قصد هرکدام از موارد زیر را دارید، داشتن این گواهینامه تقریبا ضروری است:</p>
            <ul className="list-disc list-outside pr-5 space-y-2 mt-2 marker:text-gray-400">
              <li>رانندگی شخصی در سفرهای توریستی یا خانوادگی در خارج از کشور</li>
              <li>اجاره خودرو از شرکت‌های رنت‌کار بین‌المللی</li>
              <li>حضور طولانی‌مدت در یک کشور (تحصیلی، کاری، اقامت موقت) و نیاز به رانندگی روزمره</li>
              <li>فعالیت رانندگان حرفه‌ای، ترانزیت و بین‌المللی</li>
            </ul>
            <p className="mt-3">
              بسیاری از کشورها بدون ارائه گواهینامه بین‌المللی، به شما اجازه
              رانندگی یا اجاره خودرو نمی‌دهند؛ حتی اگر ویزا و دیگر مدارک شما
              کامل باشد.
            </p>
          </div>

          {/* بخش ۳: مدارک مورد نیاز */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              مدارک مورد نیاز برای دریافت گواهینامه بین‌المللی
            </h2>
            <p>
              برای ثبت درخواست گواهینامه بین‌المللی، معمولاً به مدارک زیر نیاز خواهید داشت:
            </p>
            <ul className="list-disc list-outside pr-5 space-y-2 mt-2 marker:text-gray-400">
              <li>گواهینامه رانندگی معتبر جمهوری اسلامی ایران (حداقل ۱ سال اعتبار)</li>
              <li>تصویر صفحه اول پاسپورت (در صورت وجود)</li>
              <li>یک قطعه عکس پرسنلی جدید (معمولاً ۳×۴ یا ۴×۶)</li>
              <li>تکمیل فرم درخواست گواهینامه بین‌المللی به‌صورت آنلاین</li>
              <li>آدرس دقیق و کدپستی برای ارسال کارت و دفترچه گواهینامه</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              * در برخی موارد، ممکن است بسته به نوع پکیج یا کشور مقصد، مدارک
              تکمیلی نیز درخواست شود که توسط تیم پشتیبانی به شما اطلاع داده
              خواهد شد.
            </p>
          </div>

          {/* بخش ۴: زمان صدور و نکات مهم */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              مدت زمان صدور و نکات مهم
            </h2>
            <p>
              فرآیند صدور گواهینامه بین‌المللی معمولا بین{" "}
              <span className="font-bold text-gray-900">۲ تا ۵ روز کاری</span>{" "}
              زمان می‌برد. پس از صدور، کارت و دفترچه شما از طریق پست یا
              پیک‌ارسال، به آدرس ثبت‌شده ارسال خواهد شد.
            </p>
            <p className="mt-2">
              توجه داشته باشید که:
            </p>
            <ul className="list-disc list-outside pr-5 space-y-2 mt-2 marker:text-gray-400">
              <li>گواهینامه بین‌المللی فقط در کنار گواهینامه ایرانی معتبر است.</li>
              <li>این مدرک قابل تمدید است و با پایان اعتبار، باید مجدداً درخواست دهید.</li>
              <li>قبل از سفر، قوانین رانندگی کشور مقصد را حتما مطالعه کنید.</li>
            </ul>
          </div>

          {/* جمع‌بندی کوتاه */}
          <p>
            اگر در مورد شرایط، مدارک یا انتخاب بهترین پکیج گواهینامه بین‌المللی
            سوال دارید، کارشناسان ما همراه شما هستند تا مناسب‌ترین گزینه را بر
            اساس نوع سفر، مقصد و مدت اقامتتان پیشنهاد دهند.
          </p>
        </div>

        {/* لایه گرادینت (محو کننده) */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent z-10 transition-opacity duration-500 ${
            isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        ></div>
      </div>

      {/* دکمه مطالعه بیشتر / بستن */}
      <div
        className={`flex justify-center w-full transition-all duration-700 ${
          !isExpanded
            ? "absolute bottom-6 left-0 right-0 z-20"
            : "mt-4 mb-2 pb-2"
        }`}
      >
        <Button
          variant="contained"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: "white",
            borderRadius: "10px",
            padding: "8px 40px",
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          {isExpanded ? "بستن مطلب" : "مطالعه بیشتر..."}
        </Button>
      </div>
    </div>
  );
}
