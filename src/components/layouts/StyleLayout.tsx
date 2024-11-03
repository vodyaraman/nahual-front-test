import React, { useMemo, useState, createContext, ReactNode } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';

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
                        default: "#000000",
                        paper: "#FFD700",
                    },
                    text: {
                        primary: "#ffffff",
                        secondary: "#00000"
                    },
                    secondary: {
                        main: "#c29906",
                        contrastText: "#ffffff", 
                    },
                    primary: {
                        main: "#5c5439",
                        contrastText: "#ffffff",
                    }
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles styles={{
                    "input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill": {
                        backgroundColor: "#0000 !important", /* Цвет фона при автозаполнении */
                        WebkitBoxShadow: "0 0 0px 1000px #0000 inset", /* Тот же цвет для обхода браузерного стиля */
                        WebkitTextFillColor: "#ffffff !important", /* Цвет текста при автозаполнении */
                    }
                }} />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

