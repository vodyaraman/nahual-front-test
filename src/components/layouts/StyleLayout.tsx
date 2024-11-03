import React, { useMemo, useState, createContext, ReactNode } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface LayoutProps {
    children: ReactNode;
}

export default function StyleLayout({ children }: LayoutProps) {
    const [mode, setMode] = useState<PaletteMode>('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode('dark');
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    background: {
                        default: "#000000", // Основной черный фон
                        paper: "#FFD700"    // Вторичный желтый фон
                    },
                    text: {
                        primary: "#ffffff", // Белый текст
                    },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

