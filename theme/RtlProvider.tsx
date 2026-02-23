'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { yekanBakh } from '../app/fonts/yekanbakh';
import { deepOrange } from '@mui/material/colors';

const theme = createTheme({
  direction: 'rtl',
  typography: { fontFamily: yekanBakh.style.fontFamily },
  palette: {
    primary: { main: deepOrange[500], dark: deepOrange[700], light: deepOrange[200], contrastText: '#ffffff' },
    secondary: { main: deepOrange[500], dark: deepOrange[700], light: deepOrange[200], contrastText: '#ffffff' },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { fontFamily: yekanBakh.style.fontFamily } } },
    MuiButton: { styleOverrides: { root: { borderRadius: '12px', textTransform: 'none', padding: '10px 22px' } } },
  },
});

export default function MuiRtlProvider({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      key: 'mui-style-rtl',
      stylisPlugins: [rtlPlugin],
      prepend: true,
    });

    // override insert تا بتونیم track کنیم چه styleهایی اضافه شدن
    cache.compat = true;
    const prevInsert = cache.insert.bind(cache);
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (!names.length) return null;

    let styles = '';
    for (const name of names) {
      const val = cache.inserted[name];
      if (val !== true && typeof val === 'string') {
        styles += val;
      }
    }

    if (!styles) return null;

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}