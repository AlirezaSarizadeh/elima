// src/components/providers/MuiRtlProvider.tsx
'use client';

import React, { useMemo } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
// 1. فونت خود را که با next/font ساختید، وارد کنید
import { yekanBakh } from '../app/fonts/yekanbakh';

// 2. تم خود را با فونت فارسی بسازید
const theme = createTheme({
  direction: 'rtl',
  typography: {
    // اینجا فونت اصلی را برای تمام کامپوننت‌ها تنظیم می‌کنیم
    fontFamily: yekanBakh.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  // 3. (اختیاری ولی بسیار توصیه شده) فونت را برای تگ <body> نیز اعمال کنید
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: yekanBakh.style.fontFamily,
        },
      },
    },
  },
});

interface MuiRtlProviderProps {
  children: React.ReactNode;
}

export default function MuiRtlProvider({ children }: MuiRtlProviderProps) {
  const rtlCache = useMemo(() => createCache({
    key: 'mui-style-rtl',
    stylisPlugins: [rtlPlugin],
  }), []);

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}