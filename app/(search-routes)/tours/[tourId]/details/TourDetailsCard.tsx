"use client";

import React, { useState } from "react";
import {
    Modal,
    Box,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import {
    MapOutlined,
    ExpandMore,
    ExpandLess,
    CalendarTodayOutlined,
    CalendarMonthOutlined,
    LocationOnOutlined,
    HotelOutlined,
    DirectionsBusFilledOutlined,
    RestaurantOutlined,
    DirectionsWalkOutlined,
    Close,
} from "@mui/icons-material";

// استایل مودال نقشه
const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 600,
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 2,
    outline: "none",
};

export default function TourDetailsCard() {
    const [openMap, setOpenMap] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true); // برای باز/بسته کردن بخش تقویم (نمایشی)

    // داده‌های تقویم (شبیه‌سازی شده طبق عکس)
    const calendarDays = [
        { day: "چهارشنبه", date: "۱۸", active: true, isFriday: false },
        { day: "پنج‌شنبه", date: "۱۹", active: true, isFriday: false },
        { day: "جمعه", date: "۲۰", active: true, isFriday: true },
        { day: "شنبه", date: "۲۱", active: true, isFriday: false },
        { day: "یک‌شنبه", date: "۲۲", active: false, isFriday: false },
        { day: "دوشنبه", date: "۲۳", active: false, isFriday: false },
        { day: "سه‌شنبه", date: "۲۴", active: false, isFriday: false },
    ];

    return (
        <div className=" border border-gray-200 p-4 rounded-8"

        >

            {/* ---------------- Header ---------------- */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-6">

                {/* عنوان و مدت سفر */}
                <div className="text-right flex flex-col items-start w-full md:w-auto">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        تور مثلث طلایی هند
                    </h1>
                    <span className="text-gray-500 text-sm font-medium">
                        مدت سفر: ۴ روز و ۳ شب
                    </span>
                </div>
                {/* دکمه نقشه */}
                <Button
                    variant="outlined"
                    startIcon={<MapOutlined sx={{ ml: 1 }} />} // ml:1 برای فاصله صحیح در RTL
                    onClick={() => setOpenMap(true)}
                    sx={{
                        borderRadius: "12px",
                        borderColor: "#234371",
                        color: "#234371",
                        padding: "8px 16px",
                        fontFamily: "inherit",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        "&:hover": {
                            borderColor: "#2563eb",
                            backgroundColor: "rgba(59, 130, 246, 0.04)",
                        },
                    }}
                >
                    مشاهده مسیر در نقشه
                </Button>


            </div>

            {/* ---------------- Calendar Section ---------------- */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-gray-800 text-lg">مهر ۱۴۰۳</span>
                    <div className="flex gap-2 text-gray-500 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </div>
                </div>

                {/* لیست روزها */}
                <div className={`flex justify-between items-center overflow-x-auto pb-4 gap-4 transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {calendarDays.map((item, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[60px] gap-2">
                            <span className={`text-xs font-medium ${item.isFriday ? "text-red-500" : "text-gray-400"}`}>
                                {item.day}
                            </span>
                            <span className={`text-lg font-bold ${item.isFriday ? "text-red-500" : "text-gray-800"}`}>
                                {item.date}
                            </span>
                            {item.active && (
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1"></span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="border-b border-gray-100 mt-2"></div>
            </div>

            {/* ---------------- Details List ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">

                <DetailItem
                    icon={<CalendarTodayOutlined fontSize="small" />}
                    label="تاریخ رفت"
                    value="چهارشنبه ۱۸ مهر، ساعت ۶:۴۵ صبح"
                />

                <DetailItem
                    icon={<CalendarMonthOutlined fontSize="small" />}
                    label="تاریخ برگشت"
                    value="شنبه ۲۱ مهر، حدود ۱۲ شب"
                />

                <DetailItem
                    icon={<LocationOnOutlined fontSize="small" />}
                    label="محل حرکت"
                    value="فرودگاه بین المللی امام خمینی"
                />

                <DetailItem
                    icon={<HotelOutlined fontSize="small" />}
                    label="محل اقامت"
                    value="۴ شب هتل ۵ ستاره ی آگراجی"
                />

                <DetailItem
                    icon={<DirectionsBusFilledOutlined fontSize="small" />}
                    label="وسیله نقلیه"
                    value="هواپیما، اتوبوس ۲۵ نفره VIP"
                />

                <DetailItem
                    icon={<RestaurantOutlined fontSize="small" />}
                    label="تعداد وعده های غذایی با تور"
                    value="۴ وعده غذایی"
                />

                <DetailItem
                    icon={<DirectionsWalkOutlined fontSize="small" />}
                    label="درجه سختی"
                    value="۲ از ۵"
                />

            </div>


            {/* ---------------- Map Modal ---------------- */}
            <Modal
                open={openMap}
                onClose={() => setOpenMap(false)}
                aria-labelledby="map-modal-title"
            >
                <Box sx={modalStyle}>
                    <div className="flex justify-between items-center mb-4">
                        <Typography id="map-modal-title" variant="h6" component="h2" sx={{ fontFamily: 'inherit', fontWeight: 'bold' }} dir="rtl">
                            مسیر سفر
                        </Typography>
                        <IconButton onClick={() => setOpenMap(false)}>
                            <Close />
                        </IconButton>
                    </div>

                    {/* Placeholder نقشه */}
                    <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                        {/* در اینجا می‌توانید از کامپوننت Google Maps یا یک تصویر استاتیک استفاده کنید */}
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=India+Golden+Triangle"
                            title="نقشه"
                            className="grayscale opacity-60" // فقط برای زیبایی نمونه
                        ></iframe>
                        {/* متن جایگزین اگر iframe کار نکند (چون API Key نداریم) */}
                        <span className="absolute text-gray-500 font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
                            نمایش نقشه گوگل (نیاز به API Key)
                        </span>
                    </div>
                </Box>
            </Modal>

        </div>
    );
}

// کامپوننت کمکی برای آیتم‌های لیست جزئیات
function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="text-gray-400 mt-0.5">
                {icon}
            </div>
            <div className="flex flex-col gap-1 text-right">
                <span className="text-gray-500 text-sm font-medium">{label}</span>
                <span className="text-gray-800 font-bold text-sm md:text-base leading-relaxed">{value}</span>
            </div>
        </div>
    );
}