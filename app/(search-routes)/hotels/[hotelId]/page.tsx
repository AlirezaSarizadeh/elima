"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  LocationOn,
  Star,
  Wifi,
  FreeBreakfast,
  Pool,
  Spa,
  FitnessCenter,
  Restaurant,
  LocalParking,
  MapOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import ResponsiveGallery from "../../tours/[tourId]/details/ResponsiveGallery";
import BookingForm from "../../tours/[tourId]/details/BookingForm";
import HotelMap from "./HotelMap";
import RoomSelection from "./RoomSelection";
import AccessAndDistances from "./AccessAndDistances";
import UserReviews from "./UserReviews";
import SimilarHotels from "./SimilarHotels";
import MobileBookingBar from "./MobileBookingBar";
import HotelRules from "./HotelRules";

// نوع اتاق
type Room = {
  id: number;
  title: string;
  capacity: string;
  tags: string[];
  oldPrice: number;
  price: number;
  discount: number;
  image: string;
  type: string;
  extraPerson?: boolean;
};

// داده‌های اتاق‌ها
const roomsData: Room[] = [
  {
    id: 1,
    title: "اتاق دو تخته برای یک نفر نرمال",
    capacity: "۱ بزرگسال، ۰ خردسال",
    tags: ["صبحانه (بوفه)", "اینترنت رایگان"],
    oldPrice: 10500000,
    price: 9000000,
    discount: 17,
    image: "/images/room_!.webp",
    type: "single",
  },
  {
    id: 2,
    title: "اتاق دو تخته برای یک نفر دیلاکس",
    capacity: "۱ بزرگسال، ۰ خردسال",
    tags: ["صبحانه (بوفه)", "چشم انداز شهر"],
    oldPrice: 12600000,
    price: 10300000,
    discount: 19,
    image: "/images/room_2.webp",
    type: "deluxe",
  },
  {
    id: 3,
    title: "اتاق دو تخته دبل نرمال",
    capacity: "۲ بزرگسال، ۱ خردسال",
    extraPerson: true,
    tags: ["صبحانه (بوفه)"],
    oldPrice: 11000000,
    price: 10260000,
    discount: 5,
    image: "/images/room_!.webp",
    type: "double",
  },
];

const hotelData = {
  name: "هتل پارسیان آزادی تهران",
  stars: 5,
  location: "تهران، بزرگراه شهید چمران، تقاطع اوین",
  rating: 4.6,
  reviews: 420,
};

type SelectedRoomItem = {
  room: Room;
  count: number;
};

