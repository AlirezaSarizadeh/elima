import React, { Component } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton"; // برای دکمه جابجایی
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // آیکون جابجایی
import './SwapInputs.css'
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";

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

export class SwapInputs extends Component {
    // ۱. ابتدا state را برای نگهداری مقادیر هر دو Autocomplete تعریف می‌کنیم
    state = {
        value1: null, // مقدار فیلد اول (مبدا)
        value2: null, // مقدار فیلد دوم (مقصد)
    };

    // ۲. تابعی برای تغییر مقدار فیلد اول
    handleChange1 = (event, newValue) => {
        this.setState({ value1: newValue });
    };

    // ۳. تابعی برای تغییر مقدار فیلد دوم
    handleChange2 = (event, newValue) => {
        this.setState({ value2: newValue });
    };

    // ۴. تابعی برای جابجا کردن مقادیر
    handleSwap = () => {
        const { value1, value2 } = this.state;
        this.setState({
            value1: value2,
            value2: value1,
        });
    };

    render() {
        const { value1, value2 } = this.state;

        return (
            // ۵. از flexbox برای چیدمان افقی و تراز کردن عمودی استفاده می‌کنیم
            <div style={{ direction: "rtl" }} className="flex items-center justify-center gap-0 relative">
                <CacheProvider value={cacheRtl}>
                    {/* فیلد Autocomplete اول (مبدا) */}
                    <Autocomplete
                        className="c_swapInputs"
                        value={value1}
                        onChange={this.handleChange1}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="مبدا" />}
                    />

                    {/* دکمه جابجایی */}
                    <IconButton
                        onClick={this.handleSwap}
                        className="z-10"
                        sx={{
                            // معادل کلاس‌های Tailwind در sx
                            position: 'absolute',
                            margin: 'auto', // این کار دکمه را در مرکز قرار می‌دهد
                            width: "fit-content",
                            height: "fit-content",
                            opacity: 1,

                            // استایل‌های قبلی شما
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
                        onChange={this.handleChange2}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="مقصد" />}
                    />
                </CacheProvider>
            </div>
        );
    }
}

export default SwapInputs;