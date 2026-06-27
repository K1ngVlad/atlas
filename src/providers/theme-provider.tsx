'use client';

import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider as Provider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider theme={darkTheme}>
      <CssBaseline />
      {children}
    </Provider>
  );
};