export default function HotelDetailPage() {
  const hotelLocation = { lat: 35.7926, lng: 51.3934 };

  // استیت: تعداد انتخابی هر اتاق
  const [selectedCounts, setSelectedCounts] = useState<Record<number, number>>(
    {}
  );

  // مودال موبایل
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // جلوگیری از اسکرول پس‌زمینه وقتی مودال بازه
  useEffect(() => {
    if (!mounted) return;
    const original = document.body.style.overflow;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original;
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [isModalOpen, mounted]);

  const handleChangeRoomCount = (roomId: number, newCount: number) => {
    setSelectedCounts((prev) => {
      const next = { ...prev };
      if (newCount <= 0) {
        delete next[roomId];
      } else {
        next[roomId] = newCount;
      }
      return next;
    });
  };

  const handleClearAll = () => setSelectedCounts({});

  const selectedRooms: SelectedRoomItem[] = roomsData
    .filter((room) => selectedCounts[room.id])
    .map((room) => ({
      room,
      count: selectedCounts[room.id],
    }));

  const totalPrice = selectedRooms.reduce(
    (sum, item) => sum + item.count * item.room.price,
    0
  );

  const mobileBarPrice =
    selectedRooms.length > 0 ? totalPrice : roomsData[0]?.price ?? 0;

  // کلیک روی دکمه استیکی پایین در موبایل
  const handleMobileBarClick = () => {
    if (selectedRooms.length === 0) {
      // هنوز اتاقی انتخاب نشده → اسکرول به بخش انتخاب اتاق
      const el = document.getElementById("room-selection");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // حداقل یک اتاق انتخاب شده → مودال خلاصه رزرو باز شود
      setIsModalOpen(true);
    }
  };

  // محتوای مودال موبایل (فقط باکس اتاق‌های انتخابی)
  const modalContent = isModalOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hotel-booking-modal-title"
    >
      {/* بک‌دراپ */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsModalOpen(false)}
      />

      {/* شیت پایین صفحه */}
      <div className="relative z-[10000] max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white p-4 shadow-xl">
        {/* هدر مودال */}
        <div className="mb-3 flex items-center justify-between">
          <h2
            id="hotel-booking-modal-title"
            className="text-base font-semibold"
          >
            اتاق‌های انتخابی
          </h2>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="rounded-full border px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
          >
            بستن
          </button>
        </div>

        <SelectedRoomsSummary
          items={selectedRooms}
          onChangeRoomCount={handleChangeRoomCount}
          onClearAll={handleClearAll}
          isMobile
        />
      </div>
    </div>
  ) : null;

  return (
    <main className="bg-[#f8fafc] min-h-screen py-0 pb-20" dir="rtl">
      <div className="container mx-auto max-w-7xl px-4">
        <ResponsiveGallery />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ستون راست: جزییات و اتاق‌ها */}
          <div className="lg:col-span-8 space-y-10">
            <section className="space-y-6">
              {/* هدر هتل */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-0 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-black text-slate-800">
                      {hotelData.name}
                    </h1>
                    <div className="flex text-yellow-400">
                      {[...Array(hotelData.stars)].map((_, i) => (
                        <Star key={i} fontSize="small" />
                      ))}
                    </div>
                  </div>
                  <p className="flex items-center text-slate-500 text-sm">
                    <LocationOn
                      sx={{ fontSize: 18 }}
                      className="text-slate-400 ml-1"
                    />
                    {hotelData.location}
                  </p>
                </div>
              </div>

              <RoomSelection
                rooms={roomsData}
                selectedCounts={selectedCounts}
                onChangeRoomCount={handleChangeRoomCount}
              />
            </section>

            {/* امکانات */}
            <section className="bg-white rounded-3xl p-8 border border-gray-200">
              <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
                <VerifiedUserOutlined className="text-blue-600" />
                امکانات هتل
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <FacilityItem icon={<Wifi />} label="اینترنت رایگان" />
                <FacilityItem icon={<Pool />} label="استخر" />
                <FacilityItem icon={<Spa />} label="اسپا" />
                <FacilityItem
                  icon={<FitnessCenter />}
                  label="باشگاه ورزشی"
                />
                <FacilityItem icon={<Restaurant />} label="رستوران" />
                <FacilityItem icon={<LocalParking />} label="پارکینگ" />
                <FacilityItem
                  icon={<FreeBreakfast />}
                  label="صبحانه رایگان"
                />
              </div>
            </section>

            <AccessAndDistances />
            <HotelRules />
            <UserReviews />
            <SimilarHotels />
          </div>

          {/* ستون چپ: سایدبار دسکتاپ */}
          <div className="lg:col-span-4 self-start lg:sticky lg:top-24 space-y-6">
            {/* فرم رزرو فقط دسکتاپ */}
            <div className="hidden lg:block">
              <BookingForm />
            </div>

            {/* باکس اتاق‌های انتخابی فقط دسکتاپ */}
            <div className="hidden lg:block">
              <SelectedRoomsSummary
                items={selectedRooms}
                onChangeRoomCount={handleChangeRoomCount}
                onClearAll={handleClearAll}
              />
            </div>

            {/* کارت امتیاز */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-blue-600">
                  {hotelData.rating}
                </span>
                <span className="text-xs font-bold text-slate-400 mr-2">
                  از 5
                </span>
              </div>
              <div className="text-left">
                <p className="font-black text-slate-700">عالی</p>
                <p className="text-[10px] text-slate-400">
                  {hotelData.reviews} نظر ثبت شده
                </p>
              </div>
            </div>

            {/* نقشه */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm h-64 relative z-0">
              <HotelMap
                lat={hotelLocation.lat}
                lng={hotelLocation.lng}
                popupText="هتل پارسیان آزادی"
              />

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hotelLocation.lat},${hotelLocation.lng}`}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-blue-600 text-xs font-bold py-2 px-3 rounded-lg shadow-md transition-all z-[400] flex items-center gap-1 backdrop-blur-sm"
              >
                <MapOutlined fontSize="small" />
                مسیریابی در گوگل
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* نوار موبایل پایین صفحه */}
      <MobileBookingBar
        price={mobileBarPrice}
        selectedRoomsCount={selectedRooms.length}
        onClick={handleMobileBarClick}
      />

      {/* Portal مودال موبایل */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </main>
  );
}

function FacilityItem({ icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-default">
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <span className="text-[11px] font-bold text-slate-500 group-hover:text-blue-600">
        {label}
      </span>
    </div>
  );
}

/** باکس اتاق‌های انتخاب‌شده */
type SelectedRoomsSummaryProps = {
  items: SelectedRoomItem[];
  onChangeRoomCount: (roomId: number, newCount: number) => void;
  onClearAll: () => void;
  isMobile?: boolean;
};

function SelectedRoomsSummary({
  items,
  onChangeRoomCount,
  onClearAll,
  isMobile = false,
}: SelectedRoomsSummaryProps) {
  if (!items.length) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-4 text-[11px] text-gray-500">
        هنوز اتاقی انتخاب نکرده‌اید.
      </div>
    );
  }

  const totalRooms = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.count * item.room.price,
    0
  );

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 p-4 ${
        isMobile ? "shadow-none" : "shadow-[0_8px_25px_rgba(15,23,42,0.08)]"
      }`}
    >
      {/* هدر */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-extrabold text-slate-800">
          اتاق‌های انتخابی ({totalRooms})
        </span>
        <button
          type="button"
          onClick={onClearAll}
          className="text-[11px] font-bold text-red-500 hover:text-red-600 hover:underline"
        >
          حذف همه
        </button>
      </div>

      {/* لیست اتاق‌ها */}
      <div className="space-y-3 border-t border-dashed border-gray-100 pt-3 mb-3">
        {items.map(({ room, count }) => (
          <div
            key={room.id}
            className="flex items-start justify-between gap-3 pb-3 border-b border-dashed border-gray-100 last:border-b-0 last:pb-0"
          >
            <div className="flex-1">
              <button
                type="button"
                onClick={() => onChangeRoomCount(room.id, 0)}
                className="text-gray-400 hover:text-red-500 text-sm mb-1"
                aria-label="حذف اتاق"
              >
                ×
              </button>
              <p className="text-[11px] font-bold text-slate-800 leading-5">
                {room.title}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {count} اتاق · ۱ شب
              </p>
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-slate-800">
                {(room.price * count).toLocaleString()} تومان
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* جمع کل */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-gray-500">مبلغ قابل پرداخت</span>
        <span className="text-base font-black text-blue-600">
          {totalPrice.toLocaleString()} تومان
        </span>
      </div>

      {/* دکمه اقدام به رزرو */}
      <button
        type="button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl transition-all active:scale-95"
      >
        اقدام به رزرو
      </button>
    </div>
  );
}
