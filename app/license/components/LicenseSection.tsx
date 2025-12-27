"use client";

import { useState, useMemo } from "react";
import VisaCard from "../../visa/components/VisaCard";
import Tabs from "../../../components/domestic_tour/tour_category/Tabs";
import { Search } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "./global.css";
import Title from "../../../components/ui/Title/Title";

// 🔵 داده‌های نمونه برای پکیج‌های گواهینامه بین‌المللی
const fakeData: Record<
  string,
  { title: string; price: number; image: string }[]
> = {
  "بین‌المللی یک‌ساله": [
    {
      title: "گواهینامه بین‌المللی ۱ ساله (کارت + دفترچه)",
      price: 890000,
      image: "/images/place_1.jpg",
    },
    {
      title: "گواهینامه بین‌المللی ۱ ساله (فقط کارت پلاستیکی)",
      price: 690000,
      image: "/images/place_2.png",
    },
  ],
  "بین‌المللی سه‌ساله": [
    {
      title: "گواهینامه بین‌المللی ۳ ساله (کارت + دفترچه)",
      price: 1290000,
      image: "/images/place_3.png",
    },
    {
      title: "گواهینامه بین‌المللی ۳ ساله ویژه سفرهای متعدد",
      price: 1490000,
      image: "/images/place_1.jpg",
    },
  ],
  "بین‌المللی پنج‌ساله": [
    {
      title: "گواهینامه بین‌المللی ۵ ساله رانندگی",
      price: 1890000,
      image: "/images/place_2.png",
    },
  ],
  "ویژه رانندگان حرفه‌ای": [
    {
      title: "پکیج حرفه‌ای: گواهینامه بین‌المللی + کارت عضویت",
      price: 2150000,
      image: "/images/place_3.png",
    },
    {
      title: "پکیج حمل‌ونقل بین‌المللی (رانندگان ترانزیت)",
      price: 2450000,
      image: "/images/place_1.jpg",
    },
  ],
  "سریع و فوری": [
    {
      title: "صدور فوری گواهینامه بین‌المللی (کمتر از ۲۴ ساعت)",
      price: 1190000,
      image: "/images/place_2.png",
    },
  ],
};

// تب‌ها (اولی همیشه "همه پکیج‌ها")
const tabsList = [
  "همه پکیج‌ها",
  "بین‌المللی یک‌ساله",
  "بین‌المللی سه‌ساله",
  "بین‌المللی پنج‌ساله",
  "ویژه رانندگان حرفه‌ای",
  "سریع و فوری",
];

const LicenseSection = () => {
  const [activeTab, setActiveTab] = useState("همه پکیج‌ها");
  const [searchQuery, setSearchQuery] = useState("");

  // همه آیتم‌ها برای تب "همه پکیج‌ها" و جستجو
  const allLicenses = useMemo(() => {
    return Object.values(fakeData).flat();
  }, []);

  const getDisplayItems = () => {
    let currentItems: { title: string; price: number; image: string }[] = [];

    if (activeTab === "همه پکیج‌ها") {
      currentItems = allLicenses;
    } else {
      currentItems = fakeData[activeTab] ?? [];
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return currentItems.filter((item) =>
        item.title.toLowerCase().includes(q)
      );
    }

    return currentItems;
  };

  const displayItems = getDisplayItems();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0 && activeTab !== "همه پکیج‌ها") {
      setActiveTab("همه پکیج‌ها");
    }
  };

  return (
    <section className="mt-0 bg-gray-50 pt-5 pb-10">
      <div className="max-w-7xl px-4 mx-auto px-0">
        {/* عنوان سکشن */}
        <Title
          title="پکیج‌های گواهینامه بین‌المللی"
          icon={<img src="/images/textalign-right.png" alt="icon" />}
        />

        {/* یک ردیف کوتاه توضیح/هایلایت زیر عنوان */}
        <div className="mt-2 text-[11px] sm:text-xs text-gray-500 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-white border border-dashed border-gray-200 rounded-full">
            صدور آنلاین بدون مراجعه حضوری
          </span>
          <span className="px-2 py-1 bg-white border border-dashed border-gray-200 rounded-full">
            ارسال به سراسر ایران
          </span>
          <span className="px-2 py-1 bg-white border border-dashed border-gray-200 rounded-full">
            پشتیبانی در تمام مدت اعتبار
          </span>
        </div>
      </div>

      {/* تب‌ها + سرچ + دکمه‌های ناوبری */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 max-w-7xl px-4 mx-auto px-0 gap-4 mt-4">
        {/* تب‌ها */}
        <div className="overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Tabs tabs={tabsList} active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          {/* سرچ */}
          <div className="relative group w-full md:w-64">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <Search fontSize="small" />
            </div>
            <input
              type="text"
              placeholder="جستجوی گواهینامه..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* دکمه‌های ناوبری سوايپر */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="tour-next-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <img
                src="/images/arrow-right.png"
                className="w-5"
                alt="next"
              />
            </button>

            <button className="tour-prev-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
              <img src="/images/arrow-left.png" className="w-5" alt="prev" />
            </button>
          </div>
        </div>
      </div>

      {/* Swiper Grid */}
      <div className="max-w-7xl px-4 mx-auto px-0">
        {displayItems.length > 0 ? (
          <Swiper
            modules={[Navigation, Grid]}
            navigation={{
              prevEl: ".tour-prev-btn",
              nextEl: ".tour-next-btn",
            }}
            grid={{ rows: 2, fill: "row" }}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1, grid: { rows: 2 } },
              640: { slidesPerView: 2, grid: { rows: 2 } },
              1024: { slidesPerView: 3, grid: { rows: 2 } },
            }}
            className="w-full flex-row items-center toursSection_swiper pb-10"
          >
            {displayItems.map((item, index) => (
              <SwiperSlide className="mt-5 h-auto" key={index}>
                <VisaCard
                  title={item.title}
                  price={item.price}
                  image={item.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-10 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
            برای این دسته، فعلاً پکیجی ثبت نشده است.
          </div>
        )}
      </div>
    </section>
  );
};

export default LicenseSection;
