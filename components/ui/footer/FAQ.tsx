"use client";

import { useState } from "react";
import Title from "../Title/Title";

export default function FAQ() {
  const faqs = [
    {
      q: "چگونه می‌توانم یک تور رزرو کنم؟",
      a: "برای رزرو تور کافی است وارد حساب کاربری خود شوید، تور مورد نظر خود را انتخاب کنید، و سپس گزینه “رزرو” را فشار دهید. شما می‌توانید از طریق درگاه‌های پرداخت آنلاین، هزینه تور را پرداخت کنید."
    },
    {
      q: "آیا امکان لغو یا تغییر تاریخ تور وجود دارد؟",
      a: "لطفاً شرایط لغو تورها را مطالعه کنید. برخی تورها امکان تغییر تاریخ دارند."
    },
    {
      q: "آیا هزینه تور شامل بلیط هواپیما و اقامت می‌شود؟",
      a: "بله، اکثر تورهای ما شامل بلیط، اقامت و بیمه سفر هستند."
    },
    {
      q: "آیا تورهای شما راهنما دارد؟",
      a: "بله تمامی تورهای ما دارای راهنمای مجرب هستند که در طول سفر همراه شما خواهند بود تا تجربه‌ای بهتر وپایدار داشته باشید."
    },
    {
      q: "آیا می‌توانم برای تور خود بیمه مسافرتی تهیه کنم؟",
      a: "بله! امکان خرید بیمه مسافرتی در زمان رزرو تور وجود دارد."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="max-w-7xl px-4 mx-auto px-0">
      <Title title="سوالات پرتکرار" icon={<img src={'/images/textalign-right.png'} />} />
      <div className="space-y-4">

        {faqs.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl p-4 cursor-pointer transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between" onClick={() => toggle(i)}>
              <h3 className="font-medium text-gray-800 flex items-center gap-2">
                <span className="text-gray-400">{i + 1}.</span>
                {item.q}
              </h3>

              {/* Icon */}
              <span className="text-gray-500 text-xl transition-transform duration-300">
                {openIndex === i ? "▴" : "▾"}
              </span>
            </div>

            {/* Answer */}
            {openIndex === i && (
              <p className="text-gray-600 mt-4 leading-7 border-t border-gray-200 pt-3">
                {item.a}
              </p>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}
