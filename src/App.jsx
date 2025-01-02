import React from 'react';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import router from './router';
import theme from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} fallbackElement={<div>로딩중...</div>} />
    </ThemeProvider>
  );
};

export default App;
