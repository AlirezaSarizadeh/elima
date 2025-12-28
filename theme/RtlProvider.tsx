// src/components/providers/MuiRtlProvider.tsx
'use client';

import React, { useMemo } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { yekanBakh } from '../app/fonts/yekanbakh';
import { deepOrange } from '@mui/material/colors';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: yekanBakh.style.fontFamily,
  },
  palette: {
    primary: {
      // رنگ پایه تم (همونی که قبلاً داشتی، فقط کمی کامل‌تر)
      main: deepOrange[500],
      dark: deepOrange[700],
      light: deepOrange[200],
      contrastText: '#ffffff',
    },
    secondary: {
      main: deepOrange[500],
      dark: deepOrange[700],
      light: deepOrange[200],
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: yekanBakh.style.fontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          padding: '10px 22px',
        },
      },
    },
  },
});

interface MuiRtlProviderProps {
  children: React.ReactNode;
}

export default function MuiRtlProvider({ children }: MuiRtlProviderProps) {
  const rtlCache = useMemo(
    () =>
      createCache({
        key: 'mui-style-rtl',
        stylisPlugins: [rtlPlugin],
      }),
    [],
  );

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
