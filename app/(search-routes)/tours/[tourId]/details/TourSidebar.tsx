"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import BookingForm from "./BookingForm"; // مسیر را چک کنید
import PopularTours from "./PopularTours"; // مسیر را چک کنید

export default function TourSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // برای اینکه روی SSR/Next.js با document مشکل نخوریم
  useEffect(() => {
    setMounted(true);
  }, []);

  // جلوگیری از اسکرول پس‌زمینه وقتی مودال بازه
  useEffect(() => {
    if (!mounted) return;

    const originalOverflow = document.body.style.overflow;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen, mounted]);

  // محتوای مودال که قراره با Portal ببریمش داخل body
  const modalContent = isModalOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center md:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-sidebar-modal-title"
    >
      {/* پس‌زمینه تیره برای بستن مودال */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsModalOpen(false)}
      />

      {/* شیت پایین صفحه (خود مودال) */}
      <div className="relative z-[10000] max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 shadow-xl">
        {/* هدر مودال */}
        <div className="mb-3 flex items-center justify-between">
          <h2
            id="tour-sidebar-modal-title"
            className="text-base font-semibold"
          >
            فرم رزرو تور
          </h2>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="rounded-full border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
            aria-label="بستن"
          >
            بستن
          </button>
        </div>

        {/* فقط فرم رزرو داخل مودال */}
        <BookingForm />
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* سایدبار اصلی */}
      <aside className="w-full flex flex-col gap-6 md:sticky md:top-4">
        {/* دسکتاپ: فرم رزرو مستقیم داخل سایدبار */}
        <div className="hidden md:block">
          <BookingForm />
        </div>

        {/* تورهای پرطرفدار: همیشه داخل صفحه (موبایل و دسکتاپ) */}
        <PopularTours />
      </aside>

      {/* موبایل: دکمه استیکی پایین صفحه برای باز کردن مودال */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="fixed inset-x-4 bottom-4 z-[9500] flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
        >
          رزرو تور
        </button>
      </div>

      {/* Portal: مودال واقعی خارج از هر کانتکست (مستقیم داخل body) */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
