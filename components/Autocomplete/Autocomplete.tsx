"use client"; // در Next.js App Router برای کامپوننت‌های تعاملی الزامی است

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";

// کش را بیرون کامپوننت تعریف کنید تا با هر رندر دوباره ساخته نشود
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [stylisRTLPlugin],
});

const top100Films = [
  { title: "تهران", year: 1994 },
  { title: "تست", year: 1994 },
  { title: "تست4", year: 1994 },
  { title: "تست5", year: 1994 },
  { title: "تست78", year: 1994 },
  { title: "تست87", year: 1994 },
  { title: "تست09", year: 1994 },
];

export default function AutoCompleteComplemant() {
  return (
    <div style={{ direction: "rtl" }} className="App">
      <CacheProvider value={cacheRtl}>
        <Autocomplete
          options={top100Films}
          getOptionLabel={(option) => option.title}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="مبدا" />}
          // استایل inline direction معمولا در اینپوت‌های MUI نیاز نیست اگر CacheProvider درست کار کند، اما بودنش ضرر ندارد
        />
      </CacheProvider>
    </div>
  );
}