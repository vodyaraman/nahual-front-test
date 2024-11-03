// src/components/layouts/AppLayout.tsx

import React, { ReactNode, Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { CssBaseline } from '@mui/material';
import StyleLayout from './StyleLayout';

interface StateLayoutProps {
    children: ReactNode;
}

const StateLayout: React.FC<StateLayoutProps> = ({ children }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Provider store={store}>
                <StyleLayout>
                    <CssBaseline />
                    {children}
                </StyleLayout>
            </Provider>
        </Suspense>
    );
};

export default StateLayout;
