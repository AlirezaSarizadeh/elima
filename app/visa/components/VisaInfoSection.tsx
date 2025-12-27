"use client";

import React, { useState, useRef } from "react"; // 1. useRef اضافه شد
import { Button } from "@mui/material";

export default function VisaInfoSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); // 2. رفرنس برای گرفتن ارتفاع دقیق

  return (
    <div className="bg-white rounded-3xl w-full" dir="rtl">
      
      {/* کانتینر متن با کنترل ارتفاع */}
      <div 
        ref={contentRef} // 3. اتصال رفرنس به کانتینر
        className="relative overflow-hidden transition-all duration-700 ease-in-out"
        style={{
            // 4. محاسبه ارتفاع داینامیک:
            // اگر باز است: ارتفاع به اندازه کل محتوا (scrollHeight)
            // اگر بسته است: ۳۰۰ پیکسل
            maxHeight: isExpanded 
                ? `${contentRef.current?.scrollHeight}px` 
                : "300px",
            opacity: 1 
        }}
      >
        
        {/* محتوای متنی (طبق تصویر ارسالی) */}
        <div className="text-gray-700 space-y-6 text-justify leading-8">
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">ویزا چیست؟</h2>
                <p>
                    اگر عازم سفر خارجی باشید، حتما با ویزا سروکار خواهید داشت. ما اینجا درباره این صحبت می‌کنیم که ویزا دقیقا چیست و چرا برای سفر به کشورهای خارجی باید آن را درخواست کرد؟
                </p>
                <p>
                    برای پاسخ به سوال «ویزا چیست؟» و فهم بهتر آن با یک مثال پیش می‌رویم. تصور کنید می‌خواهید به خانه کسی بروید. در قدم اول چه کار می‌کنید؟ طبیعتا از صاحب‌خانه اجازه می‌گیرید؛ چون ورود به هر خانه‌ای، بدون اجازه صاحب‌خانه ممکن نیست. ویزا هم به‌نوعی اجازه صاحب‌خانه محسوب می‌شود. ویزا یک مجوز است؛ مجوزی برای سفر به کشورهای خارجی. هر مسافری که بخواهد به کشوری خارجی سفر کند، در وهله اول باید از آن کشور اجازه بگیرد؛ یعنی به سفارتخانه کشور مقصدش مراجعه و درخواست ویزای آنجا را می‌کند.
                </p>
                <p>
                    اگر شما هم قصد سفر به کشورهای خارجی را دارید و می‌خواهید اطلاعات بیشتری درباره آن کسب کنید، این مطلب را تا انتها بخوانید.
                </p>
            </div>

            <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">هزینه گرفتن ویزا</h2>
                <p>
                    برای هزینه ویزا نمی‌شود مبلغ و تعرفه خاصی مشخص کرد. دلایل زیادی هم برای این موضوع وجود دارد:
                </p>
                <ul className="list-disc list-outside pr-5 space-y-2 mt-2 marker:text-gray-400">
                    <li>
                        دلیل اول: ویزا انواع و اقسام متنوعی دارد که در ادامه به آن اشاره خواهیم کرد؛ مثل ویزای توریستی، ویزای کار، ویزای درمانی، ویزای تحصیلی و... . طبیعتا هر کدام از آن‌ها هم تعرفه خاص و متفاوت خودشان را دارند؛ بنابراین اگر می‌خواهید از قیمت ویزا سر در بیاورید، ابتدا باید نوع ویزای موردنیازتان را مشخص کنید.
                    </li>
                    <li>
                        دلیل دوم: هزینه ویزای هر کشوری، متفاوت از کشور دیگر است؛ پس نمی‌توان یک مبلغ کلی برای آن ارائه داد. نوسانات نرخ ارز هم خودش نکته مهمی است. همان‌طور که می‌دانید نرخ ارز به‌صورت روزانه تغییر می‌کند و همین موضوع باعث می‌شود نتوان برای ویزا یک هزینه دقیق ریالی در نظر گرفت.
                    </li>
                </ul>
            </div>
            
            <p>
                در نهایت، اگر درباره نحوه گرفتن ویزا سوال دارید، کارشناسان ما آماده پاسخگویی به شما هستند. فرآیند اخذ ویزا بسته به قوانین هر کشور می‌تواند بین چند روز تا چند ماه زمان ببرد. مدارک مورد نیاز نیز معمولاً شامل پاسپورت معتبر، عکس پرسنلی، مدارک تمکن مالی و بلیط رفت و برگشت است.
            </p>
        </div>

        {/* لایه گرادینت (محو کننده) */}
        <div 
            className={`absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent z-10 transition-opacity duration-500 ${
                isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        ></div>

      </div>

      {/* دکمه مطالعه بیشتر */}
      <div className={`flex justify-center w-full transition-all duration-700 ${!isExpanded ? 'absolute bottom-6 left-0 right-0 z-20' : 'mt-8'}`}>
          <Button 
            variant="contained"
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
                color: 'white',
                borderRadius: '10px',
                padding: '8px 40px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
            }}
          >
            {isExpanded ? "بستن مطلب" : "مطالعه بیشتر..."}
          </Button>
      </div>

    </div>
  );
}