"use client";

import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import './SwapInputs.css';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";

// کش RTL (بیرون کامپوننت تعریف می‌شود تا با هر رندر دوباره ساخته نشود)
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [stylisRTLPlugin],
});

const top100Films = [
    { title: "تهران", year: 1994 },
    { title: "مشهد", year: 1972 },
    { title: "اصفهان", year: 1974 },
    { title: "شیراز", year: 2008 },
    { title: "کیش", year: 1957 },
];

export default function SwapInputs() {
    // ۱. تعریف استیت‌ها با استفاده از Hook
    const [value1, setValue1] = useState<any>(null);
    const [value2, setValue2] = useState<any>(null);

    // ۲. هندلر تغییر فیلد اول
    const handleChange1 = (event: any, newValue: any) => {
        setValue1(newValue);
    };

    // ۳. هندلر تغییر فیلد دوم
    const handleChange2 = (event: any, newValue: any) => {
        setValue2(newValue);
    };

    // ۴. تابع جابجایی مقادیر
    const handleSwap = () => {
        // مقادیر را به صورت ضربدری جابجا می‌کنیم
        setValue1(value2);
        setValue2(value1);
    };

    return (
        <div style={{ direction: "rtl" }} className="flex items-center justify-center gap-0 relative">
            <CacheProvider value={cacheRtl}>
                
                {/* فیلد Autocomplete اول (مبدا) */}
                <Autocomplete
                    className="c_swapInputs"
                    value={value1}
                    onChange={handleChange1}
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    sx={{ 
                        width: { xs: '100%', md: 150 } 
                    }}
                    renderInput={(params) => <TextField {...params} label="مبدا" />}
                />

                {/* دکمه جابجایی */}
                <IconButton
                    onClick={handleSwap}
                    className="z-10"
                    sx={{
                        position: 'absolute',
                        margin: 'auto',
                        width: "fit-content",
                        height: "fit-content",
                        opacity: 1,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        }
                    }}
                >
                    <SwapHorizIcon />
                </IconButton>

                {/* فیلد Autocomplete دوم (مقصد) */}
                <Autocomplete
                    className="c_swapInputs"
                    value={value2}
                    onChange={handleChange2}
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    sx={{ 
                        width: { xs: '100%', md: 150 } 
                    }}
                    renderInput={(params) => <TextField {...params} label="مقصد" />}
                />
            </CacheProvider>
        </div>
    );
}