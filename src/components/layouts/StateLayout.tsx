// src/components/layouts/AppLayout.tsx

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { CssBaseline } from '@mui/material';
import StyleLayout from './StyleLayout';

interface StateLayoutProps {
  children: ReactNode;
}

const StateLayout: React.FC<StateLayoutProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <StyleLayout>
        <CssBaseline />
        {children}
      </StyleLayout>
    </Provider>
  );
};

export default StateLayout;
