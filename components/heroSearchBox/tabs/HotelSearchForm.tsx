"use client";

import React, { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import cls from "classnames";

// Calendar Imports
import persian from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

// Icons & UI Components
import { FlightTakeoffRounded, WorkOutlineRounded, Close as CloseIcon, CreditCardOutlined, Hotel } from "@mui/icons-material";
import { Button, Dialog, DialogContent, AppBar, Toolbar, IconButton, Typography, Slide, useMediaQuery, useTheme, Autocomplete, TextField } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';

import RtlDemo, { SwapInputs } from "../../SwapInputs/SwapInputs";
import { DatePickerInput } from "../../DatePickerInput/DatePickerInput";
import PassengerDropdown from "../PassengerDropdown";
import Link from "next/link";
import CustomRadioGroup from "../../CustomRadioGroup/CustomRadioGroup";
import PassengerSelection from "../../../app/visa/components/PassengerSelection";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function HotelSearchForm() {

    const top100Films = [
        { title: "تهران", year: 1994 },
        { title: "مشهد", year: 1972 },
        { title: "اصفهان", year: 1974 },
        { title: "شیراز", year: 2008 },
        { title: "کیش", year: 1957 },
    ];

    // ✅ اصلاح ۱: تعریف استیت با هوک useState
    const [destination, setDestination] = useState<any>(null);

    // ✅ اصلاح ۲: تابع تغییر مقدار
    const handleDestinationChange = (event: any, newValue: any) => {
        setDestination(newValue);
    };

    const router = useRouter();
    const pathname = usePathname();
    const [value, setValue] = useState("");
    const datePickerRef = useRef<any>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [mobileModalOpen, setMobileModalOpen] = useState(false);
    const [selectedMobileTab, setSelectedMobileTab] = useState<string | null>(null);

    const tabs = [
        { label: "تور مسافرتی", href: "/", icon: <WorkOutlineRounded /> },
        { label: "هتل", href: "/hotel", icon: <Hotel /> },
        { label: "ویزا", href: "/visa", icon: <CreditCardOutlined /> },
    ];

    const tabPaths = ["/tours", "/hotel", "/visa"];
    const activeTab = tabPaths.find(path => pathname.startsWith(path)) || "/";


    const [calendarType, setCalendarType] = useState<"jalali" | "gregorian">("jalali");
    const [dateRange, setDateRange] = useState<any>([null, null]);

    const calendar = calendarType === "jalali" ? persian : gregorian;
    const locale = calendarType === "jalali" ? persian_fa : gregorian_en;

    const switchCalendar = () => setCalendarType((prev) => (prev === "jalali" ? "gregorian" : "jalali"));
    const departDate = dateRange[0] ? dateRange[0].format("YYYY/MM/DD") : "";
    const returnDate = dateRange[1] ? dateRange[1].format("YYYY/MM/DD") : "";

    const openCalendar = () => datePickerRef.current?.openCalendar();
    const clearDepart = () => setDateRange([null, dateRange[1]]);
    const clearReturn = () => setDateRange([dateRange[0], null]);

    const handleTabClick = (href: string) => {
        if (isMobile) {
            setSelectedMobileTab(href);
            setMobileModalOpen(true);
        } else {
            router.push(href);
        }
    };

    const renderFormContent = () => (
        <div className="flex flex-col gap-4 pt-4 md:items-start">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-3 relative items-end">
                {/* مبدا / مقصد */}
                <div className="col-span-1 md:col-span-4 lg:col-span-3 w-full relative z-20">
                    <Autocomplete
                        className="c_swapInputs"
                        value={destination}
                        onChange={handleDestinationChange}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}

                        // ✅ روش صحیح اعمال بوردر ردیوس با sx
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                            }
                        }}

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="مقصد یا هتل"
                                // اگر می‌خواهید استایل‌های دیگر مثل readOnly بماند:
                                InputProps={{
                                    ...params.InputProps, // حتما این را نگه دارید تا آیکون‌ها و عملکردها خراب نشوند
                                    readOnly: true,
                                    style: { cursor: 'pointer' }
                                }}
                            />
                        )}
                    />
                </div>

                {/* تاریخ */}
                <div className="col-span-1 md:col-span-4 lg:col-span-4 w-full flex items-center gap-0 relative c_datepickerInput-container z-50">

                    {/* اینپوت رفت */}
                    <DatePickerInput
                        value={departDate}
                        onChange={(val) => setValue(val)}
                        onClear={clearDepart}
                        label="تاریخ رفت"
                        variant="outlined"
                        style={{ direction: "rtl" }}
                        onAutocompleteClick={openCalendar}
                    />

                    {/* اینپوت برگشت */}
                    <DatePickerInput
                        value={returnDate}
                        onChange={(val) => setValue(val)}
                        onClear={clearReturn}
                        label="تاریخ برگشت"
                        variant="outlined"
                        style={{ direction: "rtl" }}
                        onAutocompleteClick={openCalendar}
                    />

                    {/* --- اصلاح جایگاه تقویم --- */}
                    <div
                        className="absolute w-full flex justify-center z-[1000]"
                        style={{
                            top: "58px",
                            right: 0,
                        }}
                    >
                        <DatePicker
                            ref={datePickerRef}
                            range
                            value={dateRange}
                            onChange={setDateRange}
                            calendar={calendar}
                            locale={locale}
                            numberOfMonths={isMobile ? 1 : 2}
                            format="YYYY/MM/DD"
                            portal={false}
                            inputClass="hidden"
                            containerStyle={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                zIndex: 1001
                            }}
                            style={{
                                visibility: "hidden",
                                height: 0,
                                width: 0,
                            }}
                        />
                    </div>
                </div>

                {/* مسافران */}
                <div className="col-span-1 md:col-span-4 lg:col-span-3 w-full relative z-30">
                    <PassengerSelection />
                </div>

                {/* دکمه جستجو */}
                <div className="col-span-1 md:col-span-12 lg:col-span-2 w-full mt-4 md:mt-0">
                    <Link href={'/tours'}>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                height: '56px',
                                boxShadow: 'none',
                                fontSize: '1rem',
                            }}
                        >
                            جستجو
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-4 md:p-6">

            {/* تب‌ها */}
            <div className={`
                ${isMobile ? 'grid grid-cols-2 gap-3' : 'border-b border-gray-300 flex gap-6 overflow-x-auto pb-0 mb-5'}
            `}>
                {tabs.map((t) => {
                    const isActive = activeTab === t.href;
                    return (
                        <div
                            key={t.href}
                            onClick={() => handleTabClick(t.href)}
                            className={cls(
                                "cursor-pointer font-medium flex items-center justify-center gap-2 transition-all duration-300",
                                isMobile
                                    ? `p-4 rounded-xl border ${isActive ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-gray-50 border-gray-100 text-gray-600'}`
                                    : `pb-3 whitespace-nowrap justify-start relative ${isActive ? "text-blue-600 tab-active-line" : "text-gray-500 hover:text-gray-800"}`
                            )}
                        >
                            {t.icon}
                            {t.label}
                        </div>
                    );
                })}
            </div>

            {!isMobile && (
                <div key={activeTab} className="animate-slide-up">
                    {renderFormContent()}
                </div>
            )}

            {/* --- مودال تمام صفحه موبایل --- */}
            <Dialog
                fullScreen
                open={mobileModalOpen}
                onClose={() => setMobileModalOpen(false)}
                TransitionComponent={Transition}
                disablePortal={false}
                style={{ zIndex: 1300 }}
            >
                {/* هدر مودال */}
                <AppBar sx={{ position: 'relative', bgcolor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setMobileModalOpen(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
                            {tabs.find(t => t.href === selectedMobileTab)?.label || 'جستجو'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* بدنه مودال */}
                <DialogContent className="bg-white pb-10">
                    {/* فرم اصلی */}
                    {renderFormContent()}

                    {/* دکمه بستن اضافی در پایین صفحه */}
                    <div className="mt-6 border-t border-gray-200 pt-6">
                        <Button
                            variant="outlined"
                            color="error"
                            fullWidth
                            size="large"
                            onClick={() => setMobileModalOpen(false)}
                            startIcon={<CloseIcon />}
                            sx={{
                                borderRadius: '12px',
                                height: '50px',
                                fontWeight: 'bold',
                                borderColor: '#ffcdd2',
                                color: '#d32f2f',
                                '&:hover': {
                                    borderColor: '#ef5350',
                                    backgroundColor: '#ffebee'
                                }
                            }}
                        >
                            انصراف و بستن
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <style jsx>{`
                @keyframes fadeSlideUp {
                    0% { opacity: 0; transform: translateY(20px) scale(0.98); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-slide-up {
                    animation: fadeSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                .tab-active-line::after {
                    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px;
                    background-color: #2563eb; border-radius: 2px 2px 0 0;
                    animation: expandWidth 0.3s ease forwards;
                }
                @keyframes expandWidth { from { width: 0; } to { width: 100%; } }
            `}</style>
        </div>
    );
}